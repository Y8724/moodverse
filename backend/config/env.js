import dotenv from "dotenv";

dotenv.config();

if (!process.env.TMDB_API_KEY) {
    throw new Error("❌ TMDB_API_KEY is missing from environmnet");
}

export const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const ENV = {
    PORT: process.env.PORT || 5050,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY,
};