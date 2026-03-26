import { useState, useRef, useEffect } from "react";
import { FaFilm, FaBook, FaMusic } from "react-icons/fa";
import { TbAi } from "react-icons/tb";

function App() {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMood, setActiveMood] = useState(null);
  const [error, setError] = useState(null);

  const [moodHistory, setMoodHistory] = useState([]);

  const audioRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);

  const moods = ["Happy", "Sad", "Relaxed", "Focused", "Romantic"];

  // Load mood history
  useEffect(() => {
    const saved = localStorage.getItem("moodHistory");
    if (saved) setMoodHistory(JSON.parse(saved));
  }, []);

  // Save mood (FIXED)
  const saveMood = (newMood) => {
    setMoodHistory((prev) => {
      const updated = [newMood, ...prev.filter((m) => m !== newMood)].slice(0, 5);
      localStorage.setItem("moodHistory", JSON.stringify(updated));
      return updated;
    });
  };

  // Mood descriptions
  const getMoodDescription = (mood) => {
    const map = {
      Happy: "You're in a bright and energetic state. Let's amplify that.",
      Sad: "You're feeling low. These picks are here to comfort you.",
      Relaxed: "You're calm and at ease. Let's keep that flow going.",
      Focused: "You're locked in. These will support your concentration.",
      Romantic: "You're feeling connected. Expect emotional depth.",
    };
    return map[mood] || "Let’s explore something that matches your vibe.";
  };

  // WHY text
  const getWhyText = (mood) => {
    const map = {
      Happy: "Matches your positive energy and uplifting mood.",
      Sad: "Carefully selected to comfort and reconnect you emotionally.",
      Relaxed: "Keeps your calm flow going without overwhelming you.",
      Focused: "Helps you stay in deep concentration and clarity.",
      Romantic: "Enhances emotional connection and atmosphere.",
    };
    return map[mood] || "Curated based on your current vibe.";
  };

  // Fetch
  const fetchRecommendations = async (selectedMood) => {
    if (!selectedMood) return;

    try {
      setLoading(true);
      setError(null);
      setActiveMood(selectedMood);
      saveMood(selectedMood);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/recommendations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mood: selectedMood }),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      setRecommendations(data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations");
      setRecommendations(null);

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood.trim()) return;
    fetchRecommendations(mood.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            Moodverse <span className="text-yellow-500">AI</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-lg">
            Tell us how you feel, we’ll translate it into movies, books, and music.
          </p>

          {moodHistory.length > 0 && (
            <p className="text-sm text-gray-400 mt-3">
              Welcome back, your vibes: {moodHistory.join(", ")}
            </p>
          )}
        </header>

        {/* MOODS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => {
                setMood(m);
                fetchRecommendations(m);
              }}
              disabled={loading}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 backdrop-blur-md
                ${
                  activeMood === m
                    ? "bg-black text-white scale-105 shadow-lg"
                    : "bg-white/60 hover:bg-white hover:scale-105"
                }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-8">
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Type your mood..."
            className="px-4 py-2 rounded-lg border w-64 focus:outline-none focus:ring-2 focus:ring-black bg-white/70 backdrop-blur-md"
          />
          <button className="px-5 py-2 bg-black text-white rounded-lg hover:opacity-90">
            {loading ? "..." : "Explore"}
          </button>
        </form>

        {/* MOOD INSIGHT */}
        {activeMood && !loading && (
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm uppercase">Your current vibe</p>
            <h2 className="text-3xl font-semibold mt-2">{activeMood}</h2>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              {getMoodDescription(activeMood)}
            </p>
          </div>
        )}

        {loading && (
          <p className="text-center text-gray-400 animate-pulse">
            Curating your vibe...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}

        {/* RESULTS */}
        {recommendations && (
          <div className="space-y-14">

            {[{
              title: "Movies",
              icon: <FaFilm />,
              data: recommendations.movies,
              type: "movie"
            },{
              title: "Books",
              icon: <FaBook />,
              data: recommendations.books,
              type: "book"
            },{
              title: "Music",
              icon: <FaMusic />,
              data: recommendations.music,
              type: "music"
            }].map((section, idx) => (

              <section key={idx}>
                <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                  {section.icon} {section.title}
                </h2>

                <p className="text-gray-500 text-sm mb-6">
                  Curated based on your current emotional state.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                  {section.data?.map((item, i) => {

                    const image =
                      section.type === "movie"
                        ? item.poster
                        : section.type === "book"
                        ? item.thumbnail
                        : item.image;

                    const title =
                      item.title;

                    const subtitle =
                      section.type === "movie"
                        ? `⭐ ${item.rating?.toFixed(1)} • ${item.year}`
                        : section.type === "book"
                        ? item.authors
                        : item.artist;

                    return (
                      <div
                        key={i}
                        className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer"
                      >
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-72 object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition" />

                        <div className="absolute bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition">
                          <p className="text-sm font-semibold">{title}</p>
                          <p className="text-xs">{subtitle}</p>

                          <p className="text-[10px] mt-1 opacity-80">
                            {getWhyText(activeMood)}
                          </p>

                          {/* MUSIC PLAY */}
                          {section.type === "music" && item.preview && (
                            <button
                              className="mt-2 text-xs bg-white text-black px-2 py-1 rounded"
                              onClick={(e) => {
                                e.stopPropagation();

                                if (audioRef.current && playingId === i) {
                                  audioRef.current.pause();
                                  setPlayingId(null);
                                  return;
                                }

                                if (audioRef.current) {
                                  audioRef.current.pause();
                                }

                                const audio = new Audio(item.preview);
                                audio.play();

                                audioRef.current = audio;
                                setPlayingId(i);
                              }}
                            >
                              {playingId === i ? "Pause" : "Play"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default App;