// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve your HTML file from public folder

// Claude API integration
async function generateHoroscope(userData) {
    const prompt = buildPrompt(userData);
    
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1000,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.status}`);
        }

        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        console.error('Error calling Claude API:', error);
        throw error;
    }
}

function buildPrompt(userData) {
    const { dataRichness, required, optional, preferences, context } = userData;
    
    // Base prompt structure
    let prompt = `You are a skilled astrologer creating a personalized horoscope. Here's what you know about this person:\n\n`;
    
    // Required info
    prompt += `**Core Info:**\n`;
    prompt += `- Date of Birth: ${required.dateOfBirth}\n`;
    prompt += `- Zodiac Sign: ${required.zodiacSign}\n\n`;
    
    // Optional astrological data
    if (Object.keys(optional).length > 0) {
        prompt += `**Astrological Details:**\n`;
        if (optional.timeOfBirth) prompt += `- Birth Time: ${optional.timeOfBirth} (use for rising sign and houses)\n`;
        if (optional.birthplace) prompt += `- Birthplace: ${optional.birthplace}\n`;
        if (optional.currentLocation) prompt += `- Current Location: ${optional.currentLocation} (for transits)\n`;
        if (optional.sexAssigned) prompt += `- Sex Assigned at Birth: ${optional.sexAssigned}\n`;
        if (optional.genderIdentity) prompt += `- Pronouns/Identity: ${optional.genderIdentity}\n`;
        prompt += `\n`;
    }
    
    // Preferences for tone and style
    if (Object.keys(preferences).length > 0) {
        prompt += `**Reading Preferences:**\n`;
        if (preferences.lengthFormat) {
            const formatMap = {
                'quick': 'Quick daily focus - what\'s happening TODAY',
                'twoWeeks': 'Two-week overview with key themes',
                'detailed': 'Long, detailed nerdy format with full astrological context'
            };
            prompt += `- Format: ${formatMap[preferences.lengthFormat]}\n`;
        }
        if (preferences.heartStatus) prompt += `- Relationship Status: ${preferences.heartStatus}\n`;
        if (preferences.vibeCheck) {
            const vibeMap = {
                'encouragement': 'Needs encouragement and positive energy',
                'fire': 'Needs motivation and a kick into gear',
                'reflection': 'Wants soulful reflection and depth',
                'sass': 'Wants cosmic sass and straight talk'
            };
            prompt += `- Desired Vibe: ${vibeMap[preferences.vibeCheck]}\n`;
        }
        if (preferences.archetype) prompt += `- Personality Archetype: ${preferences.archetype}\n`;
        if (preferences.preferredGuru) prompt += `- Preferred Astrology Style: ${preferences.preferredGuru}\n`;
        prompt += `\n`;
    }
    
    // Goals and context
    if (context.goalsAndIntentions) {
        prompt += `**Current Goals & Intentions:**\n${context.goalsAndIntentions}\n\n`;
    }
    
    // Additional context from sacred geometry form
    if (context.currentMood || context.lifePhase || context.spiritualPractice || context.challengesFacing) {
        prompt += `**Additional Context:**\n`;
        if (context.currentMood) prompt += `- Current Mood: ${context.currentMood}\n`;
        if (context.lifePhase) prompt += `- Life Phase: ${context.lifePhase}\n`;
        if (context.spiritualPractice) prompt += `- Spiritual Practice: ${context.spiritualPractice}\n`;
        if (context.challengesFacing) prompt += `- Current Challenges: ${context.challengesFacing}\n`;
        prompt += `\n`;
    }
    
    // Data richness instruction
    prompt += `**Data Richness Level: ${dataRichness.level}/16 (${dataRichness.percentage}%)**\n`;
    prompt += `Tailor the depth and personalization of your reading to match this data level. `;
    
    if (dataRichness.level <= 2) {
        prompt += `With basic info, focus on general zodiac themes but make them feel personal.`;
    } else if (dataRichness.level <= 5) {
        prompt += `With moderate data, weave in their preferences and relationship status for relevance.`;
    } else if (dataRichness.level <= 8) {
        prompt += `With rich data, incorporate birth time details, current location influences, and their specific archetype.`;
    } else {
        prompt += `With maximum data, create a deeply personalized reading that addresses their specific goals, uses their preferred style, and incorporates all astrological details.`;
    }
    
    prompt += `\n\nGenerate a horoscope that feels specifically written for this person. Match their requested vibe and format. Be insightful, authentic, and avoid generic advice.`;
    
    return prompt;
}

// API Routes
app.post('/api/generate-horoscope', async (req, res) => {
    try {
        const userData = req.body;
        
        // Validate required data
        if (!userData.required?.dateOfBirth) {
            return res.status(400).json({ 
                error: 'Date of birth is required' 
            });
        }
        
        console.log(`Generating horoscope for ${userData.required.zodiacSign} (Data Level: ${userData.dataRichness.level}/12)`);
        
        const horoscope = await generateHoroscope(userData);
        
        res.json({
            success: true,
            horoscope: horoscope,
            dataLevel: userData.dataRichness.level,
            zodiacSign: userData.required.zodiacSign,
            generatedAt: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error generating horoscope:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate horoscope',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        claude_api_configured: !!process.env.CLAUDE_API_KEY
    });
});

// Serve the frontend - now defaults to sacred geometry interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sacred-geometry.html'));
});

// Keep old interface available at /simple
app.get('/simple', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🌟 Horoscope server running on http://localhost:${PORT}`);
    console.log(`Claude API configured: ${!!process.env.CLAUDE_API_KEY}`);
    
    if (!process.env.CLAUDE_API_KEY) {
        console.log('⚠️  Warning: CLAUDE_API_KEY not found in environment variables');
        console.log('   Please add your Claude API key to the .env file');
    }
});