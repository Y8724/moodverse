export async function getMusicByMood(tags) {
    console.log("getMusicByMood CALLED with:", tags)
    try {
        //pick best keyword from mood
        const query = Array.isArray(tags) && tags.length > 0 ? tags[0] : "chill";

         console.log("Music search:", query);

        const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Fetch failed");
        }

        const data = await res.json();

        console.log("Deezer result:", data);

        if (!data.data || data.data.length === 0) {
            return [];
        } 

        return data.data.slice(0, 5).map((track) => ({
            title: track.title,
            artist: track.artist.name,
            image: track.album.cover_medium,
            preview: track.preview,
            url: track.link,
        }));
    } catch (err) {
        console.error("Music API error:", err);
        return [];
    }
}