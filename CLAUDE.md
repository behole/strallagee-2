# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Build (no-op in this project)
npm run build
```

## Environment Setup

This project requires a Claude API key:
1. Copy `.env.example` to `.env` (if exists, or create `.env`)
2. Add `CLAUDE_API_KEY=your_actual_claude_api_key_here`
3. Optionally set `PORT=3000` (defaults to 3000)

Get API key from: https://console.anthropic.com/

## Architecture Overview

This is a Node.js/Express application that generates personalized horoscopes using Claude AI, featuring a Sacred Geometry interface for data collection.

### Core Components

**Backend (server.js):**
- Express server with CORS and JSON middleware
- Single `/api/generate-horoscope` POST endpoint
- Claude API integration using claude-3-5-sonnet-latest model
- Adaptive prompt building based on data richness (1-16 data points)
- Health check endpoint at `/api/health`

**Frontend (public/index.html):**
- Single-page vanilla HTML/CSS/JavaScript application
- Sacred geometry wheel interface with 16 survey questions
- Two concentric circles: inner (white nodes) for core questions, outer (purple nodes) for advanced
- Real-time visual feedback as questions are answered
- Mobile-optimized responsive design with cosmic background

**Data Structure:**
The app sends structured JSON to Claude with these sections:
- `required`: Basic info (dateOfBirth, zodiacSign)
- `optional`: Cosmic blueprint details (birthTime, locations, etc.)
- `preferences`: Guide style, cosmic depth, support tone
- `context`: Inner weather, current state, seeking clarity on specific topics
- `dataRichness`: Level (1-16) and percentage for prompt adaptation

### Key Features

**Adaptive Prompting System:**
- Different prompt strategies based on data richness level:
  - Levels 1-2: General zodiac themes made personal
  - Levels 3-5: Incorporates preferences and relationship status  
  - Levels 6-8: Adds birth time details and location influences
  - Levels 9-16: Deeply personalized with goals and specific guidance styles

**Sacred Geometry Interface:**
- 16 questions arranged in mathematical patterns
- Visual connections drawn between answered questions
- Progressive data collection encouraging user engagement
- Responsive wheel that scales for mobile devices

## File Structure

```
├── server.js              # Main Express server and Claude API integration
├── public/
│   ├── index.html         # Complete frontend application
│   └── bkg.jpg           # Cosmic background image
├── package.json          # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
└── README.md             # Detailed project documentation
```

## API Integration

**Claude API Details:**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-3-5-sonnet-latest`
- Max tokens: 1000
- API version: `2023-06-01`

**Error Handling:**
- Server validates zodiac sign requirement
- Comprehensive error responses with status codes
- Console logging for debugging Claude API calls

## Testing the Core Hypothesis

The main hypothesis is "More data = better horoscope quality". Test by:
1. Generating readings at different data levels (1/16, 8/16, 16/16)
2. Comparing output quality and personalization
3. Observing visual feedback in sacred geometry patterns
4. Measuring user engagement with progressive data collection

## Deployment

Configured for Vercel with:
- Node.js serverless functions
- Static file serving for frontend assets
- Route handling for API and static content
- Environment variable support for Claude API key

## Cost Considerations

Claude API costs approximately $0.01-0.03 per horoscope generation, making this affordable for testing and development.