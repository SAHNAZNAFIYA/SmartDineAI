🍽️ SmartDine — AI-Powered Food Discovery & Emotional Food Coach

SmartDine is an AI-powered food discovery platform that recommends real restaurants and cuisine-accurate dishes based on user mood, cravings, budget, and location.

It combines live restaurant APIs, a curated Kaggle dataset, and an emotional AI food coach chatbot to deliver personalized, context-aware dining recommendations — all in a single, smooth user experience.

🚀 Key Features
🤖 AI Food Coach (ChefMood 🍽️💬)

Conversational, chatbot-style AI (no page navigation)

Detects user emotion, intent, and cravings

Responds with empathetic, playful, food-themed language

Supports text + voice input

Suggests restaurants inside the chat itself

Examples:

“Something cheesy but not too expensive”

“Comfort food after a rough day”

The AI:

Understands keywords like cheesy, comfort, cheap

Maps them to correct cuisines & dishes

Filters restaurants before showing results

🍴 Real Restaurant Recommendations (No Fake Data)

Restaurants are fetched from multiple real data sources:

Foursquare Places API (primary)

Kaggle Zomato restaurant dataset (secondary, local JSON)

OpenTripMap API (fallback for density)

✔ No fake names
✔ No random ratings
✔ No cuisine–dish mismatch

Each recommendation includes:

Restaurant name

Real rating & price range

Location & distance

Cuisine-accurate dish

Nutrition & mood benefits

Google Maps directions

🎲 “Surprise Me” Mode

Slot-machine style food reveal

Food-themed animations

Uses the same real data pipeline

Never breaks cuisine or dish rules

📍 Smart Location Handling

Supports current location detection

Fast browser-based geolocation with fallback

All APIs automatically adapt to user city

🍲 Deterministic Dish Selection

Dishes are not randomly assigned.

Instead:

Each restaurant always maps to the same dish

Dish always belongs to the restaurant’s cuisine

Ensures consistency across sessions

🧠 System Architecture (High Level)
User Input (Text / Voice)
        ↓
Intent & Emotion Detection (AI)
        ↓
Cuisine + Budget + Mood Filters
        ↓
────────────────────────────────
│  Data Aggregation Layer       │
│  • Foursquare API             │
│  • Kaggle Zomato Dataset      │
│  • OpenTripMap API            │
────────────────────────────────
        ↓
Deduplication & Normalization
        ↓
Deterministic Dish Assignment
        ↓
Restaurant Cards Rendered
        ↓
Displayed Inline in Chat / UI

🔌 APIs & Data Sources Used
🌍 External APIs

Foursquare Places API
→ Live restaurant discovery (name, rating, price, location)

OpenTripMap API
→ Fallback restaurant density in low-coverage areas

LLM APIs (Groq / DeepSeek)
→ Emotion detection, intent parsing, conversational responses

📊 Local Dataset

Kaggle Zomato Restaurant Dataset

Converted from CSV → JSON

Used to:

Supplement ratings & price info

Increase restaurant coverage

Cross-validate API results

🍽️ Supported Cuisines (Strict)

SmartDine only recommends cuisines it understands deeply:

Indian

Chinese

Italian

Mexican

Japanese

Thai

Mediterranean

American

French

Korean

Each cuisine maps to authentic, popular dishes only.

🎨 UI & UX Highlights

Food-themed design system

Animated restaurant cards

3D-style effects & micro-interactions

Emoji-friendly, warm tone

Clean, professional layout (no clutter)

The AI coach behaves like a real chatbot, not a static recommendation page.

🛠️ Tech Stack

Frontend: React + TypeScript

Build Tool: Vite

Styling: Tailwind CSS + shadcn/ui

Animations: Framer Motion

APIs: REST (Foursquare, OpenTripMap)

AI/NLP: LLM-based intent & emotion analysis

🧪 Deterministic & Reliable by Design

SmartDine avoids common AI pitfalls:

❌ No hallucinated restaurants
❌ No mismatched cuisines
❌ No random ratings
❌ No inconsistent dishes

Everything is data-driven, validated, and reproducible.

🧑‍💻 Running the Project Locally
Prerequisites

Node.js (v18+ recommended)

npm

Setup
# Clone the repository
git clone <YOUR_GIT_URL>

# Move into the project directory
cd <PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev


The app will start with hot-reload enabled.

🔐 Environment Variables

Create a .env file with:

FSQ_API_KEY=your_foursquare_key
OPENTRIPMAP_API_KEY=your_opentripmap_key
GROQ_API_KEY=your_groq_key
DEEPSEEK_API_KEY=your_deepseek_key

🎯 Project Goals & Evaluation Fit

This project demonstrates:

Real-world API integration

Data normalization & merging

Deterministic AI logic

Conversational UX design

Emotion-aware recommendations

Clean, scalable frontend architecture

Ideal for:

Full-stack developer roles

AI/ML-assisted applications

Product-focused engineering interviews

📌 Future Enhancements

User taste memory

Dietary preferences (vegan, keto)

Restaurant bookmarking

Multi-city exploration

Offline caching
