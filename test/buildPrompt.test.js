const { test, expect } = require('node:test');
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
  expect(prompt).toContain('Date of Birth: 1990-01-01');
  expect(prompt).toContain('Zodiac Sign: Capricorn');
  expect(prompt).toContain('Data Richness Level: 5/16 (31%)');
});
