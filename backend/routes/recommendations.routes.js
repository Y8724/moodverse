import express from "express";
import { getRecommendations } from "../controllers/recommendations.controller.js";

const router = express.Router();

router.post("/", getRecommendations);

export default router;