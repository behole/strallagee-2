# 🌟 Sacred Geometry Horoscope Survey

A mystical proof-of-concept application that demonstrates how more user data leads to richer, more personalized horoscope content using Claude AI. Features an interactive sacred geometry wheel interface with cosmic visuals.

## ✨ Features

- **Sacred Geometry Interface**: Interactive circular wheel with 16 survey questions arranged in sacred patterns
- **Visual Data Collection**: 16 data points displayed as nodes that fill and connect as questions are answered
- **Real-time Sacred Connections**: Lines draw between answered questions creating geometric patterns
- **Cosmic Theme**: Beautiful starry background with mystical visual design
- **Claude AI Integration**: Uses Anthropic's Claude API for nuanced, thoughtful horoscope generation
- **Adaptive Prompting**: Different prompt strategies based on data richness level (1-16 questions)
- **Responsive Design**: Mobile-optimized sacred geometry interface

## 🚀 Quick Setup

### Prerequisites
- Node.js 16+ installed
- Claude API key from [Anthropic Console](https://console.anthropic.com/)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the `.env.example` to `.env` and add your Claude API key:

```bash
cp .env.example .env
```

Edit `.env`:
```bash
CLAUDE_API_KEY=your_actual_claude_api_key_here
PORT=3000
```

Get your API key from: https://console.anthropic.com/

### 3. Run the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

Visit: http://localhost:3000

## 🧪 Testing the Core Hypothesis

The main hypothesis is: **More data = better horoscope quality**

### Sacred Geometry Survey:
The wheel displays 16 questions in two layers:
- **Inner Circle (White Nodes)**: 8 core questions for essential personality data
- **Outer Circle (Purple Nodes)**: 8 advanced questions for deep personalization

### Test Plan:
1. **Generate readings at different data levels** (1/16, 8/16, 16/16)
2. **Compare output quality** - Does Claude actually use the additional data?
3. **Visual feedback** - Watch the sacred geometry patterns emerge as data increases
4. **User engagement** - Does the mystical interface encourage more data sharing?

### Example Test Cases:

**Minimal Data (Level 1-2/16):**
- Just zodiac sign and birth date → Basic reading

**Medium Data (Level 8/16):**
- Core questions completed → Targeted reading with personality insights

**Maximum Data (Level 16/16):**
- All inner and outer circle questions → Deeply personalized mystical guidance

## 📊 Data Structure

The app generates structured JSON for Claude:

```json
{
  "timestamp": "2025-07-31T...",
  "dataRichness": {
    "level": 12,
    "percentage": 75
  },
  "required": {
    "dateOfBirth": "1990-11-15",
    "zodiacSign": "Scorpio"
  },
  "optional": {
    "timeOfBirth": "14:30",
    "birthplace": "New York, USA",
    "currentLocation": "Los Angeles, USA"
  },
  "preferences": {
    "lengthFormat": "detailed",
    "heartStatus": "partnered",
    "vibeCheck": "reflection",
    "archetype": "vulnerable"
  },
  "context": {
    "goalsAndIntentions": "Working on self-confidence...",
    "currentMood": "creative",
    "lifePhase": "transitioning",
    "spiritualPractice": "meditation",
    "challengesFacing": "Career uncertainty and relationship growth"
  }
}
```

## 🔧 Customization Options

### Modify Prompts
Edit the `buildPrompt()` function in `server.js` to adjust how Claude interprets different data levels.

### Add New Data Points
1. Add question to the `questions` array in `public/index.html`
2. Assign to appropriate layer ('white' for core, 'purple' for advanced)
3. Update wheel initialization to handle new node positioning
4. Modify prompt building logic in `server.js`

### Change AI Model
Update the model in the API call:
```javascript
model: 'claude-3-5-sonnet-20241022'  // or claude-3-opus-20240229
```

## 🚨 Troubleshooting

### "Claude API error: 401"
- Check your API key in `.env`
- Ensure the key has proper permissions

### "Cannot connect to server"
- Verify Node.js is running: `npm start`
- Check port 3000 isn't in use

### "No horoscope generated"
- Check browser console for errors
- Verify network requests in DevTools

## 💡 Next Steps for Full App

1. **User Authentication** - Save preferences and reading history
2. **Database Integration** - Store user data and generated readings
3. **A/B Testing Framework** - Compare different prompt strategies
4. **Mobile App** - React Native or Flutter implementation
5. **Premium Features** - Detailed birth chart analysis, transit alerts
6. **Social Features** - Share readings, compatibility matching

## 📈 Analytics to Track

- **Data completion rates** - How many users fill additional fields?
- **Reading satisfaction** - Rate readings by data level
- **Return usage** - Do users with richer profiles return more?
- **Feature usage** - Which data points matter most?

## 🛠 Tech Stack

- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API
- **Frontend**: Vanilla HTML/CSS/JavaScript with Sacred Geometry calculations
- **Deployment**: Configured for Vercel with proper static file serving
- **Design**: Cosmic background with responsive sacred geometry interface

## 🌌 Sacred Geometry Features

### Interactive Wheel
- **16 Questions**: Arranged in two concentric circles (8 inner white, 8 outer purple)
- **Dynamic Connections**: Lines draw between answered questions and to center
- **Visual Feedback**: Nodes fill with colors as questions are completed
- **Responsive Design**: Scales beautifully on mobile devices

### Cosmic Visual Design
- **Starry Background**: Beautiful cosmic image sets mystical atmosphere
- **Sacred Patterns**: Geometric connections emerge as data increases
- **Smooth Animations**: CSS transitions for engaging user experience

## 🚀 Live Demo

Visit the live application: **https://strallagee-new.vercel.app/**

---

**Cost Estimate**: Claude API costs ~$0.01-0.03 per horoscope generation, making this very affordable for testing with mystical appeal.
