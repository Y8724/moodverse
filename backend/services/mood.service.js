export function mapMoodToTags(mood) {
    if (!mood || typeof mood !== "string") {
        return [];
    }
    const normalized = mood.toLowerCase();

    const moodMap = {
        happy: ["happy", "feel good", "uplifting"],
        sad: ["sad", "emotional", "drama"],
        relaxed: ["relaxed", "calm", "chill"],
        focused: ["focus", "inspiring", "productivity"],
        romantic: ["romance", "love", "relationship"],
    };

    return moodMap[normalized] || [normalized];

}