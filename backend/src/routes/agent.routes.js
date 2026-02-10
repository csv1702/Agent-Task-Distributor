import express from "express";
import { createAgent, getAgents } from "../controllers/agent.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// protected routes
router.post("/", authMiddleware, createAgent);
router.get("/", authMiddleware, getAgents);

export default router;
