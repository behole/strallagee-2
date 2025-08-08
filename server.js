const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
   const PORT = process.env.PORT || 3000;

   // ---- Early exit if API key missing ----
   if (!process.env.CLAUDE_API_KEY) {
     console.error('❌ CLAUDE_API_KEY is not defined. Add it to .env and restart.');
     process.exit(1);
   }

   // ---- CORS configuration ----
   const allowedOrigins =
     process.env.NODE_ENV === 'production'
       ? ['https://your-production-domain.com'] // ← replace with real domain(s)
       : ['http://localhost:3000'];

   app.use(
     cors({
       origin: (origin, cb) => {
         if (!origin) return cb(null, true);
         if (allowedOrigins.includes(origin)) return cb(null, true);
         return cb(new Error('Not allowed by CORS'), false);
       },
     })
   );

   app.use(express.json());
   
   // Content Security Policy headers to prevent XSS attacks
   app.use((req, res, next) => {
     res.setHeader('Content-Security-Policy', 
       "default-src 'self'; " +
       "script-src 'self' 'unsafe-inline'; " + // Allow inline scripts for now (will be removed in next task)
       "style-src 'self' 'unsafe-inline'; " +  // Allow inline styles for now (will be removed in next task)
       "img-src 'self' data: https:; " +
       "font-src 'self' https://fonts.gstatic.com; " +
       "connect-src 'self' https://api.anthropic.com; " +
       "frame-ancestors 'none'; " +
       "base-uri 'self'; " +
       "form-action 'self';"
     );
     res.setHeader('X-Content-Type-Options', 'nosniff');
     res.setHeader('X-Frame-Options', 'DENY');
     res.setHeader('X-XSS-Protection', '1; mode=block');
     res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
     next();
   });
   
   app.use(express.static('public'));

   // ---- Simple sanitiser ----
   function sanitize(value) {
     if (typeof value !== 'string') return '';
     return value.replace(/[\r\n]+/g, ' ').trim();
   }

   // ---- Prompt builder (unchanged) ----
   function buildPrompt(userData) {
     const { dataRichness, required, optional, preferences, context } = userData;
     const today = new Date().toLocaleDateString('en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
     });
     let prompt = `You are a skilled astrologer creating a personalized horoscope for today, ${today}. Here's what you know about this
   person:\n\n`;

     // Required info
     prompt += `**Core Info:**\n`;
     prompt += `- Date of Birth: ${required.dateOfBirth}\n`;
     prompt += `- Zodiac Sign: ${required.zodiacSign}\n\n`;

     // Optional data
     if (Object.keys(optional).length) {
       prompt += `**Cosmic Blueprint Details:**\n`;
       if (optional.birthTime) prompt += `- Birth Time Knowledge: ${optional.birthTime}\n`;
       if (optional.birthLocation) prompt += `- Birth Location: ${optional.birthLocation}\n`;
       if (optional.currentLocation) prompt += `- Current Location: ${optional.currentLocation}\n`;
       if (optional.genderIdentity) prompt += `- Gender Identity: ${optional.genderIdentity}\n`;
       prompt += `\n`;
     }

     // Preferences
     if (Object.keys(preferences).length) {
       prompt += `**Guide & Tone Preferences:**\n`;
       if (preferences.cosmicDepth) {
         const depthMap = {
           light: 'Keep it light and uplifting ✨',
           truth: 'Hit me with the truth, no sugar‑coating 🔥',
           shadows: 'Show me the shadows and deeper work 🖤',
         };
         prompt += `- Depth Level: ${depthMap[preferences.cosmicDepth]}\n`;
       }
       if (preferences.guideVibe) {
         const guideMap = {
           nurturing: 'Nurturing & gentle approach',
           intuitive: 'Intuitive & poetic language',
           playful: 'Playful & bold energy',
           direct: 'Clear & direct communication',
           'cosmic-clown': 'Meme‑ified & cosmic clown humor',
           surprise: 'Surprise me with your style',
         };
         prompt += `- Guide Style: ${guideMap[preferences.guideVibe]}\n`;
       }
       if (preferences.supportTone) {
         const supportMap = {
           affirming: 'Affirming & soft support',
           'tough-love': 'Truthful & tough love',
           spiritual: 'Spiritual & symbolic guidance',
           practical: 'Grounded & practical advice',
         };
         prompt += `- Support Style: ${supportMap[preferences.supportTone]}\n`;
       }
       prompt += `\n`;
     }

     // Context
     if (Object.keys(context).length) {
       prompt += `**Inner Weather & Current State:**\n`;
       if (context.innerStirring) prompt += `- What's stirring inside: ${context.innerStirring}\n`;
       if (context.heartState) prompt += `- Heart state today: ${context.heartState}\n`;
       if (context.seekingClarity) prompt += `- Seeking clarity on: ${context.seekingClarity}\n`;
       if (context.loveInterestSign) prompt += `- Love interest's sign: ${context.loveInterestSign}\n`;
       if (context.inFlux) prompt += `- Most in flux: ${context.inFlux}\n`;
       if (context.avoidingTruth) prompt += `- Truth being avoided: ${context.avoidingTruth}\n`;
       if (context.seasonWish) prompt += `- Wish for this season: ${context.seasonWish}\n`;
       prompt += `\n`;
     }

     // Data‑richness instruction
     prompt += `**Data Richness Level: ${dataRichness.level}/16 (${dataRichness.percentage}%)**\n`;
     prompt += `Tailor the depth and personalization of your reading to match this data level. `;

     if (dataRichness.level <= 2) {
       prompt += `With basic info, focus on general zodiac themes but make them feel personal.`;
     } else if (dataRichness.level <= 5) {
       prompt += `With moderate data, weave in their preferences and relationship status for relevance.`;
     } else if (dataRichness.level <= 8) {
       prompt += `With rich data, incorporate birth time details, current location influences, and their specific archetype.`;
     } else {
       prompt += `With maximum data, create a deeply personalized reading that addresses their specific goals, uses their preferred
   style, and incorporates all astrological details.`;
     }

     prompt += `\n\nGenerate a horoscope that feels specifically written for this person. Match their cosmic depth preference, guide
   style, and support tone. Address what they're seeking clarity on and what's stirring inside them. Be insightful, authentic, and avoid
   generic advice. Use their preferred communication style from the guide vibe selection.`;

     return prompt;
   }

   // ---- Export for Vercel & tests ----
   module.exports = app;
   module.exports.buildPrompt = buildPrompt;

   // ---- Claude call with timeout ----
   async function generateHoroscope(userData) {
     const prompt = buildPrompt(userData);
     const controller = new AbortController();
     const timeout = setTimeout(() => controller.abort(), 15000); // 15 s
     try {
       const response = await fetch('https://api.anthropic.com/v1/messages', {
         method: 'POST',
         signal: controller.signal,
         headers: {
           'Content-Type': 'application/json',
           'X-API-Key': process.env.CLAUDE_API_KEY,
           'anthropic-version': '2023-06-01',
         },
         body: JSON.stringify({
           model: 'claude-3-5-sonnet-latest',
           max_tokens: 1000,
           messages: [{ role: 'user', content: prompt }],
         }),
       });
       if (!response.ok) {
         throw new Error(`Claude API error: ${response.status}`);
       }
       const data = await response.json();
       return data.content[0].text;
     } finally {
       clearTimeout(timeout);
     }
   }

   // ---- Routes ----
   app.post('/api/generate-horoscope', async (req, res) => {
     try {
       const userData = req.body;
       if (!userData.required?.zodiacSign) {
         return res.status(400).json({ error: 'Zodiac sign is required' });
       }

       // ---- Sanitisation ----
       const sanitizeObject = (obj) => {
         if (!obj || typeof obj !== 'object') return {};
         const out = {};
         for (const [k, v] of Object.entries(obj)) {
           out[k] = typeof v === 'string' ? sanitize(v) : v;
         }
         return out;
       };
       userData.required = sanitizeObject(userData.required);
       userData.optional = sanitizeObject(userData.optional);
       userData.preferences = sanitizeObject(userData.preferences);
       userData.context = sanitizeObject(userData.context);
       if (userData.dataRichness) {
         userData.dataRichness.level = Number(userData.dataRichness.level) || 0;
         userData.dataRichness.percentage = Number(userData.dataRichness.percentage) || 0;
       }

       console.log(
         `Generating horoscope for ${userData.required.zodiacSign} (Data Level: ${
           userData.dataRichness?.level ?? 'N/A'
         }/16)`
       );

       const horoscope = await generateHoroscope(userData);
       res.json({
         success: true,
         horoscope,
         dataLevel: userData.dataRichness?.level,
         zodiacSign: userData.required.zodiacSign,
         generatedAt: new Date().toISOString(),
       });
     } catch (err) {
       console.error('Error generating horoscope:', err);
       res.status(500).json({ success: false, error: 'Failed to generate horoscope', message: err.message });
     }
   });

   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok', timestamp: new Date().toISOString(), claude_api_configured: !!process.env.CLAUDE_API_KEY });
   });

   app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });

   // ---- Run locally (ignored by Vercel) ----
   if (require.main === module) {
     app.listen(PORT, () => {
       console.log(`🌟 Horoscope server running on http://localhost:${PORT}`);
       console.log(`Claude API configured: ${!!process.env.CLAUDE_API_KEY}`);
       if (!process.env.CLAUDE_API_KEY) {
         console.log('⚠️  Warning: CLAUDE_API_KEY not found in environment variables');
         console.log('   Please add your Claude API key to the .env file');
       }
     });
   }
