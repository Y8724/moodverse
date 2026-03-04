console.log("ENV CHECK:", import.meta.env)
console.log("API URL:", import.meta.env.VITE_API_URL);

import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import { FaFilm, FaBook, FaMusic, FaSmile, FaHeart } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";
import { TbAi } from "react-icons/tb";

 function App() {
    const [mood, setMood] = useState("");
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const audioRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);
    const [activeMood, setActiveMood] = useState(null);
    const [error, setError] = useState(null);

    const moods = ["Happy", "Sad", "Relaxed", "Focused", "Romantic"];

    const fetchRecommendations = async (selectedMood) => {
      if (!selectedMood) return;

      try {
      setLoading(true);
      setError(null);
      setActiveMood(selectedMood);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recommendations`, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mood: selectedMood }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("API DATA:", data);
      setRecommendations(data);
    } catch (err) {
      setError("Failed to fetch recommendations");
      setRecommendations(null)
    } finally {
      setLoading(false);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanMood = mood.trim();
    if (!cleanMood) return;

    setActiveMood(cleanMood);
    fetchRecommendations(cleanMood);
  };
      
  return (
    <div className="page">
      <div className="app">
        <header className="hero">
          <h1>Moodverse <TbAi color="#ffb703"/></h1>
          <p className="subtitle">Get personalized Movie, Book, and Music recommendations based on your mood.</p>
        </header>
        
        {/* Mood Buttons */}
        <div className="mood-buttons">
          {moods.map((m) => (
            <button
              key={m}
              className={`mood-button ${activeMood === m ? "active" : ""}`}
              disabled={loading}
              onClick={() => {
                setMood(m);
                fetchRecommendations(m)
              }}
            >
              {m}
            </button>
          ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          inputMode="text"
          autoComplete="off"
          spellCheck="false"
          value={mood} 
          onChange={(e) => setMood(e.target.value)} 
          disabled={loading}
          placeholder="Or type your mood..."
      />
      <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
      </button>
      </form>

      {/* Error */}
      {error && <p className="error-text">{error}</p>}
    </div>


    {/* Results */}
    {recommendations && (
        <div className="results">
          {/* Active mood display */}
          {activeMood && !loading && (
            <div className="active-mood-lable">
              Recommendations for: <span>{activeMood}</span>
            </div>
          )}
            <section className="section">
              <h2><FaFilm color="#e63946" /> Movies</h2>
              <div className="card-grid">
                {recommendations.movies?.map((movie, i) => {
                  console.log(movie);
                  
                  return (
                    <a key={i} href={movie.url} target="_blank" rel="noreferrer" className="card movie-card">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} className="card-image" />
                      ) : (
                        <div className="no-poster">No Image</div>
                      )}

                      {/* gradient overlay */}
                      <div className="card-overlay"></div>

                      {/* bottom info */}
                      <div className="movie-info">
                        <p className="movie-title">{movie.title}</p>

                        <div className="movie-meta">
                          <span>⭐️ {movie.rating?.toFixed(1)}</span>
                          <span>{movie.year}</span>
                        </div>
                      </div>

                      {/* hover description */}
                      {movie.overview && (
                        <div className="movie-hover">
                          <p className="movie-desc">
                            {movie.overview?.slice(0, 140) || "No description available."}
                          </p>
                        </div>
                      )}
                  </a>
                  );
                })}
              </div>
            </section>

            <section className="section">
              <h2><FaBook color="#457b9d" /> Books</h2>
              <div className="card-grid">
                {recommendations.books?.map((book, i) => (
                  <a key={i} href={book.url} target="_blank" rel="noreferrer" className="card media-card">
                    
                    {/* cover */}
                    <img src={book.thumbnail} alt={book.title} className="card-image" />
                 

                  {/* bottom info */}
                 <div className="media-info">
                  <p className="media-title">{book.title}</p>
                  <p className="media-sub">{book.authors}</p>
                 </div>
                  
                  {/* hover desc */}
                    <div className="media-hover">
                      <p className="media-desc">
                        {book.description ? book.description.slice(0, 140)
                        : "No description available"}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="section">
              <h2><FaMusic color="#2a9d8f" /> Music</h2>

              <div className="card-grid">
                {recommendations.music?.length > 0 ? (
                  recommendations.music.map((track, i) => (
               
                    <div key={i}  className="card media-card">
                    
                  {/* cover */}
                    <img src={track.image} alt={track.title} className="card-image" referrerPolicy="no-referrer" onError={(e) => {
                      e.target.src = "/no-cover.png";
                    }}
                   />
                  
                
                  {/* play */}
                  {track.preview && (
                    <button className="play-btn" onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      //if same song pause
                      if (audioRef.current && playingId === i) {
                        audioRef.current.pause();
                        setPlayingId(null);
                        return;
                      }

                      //stop previous
                      if (audioRef.current) {
                        audioRef.current.pause();
                      }

                      //play new
                      const audio = new Audio(track.preview);
                      audio.play();

                      audioRef.current = audio;
                      setPlayingId(i);

                    }}>
                      {playingId === i ? "⏸️" : "▶︎"}
                    </button>
                  )}

                  {/* info */}
                  <div className="media-info">
                    <p className="media-title">{track.title}</p>
                    <p className="media-sub">{track.artist}</p>
                    <a
                      href={track.url}
                      target="_blank"
                      rel="noreferrer"
                      className="spotify-link"
                    >
                      Open in Deezer
                    </a>
                  </div>

                  {/* hover */}
                  <div className="media-hover">
                    <p className="media-desc">
                      {track.title} - {track.artist}
                    </p>
                  </div>
                </div >
                ))
              ) : (
                <p className="empty-msg">No music found 😕</p>
              )}
              </div>
            </section>
          </div>
        )}
      </div>
    );
 }

 export default App;