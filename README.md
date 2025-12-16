SmartDine — AI-Powered Food Discovery & Emotional Food Coach 🍽️

SmartDine is a production-ready food discovery application that combines real-world restaurant data with an AI-powered conversational food coach. The platform helps users discover restaurants based on cuisine preferences, budget, location, and emotional state, delivering personalized and context-aware recommendations in real time.

---

✨ Key Features

🤖 AI Food Coach (ChefMood 🍽️💬)
- Conversational chatbot-style interface (single-page, no navigation)
- Supports **text and voice input**
- Detects **user intent and emotional context**
- Responds with warm, engaging, food-themed conversation
- Displays restaurant recommendations directly within the chat flow

Example queries:
- “Something cheesy but not too expensive”
- “Comfort food after a rough day”

---

🍴 Real-Time Restaurant Discovery
Restaurants are fetched and combined from multiple trusted sources:
- **Foursquare Places API**
- **Kaggle Zomato restaurant dataset (local JSON)**
- **OpenTripMap API**

Each recommendation includes:
- Restaurant name
- Cuisine
- Rating and price range
- Location details
- Cuisine-appropriate dish suggestion
- Nutritional highlights
- Google Maps directions

---

🎲 Surprise Me Mode
- Interactive “Surprise Me” experience
- Food-themed animations
- Uses the same unified data pipeline as other sections
- Provides curated restaurant suggestions instantly

---

📍 Location-Aware Recommendations
- Browser-based current location detection
- City-based normalization for consistent results
- Seamless fallback when precise location is unavailable

---

🍲 Deterministic Dish Mapping
- Each restaurant is consistently paired with a cuisine-appropriate dish
- Dish selection is stable across sessions
- Ensures logical and repeatable recommendations

---

🧠 System Architecture (Overview)

User Input (Text / Voice)  
↓  
Intent & Emotion Detection  
↓  
Cuisine, Budget & Mood Filtering  
↓  
Restaurant Data Aggregation  
- Foursquare API  
- Kaggle Dataset  
- OpenTripMap API  
↓  
Deduplication & Normalization  
↓  
Deterministic Dish Assignment  
↓  
Restaurant Cards Rendered in UI  

---

🍽️ Supported Cuisines

- Indian  
- Chinese  
- Italian  
- Mexican  
- Japanese  
- Thai  
- Mediterranean  
- American  
- French  
- Korean  

Each cuisine is mapped to authentic and commonly recognized dishes.

---

🎨 UI & UX Highlights

- Food-themed design system
- Animated restaurant cards
- Smooth transitions and micro-interactions
- Emoji-friendly, approachable tone
- Clean, modern layout suitable for production use

---

🛠️ Technology Stack

- Frontend: React, TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS, shadcn/ui
- Animations: Framer Motion
- APIs: REST-based integrations
- AI/NLP: LLM-powered intent and emotion analysis

---

🧪 Reliability & Consistency

- Unified data pipeline across all recommendation sections
- Deterministic logic for dish assignment
- Normalized cuisine and location handling
- Scalable architecture for adding new data sources

---

🚀 Running the Project Locally

### Prerequisites
- Node.js (v18 or later)
- npm

Setup

```bash
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
npm install
npm run dev
```

---

🔐 Environment Variables

Create a `.env` file in the root directory:

```env
FSQ_API_KEY=your_foursquare_key
OPENTRIPMAP_API_KEY=your_opentripmap_key
GROQ_API_KEY=your_groq_key
DEEPSEEK_API_KEY=your_deepseek_key
```

---

🎯 Project Scope

SmartDine demonstrates:
- Real-world API integration
- Data merging and normalization
- AI-assisted conversational UX
- Emotion-aware recommendation logic
- Scalable frontend architecture

This project is suitable for technical evaluations, portfolio reviews, and real-world application use cases.

---

👩‍💻 Author

Designed and built as a full-stack AI-driven application focused on usability, data accuracy, and polished user experience.
