
import { getMoviesByMood } from "../services/movies.service.js";
import { getBooksByMood } from "../services/books.service.js";
import { getMusicByMood } from "../services/music.service.js";


export async function getRecommendations(req, res) {
    try {
        const { mood } = req.body;

        if (!mood || typeof mood !== "string") {
            return res.status(400).json({ error: "Mood is required"});
        }

        const moodMap = {
            happy: ["pop", "summer"],
            sad: ["acoustic", "sad"],
            relaxed: ["relaxing", "calm"],
            focused: ["productive", "focus"],
            romantic: ["love", "rnb"],
        };

        const moodKey = mood.toLowerCase();

        const tags = moodMap[moodKey] || ["general"];
        
        const movies = await getMoviesByMood(moodKey); //stil string
        const books = await getBooksByMood(tags); 
        const music = await getMusicByMood(tags);   //array

        console.log("MOOD:", moodKey);
        console.log("TAGS:", tags);
        console.log("MOVIES:", movies.length);
        console.log("BOOKS:", books.length);
        console.log("MUSIC:", music.length);

        res.json({
            movies,
            books,
            music
        });
    } catch (error) {
        console.error("❌ Recommendations error:", error.message);
        res.status(500).json({ error: "Failed to get recommendations"});
    }
}