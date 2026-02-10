import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import agentRoutes from "./routes/agent.routes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);


app.use(errorMiddleware);


export default app;
