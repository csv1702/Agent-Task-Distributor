import express from "express";
import {
  createAgent,
  getAgents,
  deleteAgent,
} from "../controllers/agent.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// protected routes
router.post("/", authMiddleware, createAgent);
router.get("/", authMiddleware, getAgents);
router.delete("/:id", authMiddleware, deleteAgent);

export default router;
