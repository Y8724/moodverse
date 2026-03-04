import fetch from "node-fetch";
import { ENV } from "../config/env.js";

export async function getBooksByMood(tags) {
    try {
        if (!Array.isArray(tags)) {
            throw new Error("getBooksByMood expectets tags array");
        }

        //build search query
        const query = `${tags.join(" ")} self help novel psychology`;

        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
    )}&maxResults=5&key=${ENV.GOOGLE_BOOKS_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const fallbackBooks = {
        uplifting : [
            {
                title: "Atomic Habits",
                authors: "James Clear",
                thumbnail: "https://covers.openlibrary.org/b/id/125447191-L.jpg",
                url: "#",
            },
            {
                title: "The Happiness Project",
                authors: "Gretchn Rubin",
                thumbnail: "https://covers.openlibrary.org/b/id/8235116-L.jpg",
                url: "#",
            },
        ],
        reflective: [
            {
                title: "Man's Search for Meaning",
                authors: "Viktor Frankl",
                thumbnail: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
                url: "#",
            },
            {
                title: "The Alchemist",
                authors: "Pablo Coelho",
                thumbnail: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
                url: "#",
            },
        ],
        relaxing: [
            {
                title: "Ikigai",
                authors: "Hector Garcia",
                thumbnail: "https://covers.openlibrary.org/b/id/10901117-L.jpg",
                url: "#",
            },
            {
                title: "The Power of Now",
                authors: "Eckhart Tolle",
                thumbnail: "https://covers.openlibrary.org/b/id/8237421-L.jpg",
                url: "#",
            },
        ]
         };

    if (!data.items || data.items.length === 0) {
        console.log("Using fallback books");

        const key = tags[0];
        return fallbackBooks[key] || fallbackBooks.uplifting;
    }
    
    return data.items.map((item) => {
        const info = item.volumeInfo;

        return {
            title: info.title || "Unknown author",
            authors: info.authors?.join(", ") || "Unknown",
            thumbnail: info.imageLinks?.thumbnail
            ? info.imageLinks.thumbnail.replace("http://", "https://")
            : null,
            url: info.previewLink || "#",
        };
});

} catch (error) {
    console.error("❌ Books service erro:", error.message);
    return [];
    }

}
