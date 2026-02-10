import multer from "multer";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import Agent from "../models/Agent.js";
import Record from "../models/Record.js";
import { distributeRecords } from "../utils/distribute.js";

// Multer config
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only CSV, XLS, XLSX files are allowed"));
    }

    cb(null, true);
  },
});

// Helper: parse CSV
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

// Helper: parse Excel
const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

// Upload Controller
export const uploadFile = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      // 1. Check agents count
      const agentCount = await Agent.countDocuments();
      if (agentCount < 5) {
        const error = new Error("At least 5 agents are required before upload");
        error.statusCode = 400;
        throw error;
      }

      if (!req.file) {
        const error = new Error("File is required");
        error.statusCode = 400;
        throw error;
      }

      let records = [];
      const filePath = req.file.path;

      // 2. Parse file
      if (req.file.mimetype === "text/csv") {
        records = await parseCSV(filePath);
      } else {
        records = parseExcel(filePath);
      }

      // 3. Validate format
      if (!records.length) {
        const error = new Error("File is empty or invalid");
        error.statusCode = 400;
        throw error;
      }

      const requiredFields = ["FirstName", "Phone", "Notes"];

      for (const record of records) {
        for (const field of requiredFields) {
          if (!record[field]) {
            const error = new Error(
              `Invalid file format. Missing field: ${field}`,
            );
            error.statusCode = 400;
            throw error;
          }
        }
      }

      // Cleanup file
      fs.unlinkSync(filePath);

      // 4. Get first 5 agents
      const agents = await Agent.find().limit(5);

      if (agents.length < 5) {
        const error = new Error("Not enough agents for distribution");
        error.statusCode = 400;
        throw error;
      }

      // 5. Distribute records
      const distributedData = distributeRecords(records, agents);

      // 6. Save to DB
      await Record.insertMany(distributedData);

      res.status(200).json({
        success: true,
        message: "File uploaded and records distributed successfully",
        totalRecords: records.length,
      });
    } catch (error) {
      next(error);
    }
  },
];
