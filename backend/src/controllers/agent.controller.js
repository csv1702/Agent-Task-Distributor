import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";

// Create Agent
export const createAgent = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      const error = new Error("Agent already exists with this email");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Agents
export const getAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find().select("-password");

    res.status(200).json({
      success: true,
      agents,
    });
  } catch (error) {
    next(error);
  }
};
