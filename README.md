# 🌟 Horoscope Generator POC

A proof-of-concept application that demonstrates how more user data leads to richer, more personalized horoscope content using Claude AI.

## ✨ Features

- **Progressive Data Collection**: 12 optional data points that increase reading quality
- **Real-time Richness Indicator**: Visual feedback showing how each field improves the output
- **Claude AI Integration**: Uses Anthropic's Claude API for nuanced, thoughtful horoscope generation
- **Adaptive Prompting**: Different prompt strategies based on data richness level
- **Modern UI**: Clean, cosmic-themed interface with smooth interactions

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

### Test Plan:
1. **Generate readings at different data levels** (1/12, 6/12, 12/12)
2. **Compare output quality** - Does Claude actually use the additional data?
3. **User feedback** - Do people prefer richer readings?

### Example Test Cases:

**Minimal Data (Level 1/12):**
- Just birth date → Generic Scorpio reading

**Medium Data (Level 6/12):**
- Birth date + relationship status + vibe check + archetype
- Should feel more targeted and relevant

**Maximum Data (Level 12/12):**
- All fields filled → Highly personalized, specific guidance

## 📊 Data Structure

The app generates structured JSON for Claude:

```json
{
  "timestamp": "2025-07-31T...",
  "dataRichness": {
    "level": 8,
    "percentage": 67
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
    "goalsAndIntentions": "Working on self-confidence..."
  }
}
```

## 🔧 Customization Options

### Modify Prompts
Edit the `buildPrompt()` function in `server.js` to adjust how Claude interprets different data levels.

### Add New Data Points
1. Add form field to HTML
2. Update data processing in JavaScript
3. Modify prompt building logic

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
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Deployment**: Ready for Vercel, Netlify, or any Node.js host

---

**Cost Estimate**: Claude API costs ~$0.01-0.03 per horoscope generation, making this very affordable for testing.# strallagee-2
