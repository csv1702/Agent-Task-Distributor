import express from "express";
import { getRecordsByAgent } from "../controllers/record.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:agentId", authMiddleware, getRecordsByAgent);

export default router;
