
import { ENV } from "../config/env.js";


const moodToGenre = {
    happy: [35, 16],   //comedy, family
    sad: [18, 10749],  //drama, romance
    relaxed: [10751],  //family
    focused: [99,36],    //documentary, history
    romantic: [10749],   //romance
};

export async function getMoviesByMood(mood) {

    if (!mood) {
        throw new Error("Mood is required");
    }

    const moodKey = mood.toLowerCase();

    const genres = moodToGenre[moodKey] || [18];

    const genreString = genres.join(",");
    
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${ENV.TMDB_API_KEY}&with_genres=${genreString}&sort_by=popularity.desc`;

    const res = await fetch(url);
    const data = await res.json();
    console.log("TMDB RAWRESULTS:", data.results);

    return data.results 
    .slice(0, 5)
    .map((movie) => ({
        title: movie.title,
        poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
        rating: movie.vote_average,
        year: movie.release_date?.split("-")[0],
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        overview: movie.overview
    }));
    
}