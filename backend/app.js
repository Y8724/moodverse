import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recommendationsRoutes from "./routes/recommendations.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-netlify-app.netlify.app"
    ],
  })
);
app.use(express.json());

app.use("/api/recommendations", recommendationsRoutes);

app.get("/health", (req, res) => {
    console.log("🔥🔥🔥 HEALTH CHECK HIT 🔥🔥🔥");
    res.json({status: "ok"});
});

export default app;

