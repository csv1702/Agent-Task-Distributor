import express from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, uploadFile);

export default router;
