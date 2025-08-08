const { test } = require('node:test');
const assert = require('node:assert');

// Mock environment variable for testing
process.env.CLAUDE_API_KEY = 'test_key_for_testing';

const { buildPrompt } = require('../server');

test('buildPrompt includes required fields and correct data richness', () => {
  const userData = {
    dataRichness: { level: 5, percentage: 31 },
    required: { dateOfBirth: '1990-01-01', zodiacSign: 'Capricorn' },
    optional: {},
    preferences: {},
    context: {}
  };
  const prompt = buildPrompt(userData);
  
  // Use assert instead of expect
  assert(prompt.includes('Date of Birth: 1990-01-01'), 'Prompt should contain date of birth');
  assert(prompt.includes('Zodiac Sign: Capricorn'), 'Prompt should contain zodiac sign');
  assert(prompt.includes('Data Richness Level: 5/16 (31%)'), 'Prompt should contain data richness level');
});

