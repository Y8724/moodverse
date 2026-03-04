import dotenv from "dotenv";
dotenv.config();

console.log("APP SEES TMDB:", process.env.TMDB_API_KEY);

import express from "express";
import cors from "cors";
import recommendationsRoutes from "./routes/recommendations.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recommendations", recommendationsRoutes);

app.get("/health", (req, res) => {
    console.log("🔥🔥🔥 HEALTH CHECK HIT 🔥🔥🔥");
    res.json({status: "ok"});
});

export default app;

