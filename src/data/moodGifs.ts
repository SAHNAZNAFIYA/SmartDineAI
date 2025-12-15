/**
 * MOOD GIF LIBRARY
 * Dynamic GIFs for ChefMood based on detected emotions
 */

import { MoodType } from "@/types/smartdine";

export interface MoodGif {
  url: string;
  caption: string;
}

// GIF library organized by mood
export const MOOD_GIFS: Record<MoodType, MoodGif[]> = {
  happy: [
    {
      url: "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif",
      caption: "This is me celebrating your great taste! 🎉",
    },
    {
      url: "https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif",
      caption: "Happy dance for happy food choices! 💃",
    },
    {
      url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      caption: "Your happiness is contagious! ✨",
    },
  ],
  tired: [
    {
      url: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
      caption: "Let me cook you some energy! ⚡🍳",
    },
    {
      url: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
      caption: "Food is the best wake-up call! ☕",
    },
    {
      url: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      caption: "Recharging you with deliciousness! 🔋",
    },
  ],
  sad: [
    {
      url: "https://media.giphy.com/media/14urMYvFxIKEms/giphy.gif",
      caption: "Sending you a warm food hug! 🤗💛",
    },
    {
      url: "https://media.giphy.com/media/VbawWIGNtKYwOFXF7U/giphy.gif",
      caption: "Good food makes everything better! 💙",
    },
    {
      url: "https://media.giphy.com/media/3oEdv6sy3ulljPMGdy/giphy.gif",
      caption: "Comfort food incoming! 🍲",
    },
  ],
  stressed: [
    {
      url: "https://media.giphy.com/media/xUOwGpaKq5xjHNz8Bi/giphy.gif",
      caption: "See me relaxing? That's your stress leaving! 🧘✨",
    },
    {
      url: "https://media.giphy.com/media/lMVNl6XxTvXgs/giphy.gif",
      caption: "Take a breath, food is on the way! 🌿",
    },
    {
      url: "https://media.giphy.com/media/3o7TKnO6Wve6502iJ2/giphy.gif",
      caption: "Stress-melting deliciousness ahead! 💆",
    },
  ],
  calm: [
    {
      url: "https://media.giphy.com/media/3o7qDPfGhunRMZikI8/giphy.gif",
      caption: "Peaceful vibes only! ☯️🌸",
    },
    {
      url: "https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
      caption: "Zen and delicious! 🧘‍♀️",
    },
    {
      url: "https://media.giphy.com/media/26xBQhJE3Jk8F3Nu8/giphy.gif",
      caption: "Tranquil tastes await you! 🌊",
    },
  ],
  energetic: [
    {
      url: "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif",
      caption: "Match your energy! Let's GO! 🚀🔥",
    },
    {
      url: "https://media.giphy.com/media/LoCDk7fecj2dwCtSB3/giphy.gif",
      caption: "Fueling your fire! ⚡💪",
    },
    {
      url: "https://media.giphy.com/media/3o7qE5ceqm4llVH5fy/giphy.gif",
      caption: "Power-up time! 🎮✨",
    },
  ],
  anxious: [
    {
      url: "https://media.giphy.com/media/Lm63QU87HvgVEuTV5T/giphy.gif",
      caption: "Deep breath... food helps! 🌊💙",
    },
    {
      url: "https://media.giphy.com/media/ZBVhKIDgts1eHYdT7u/giphy.gif",
      caption: "Calm cuisine coming your way! 🕊️",
    },
    {
      url: "https://media.giphy.com/media/3o6ZtpWvwnhf34Oj0A/giphy.gif",
      caption: "Soothing flavors ahead! 🍵",
    },
  ],
  pms: [
    {
      url: "https://media.giphy.com/media/d31vYmpaCrKs8unskkk/giphy.gif",
      caption: "Self-care mode: ACTIVATED! 💜🍫",
    },
    {
      url: "https://media.giphy.com/media/xUOwFZmWqMxSeKCJ0c/giphy.gif",
      caption: "Comfort food is calling! 🌸",
    },
    {
      url: "https://media.giphy.com/media/3o7abIile19e9nuhaU/giphy.gif",
      caption: "Treating yourself is self-love! 💕",
    },
  ],
};

/**
 * Get a random GIF for a mood
 */
export function getMoodGif(mood: MoodType): MoodGif {
  const gifs = MOOD_GIFS[mood] || MOOD_GIFS.happy;
  return gifs[Math.floor(Math.random() * gifs.length)];
}

/**
 * Get all GIFs for a mood
 */
export function getAllMoodGifs(mood: MoodType): MoodGif[] {
  return MOOD_GIFS[mood] || MOOD_GIFS.happy;
}
