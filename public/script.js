// 16 Survey questions - 8 white (cosmic blueprint), 8 purple (inner weather)
const questions = [
    // FIRST LAYER - WHITE NODES (🌒 Your Cosmic Blueprint)
    {
        id: 'sunSign',
        title: '☉ What\'s your sign?',
        type: 'select',
        layer: 'white',
        options: [
            'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
            'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
        ],
        required: true
    },
    {
        id: 'birthDate',
        title: '📅 Your date of birth',
        type: 'date',
        layer: 'white'
    },
    {
        id: 'birthTime',
        title: '⏰ Your time of birth',
        type: 'conditional',
        layer: 'white',
        options: [
            { value: 'exact', label: 'I know the exact time' },
            { value: 'approximate', label: 'I know approximately' },
            { value: 'unknown', label: 'I don\'t know' }
        ],
        followUp: {
            'exact': { type: 'time', placeholder: 'Enter exact time' },
            'approximate': { type: 'text', placeholder: 'e.g., "morning", "afternoon", "evening"' }
        }
    },
    {
        id: 'birthLocation',
        title: '📍 Your birth location',
        type: 'text',
        layer: 'white',
        placeholder: 'City + Country'
    },
    {
        id: 'currentLocation',
        title: '🗺 Where are you currently living?',
        type: 'text',
        layer: 'white',
        placeholder: 'City + Country'
    },
    {
        id: 'genderIdentity',
        title: '💫 How do you identify?',
        type: 'text',
        layer: 'white',
        placeholder: 'Gender identity'
    },
    {
        id: 'cosmicDepth',
        title: '🔮 How deep do you want to go?',
        type: 'select',
        layer: 'white',
        options: [
            'Surface level - keep it light',
            'Medium depth - some cosmic insights',
            'Deep dive - full mystical experience',
            'Maximum depth - blow my mind'
        ]
    },
    {
        id: 'guideVibe',
        title: '✨ What kind of guide do you want?',
        type: 'select',
        layer: 'white',
        options: [
            'Wise elder - ancient wisdom',
            'Best friend - casual and supportive',
            'Mystical oracle - poetic and mysterious',
            'Straight shooter - direct and honest'
        ]
    },

    // SECOND LAYER - PURPLE NODES (🌙 Your Inner Weather)
    {
        id: 'innerStirring',
        title: '🌊 What\'s stirring inside you lately?',
        type: 'select',
        layer: 'purple',
        options: [
            'Restlessness - need for change',
            'Curiosity - seeking new experiences',
            'Anxiety - feeling uncertain',
            'Excitement - anticipating something',
            'Melancholy - processing emotions',
            'Clarity - things are becoming clear'
        ]
    },
    {
        id: 'heartState',
        title: '💖 How\'s your heart feeling?',
        type: 'select',
        layer: 'purple',
        options: [
            'Open and ready for love',
            'Healing from past wounds',
            'Guarded but hopeful',
            'Content and peaceful',
            'Passionate and intense',
            'Confused about feelings'
        ]
    },
    {
        id: 'seekingClarity',
        title: '🔍 What do you need clarity on?',
        type: 'select',
        layer: 'purple',
        options: [
            'Career and life direction',
            'Relationships and love',
            'Personal growth and healing',
            'Creative expression',
            'Spiritual path',
            'Family and home life'
        ]
    },
    {
        id: 'loveInterestSign',
        title: '💕 Any special someone\'s sign?',
        type: 'conditional',
        layer: 'purple',
        options: [
            { value: 'yes', label: 'Yes, I have someone in mind' },
            { value: 'no', label: 'No, I\'m flying solo' },
            { value: 'complicated', label: 'It\'s complicated' }
        ],
        followUp: {
            'yes': { 
                type: 'select', 
                placeholder: 'Their zodiac sign',
                options: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
            },
            'complicated': { type: 'text', placeholder: 'Tell me more...' }
        }
    },
    {
        id: 'inFlux',
        title: '🌀 What area of life is in flux?',
        type: 'select',
        layer: 'purple',
        options: [
            'Work and career',
            'Living situation',
            'Relationships',
            'Health and wellness',
            'Creative projects',
            'Spiritual beliefs',
            'Everything feels stable'
        ]
    },
    {
        id: 'avoidingTruth',
        title: '🙈 What truth are you avoiding?',
        type: 'select',
        layer: 'purple',
        options: [
            'I need to make a big change',
            'I\'m not happy where I am',
            'I\'m scared of taking risks',
            'I\'m holding onto the past',
            'I don\'t know what I want',
            'I\'m not avoiding anything'
        ]
    },
    {
        id: 'supportTone',
        title: '🤗 What kind of support do you need?',
        type: 'select',
        layer: 'purple',
        options: [
            'Gentle encouragement',
            'Tough love motivation',
            'Practical guidance',
            'Emotional validation',
            'Spiritual wisdom',
            'Just listen and understand'
        ]
    },
    {
        id: 'seasonWish',
        title: '🍂 What do you wish for this season?',
        type: 'text',
        layer: 'purple',
        placeholder: 'Your deepest wish or intention...'
    }
];

// Global variables
let currentQuestionIndex = 0;
let answers = {};
let nodes = [];

// Sacred geometry calculations
function calculateNodePosition(index, total, radius, centerX, centerY) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
}

function initializeWheel() {
    const wheel = document.querySelector('.sacred-wheel');
    const wheelRect = wheel.getBoundingClientRect();
    const centerX = wheelRect.width / 2;
    const centerY = wheelRect.height / 2;
    
    // Create nodes for each question
    questions.forEach((question, index) => {
        const node = document.createElement('div');
        node.className = 'node empty';
        node.textContent = index + 1;
        
        // Position calculation - arrange in circle
        const radius = Math.min(wheelRect.width, wheelRect.height) * 0.35;
        const position = calculateNodePosition(index, questions.length, radius, centerX, centerY);
        
        node.style.left = `${position.x - 30}px`; // 30px = half node width
        node.style.top = `${position.y - 30}px`;  // 30px = half node height
        
        // Add click handler
        node.addEventListener('click', () => goToQuestion(index));
        
        wheel.appendChild(node);
        
        // Store node reference
        nodes.push({
            element: node,
            question: question,
            index: index,
            position: position
        });
    });
    
    // Load first question
    loadQuestion(0);
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion(index);
}

function loadQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('questions-container');
    
    // Generate options HTML
    let optionsHTML = '';
    let onboardingHTML = '';
    let ctaHTML = '';
    
    // Add onboarding for first question
    if (index === 0) {
        onboardingHTML = `
            <div class="onboarding">
                <h3>🌟 Welcome to Your Sacred Geometry Reading</h3>
                <p>Answer questions to fill the cosmic wheel. Each response creates connections in your personal constellation.</p>
            </div>
        `;
    }
    
    if (question.type === 'select') {
        question.options.forEach(option => {
            const selected = answers[question.id] === option ? 'selected' : '';
            optionsHTML += `<div class="option ${selected}" data-question-id="${question.id}" data-value="${option}">${option}</div>`;
        });
    } else if (question.type === 'conditional') {
        question.options.forEach(option => {
            const selected = answers[question.id] === option.value ? 'selected' : '';
            optionsHTML += `<div class="option ${selected}" data-question-id="${question.id}" data-value="${option.value}" data-follow-up='${JSON.stringify(question.followUp || {})}'>${option.label}</div>`;
        });
    } else if (question.type === 'date') {
        const value = answers[question.id] || '';
        optionsHTML = `<input type="date" class="option" data-question-id="${question.id}" value="${value}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 18px 24px; border-radius: 8px; width: 100%; font-size: 16px;">`;
    } else if (question.type === 'time') {
        const value = answers[question.id] || '';
        optionsHTML = `<input type="time" class="option" data-question-id="${question.id}" value="${value}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 18px 24px; border-radius: 8px; width: 100%; font-size: 16px;">`;
    } else if (question.type === 'text') {
        const value = answers[question.id] || '';
        const placeholder = question.placeholder || 'Your answer...';
        optionsHTML = `<input type="text" class="option" data-question-id="${question.id}" value="${value}" placeholder="${placeholder}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 18px 24px; border-radius: 8px; width: 100%; font-size: 16px;">`;
    }
    
    // Add CTA for final questions
    if (index >= questions.length - 3) {
        const answeredCount = Object.keys(answers).length;
        if (answeredCount >= 2) {
            ctaHTML = `
                <div class="cta-section">
                    <h3>✨ Ready for Your Reading?</h3>
                    <p>You've answered ${answeredCount} questions. The more you share, the more personalized your cosmic reading becomes.</p>
                    <button class="btn primary" id="generate-horoscope-btn" style="width: 100%; margin-top: 15px; font-size: 18px; padding: 20px;">
                        🔮 Generate My Reading
                    </button>
                </div>
            `;
        }
    }

    // Clear container safely
    container.textContent = '';
    
    // Create question container
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container active';
    
    // Add onboarding HTML if present
    if (onboardingHTML) {
        const onboardingDiv = document.createElement('div');
        onboardingDiv.innerHTML = onboardingHTML; // Safe here as onboardingHTML is static content
        questionContainer.appendChild(onboardingDiv);
    }
    
    // Add question title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'question-title';
    titleDiv.textContent = question.title;
    questionContainer.appendChild(titleDiv);
    
    // Add question options
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'question-options';
    optionsDiv.innerHTML = optionsHTML; // Safe here as optionsHTML is generated from controlled data
    questionContainer.appendChild(optionsDiv);
    
    // Add CTA if present
    if (ctaHTML) {
        const ctaDiv = document.createElement('div');
        ctaDiv.innerHTML = ctaHTML; // Safe here as ctaHTML is static content
        questionContainer.appendChild(ctaDiv);
    }
    
    container.appendChild(questionContainer);

    updateProgress();
    updateNavigation();
    
    // Add event listeners for the new elements
    addEventListeners();
}

function addEventListeners() {
    // Add event listeners for option selection
    document.querySelectorAll('.option').forEach(option => {
        if (option.tagName === 'DIV') {
            option.addEventListener('click', function() {
                const questionId = this.dataset.questionId;
                const value = this.dataset.value;
                const followUp = this.dataset.followUp;
                
                if (followUp && followUp !== '{}') {
                    selectConditionalOption(questionId, value, JSON.parse(followUp));
                } else {
                    selectOption(questionId, value);
                }
            });
        } else if (option.tagName === 'INPUT') {
            option.addEventListener('change', function() {
                const questionId = this.dataset.questionId;
                const value = this.value;
                selectOption(questionId, value);
            });
        }
    });
    
    // Add event listener for generate horoscope button
    const generateBtn = document.getElementById('generate-horoscope-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateHoroscope);
    }
}

function selectOption(questionId, value) {
    answers[questionId] = value;
    
    // Update node visual state
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
        updateNodeState(questionIndex);
        updateConnections();
    }
    
    // Update current question display
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark selected option
    const selectedOption = document.querySelector(`[data-question-id="${questionId}"][data-value="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    updateProgress();
    updateNavigation();
}

function selectConditionalOption(questionId, value, followUpConfig) {
    answers[questionId] = value;
    
    // Update node visual state
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
        updateNodeState(questionIndex);
        updateConnections();
    }
    
    // Update current question display
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark selected option
    const selectedOption = document.querySelector(`[data-question-id="${questionId}"][data-value="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Handle follow-up question
    if (followUpConfig[value]) {
        const followUp = followUpConfig[value];
        const followUpId = questionId + '_followup';
        
        // Create follow-up input
        let followUpHTML = '';
        if (followUp.type === 'text') {
            followUpHTML = `<input type="text" class="option" data-question-id="${followUpId}" placeholder="${followUp.placeholder}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 18px 24px; border-radius: 8px; width: 100%; font-size: 16px; margin-top: 15px;">`;
        } else if (followUp.type === 'time') {
            followUpHTML = `<input type="time" class="option" data-question-id="${followUpId}" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 18px 24px; border-radius: 8px; width: 100%; font-size: 16px; margin-top: 15px;">`;
        } else if (followUp.type === 'select') {
            followUpHTML = '<div style="margin-top: 15px;">';
            followUp.options.forEach(option => {
                followUpHTML += `<div class="option" data-question-id="${followUpId}" data-value="${option}" style="margin-bottom: 8px;">${option}</div>`;
            });
            followUpHTML += '</div>';
        }
        
        // Add follow-up to the current question
        const optionsContainer = document.querySelector('.question-options');
        const followUpDiv = document.createElement('div');
        followUpDiv.innerHTML = followUpHTML;
        optionsContainer.appendChild(followUpDiv);
        
        // Add event listeners for follow-up
        addEventListeners();
    }
    
    updateProgress();
    updateNavigation();
}

function updateNodeState(questionIndex) {
    const node = nodes[questionIndex];
    const question = questions[questionIndex];
    
    if (answers[question.id]) {
        if (question.layer === 'white') {
            node.element.className = 'node filled-white';
        } else {
            node.element.className = 'node filled-purple';
        }
        node.element.textContent = '✓';
    } else {
        node.element.className = 'node empty';
        node.element.textContent = questionIndex + 1;
    }
}

function updateConnections() {
    // Remove existing connections
    document.querySelectorAll('.connection-line').forEach(line => line.remove());
    
    const answeredNodes = nodes.filter(node => answers[node.question.id]);
    
    // Create connections between answered questions
    for (let i = 0; i < answeredNodes.length - 1; i++) {
        for (let j = i + 1; j < answeredNodes.length; j++) {
            createConnection(answeredNodes[i], answeredNodes[j]);
        }
    }
}

function createConnection(node1, node2) {
    const line = document.createElement('div');
    line.className = 'connection-line';
    
    const dx = node2.position.x - node1.position.x;
    const dy = node2.position.y - node1.position.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    line.style.width = `${length}px`;
    line.style.left = `${node1.position.x}px`;
    line.style.top = `${node1.position.y}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    document.querySelector('.sacred-wheel').appendChild(line);
}

function updateProgress() {
    const answeredCount = Object.keys(answers).length;
    const totalCount = questions.length;
    const percentage = Math.round((answeredCount / totalCount) * 100);
    
    let progressElement = document.querySelector('.progress');
    if (!progressElement) {
        progressElement = document.createElement('div');
        progressElement.className = 'progress';
        document.querySelector('.wheel-container').appendChild(progressElement);
    }
    
    progressElement.textContent = `${answeredCount}/${totalCount} (${percentage}%)`;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const goBtn = document.getElementById('go-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    }
    
    if (goBtn) {
        const answeredCount = Object.keys(answers).length;
        goBtn.style.display = answeredCount >= 2 ? 'block' : 'none';
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

async function generateHoroscope() {
    try {
        // Prepare user data
        const userData = {
            dataRichness: {
                level: Object.keys(answers).length,
                percentage: Math.round((Object.keys(answers).length / 16) * 100)
            },
            required: {
                dateOfBirth: answers.birthDate,
                zodiacSign: answers.sunSign
            },
            optional: {
                birthTime: answers.birthTime,
                birthLocation: answers.birthLocation,
                currentLocation: answers.currentLocation,
                genderIdentity: answers.genderIdentity
            },
            preferences: {
                cosmicDepth: answers.cosmicDepth,
                guideVibe: answers.guideVibe,
                supportTone: answers.supportTone
            },
            context: {
                innerStirring: answers.innerStirring,
                heartState: answers.heartState,
                seekingClarity: answers.seekingClarity,
                loveInterestSign: answers.loveInterestSign,
                inFlux: answers.inFlux,
                avoidingTruth: answers.avoidingTruth,
                seasonWish: answers.seasonWish
            }
        };

        // Validate user data before sending
        const validation = validateUserData(userData);
        if (!validation.isValid) {
            alert('Validation errors: ' + validation.errors.join(', '));
            return;
        }
        
        console.log('Generating horoscope with validated data:', validation.sanitizedData);

        // Call the existing horoscope generation API
        const response = await fetch('/api/generate-horoscope', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.sanitizedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            displayHoroscope(result);
        } else {
            throw new Error(result.error || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Error generating horoscope:', error);
        alert('Sorry, there was an error generating your horoscope. Please try again.');
    }
}

// Input validation functions
function validateUserData(userData) {
    const errors = [];
    
    // Validate required fields
    if (!userData.required.zodiacSign) {
        errors.push('Zodiac sign is required');
    }
    
    // Validate zodiac sign against allowed values
    const validZodiacSigns = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    if (userData.required.zodiacSign && !validZodiacSigns.includes(userData.required.zodiacSign)) {
        errors.push('Invalid zodiac sign');
    }
    
    // Validate date format if provided
    if (userData.required.dateOfBirth) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(userData.required.dateOfBirth)) {
            errors.push('Invalid date format for birth date');
        }
    }
    
    // Validate data richness level
    if (userData.dataRichness && (userData.dataRichness.level < 0 || userData.dataRichness.level > 16)) {
        errors.push('Invalid data richness level');
    }
    
    // Sanitize string inputs
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/[<>\"'&]/g, '').trim().substring(0, 1000); // Remove dangerous chars and limit length
    };
    
    // Sanitize all string values in the userData object
    const sanitizeObject = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitized[key] = sanitizeString(value);
            } else if (typeof value === 'object' && value !== null) {
                sanitized[key] = sanitizeObject(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    };
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        sanitizedData: sanitizeObject(userData)
    };
}

function displayHoroscope(result) {
    // Replace the sidebar with the horoscope result
    const sidebar = document.querySelector('.sidebar');
    
    // Clear sidebar safely
    sidebar.textContent = '';
    
    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.style.cssText = 'overflow-y: auto; max-height: 100vh; padding-bottom: 20px;';
    
    // Create title
    const title = document.createElement('h2');
    title.style.cssText = 'font-size: 24px; margin-bottom: 20px; color: #7c3aed;';
    title.textContent = `Your ${result.zodiacSign} Reading`;
    mainContainer.appendChild(title);
    
    // Create metadata
    const metadata = document.createElement('div');
    metadata.style.cssText = 'color: #999; font-size: 14px; margin-bottom: 20px;';
    metadata.textContent = `Data Level: ${result.dataLevel}/16 • Generated: ${new Date(result.generatedAt).toLocaleString()}`;
    mainContainer.appendChild(metadata);
    
    // Create horoscope content (safely handle user content)
    const horoscopeContent = document.createElement('div');
    horoscopeContent.style.cssText = 'line-height: 1.6; font-size: 16px; white-space: pre-wrap; margin-bottom: 40px;';
    horoscopeContent.textContent = result.horoscope; // Use textContent to prevent XSS
    mainContainer.appendChild(horoscopeContent);
    
    // Create sharing section
    const sharingSection = document.createElement('div');
    sharingSection.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; margin-top: 30px;';
    
    const sharingTitle = document.createElement('h3');
    sharingTitle.style.cssText = 'color: #a855f7; margin-bottom: 20px; font-size: 18px;';
    sharingTitle.textContent = '✨ Share Your Reading';
    sharingSection.appendChild(sharingTitle);
    
    const sharingButtons = document.createElement('div');
    sharingButtons.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;';
    
    // Create sharing buttons
    const buttons = [
        { text: '📧 Email', handler: shareToEmail, color: '#4F46E5', hoverColor: '#3730A3' },
        { text: '📷 Instagram', handler: shareToInstagram, color: '#E4405F', hoverColor: '#C13584' },
        { text: '🐦 Twitter', handler: shareToTwitter, color: '#1DA1F2', hoverColor: '#1A91DA' },
        { text: '📘 Facebook', handler: shareToFacebook, color: '#1877F2', hoverColor: '#166FE5' },
        { text: '📋 Copy', handler: copyToClipboard, color: '#6B7280', hoverColor: '#4B5563' }
    ];
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.style.cssText = `background: ${btn.color}; color: white; border: none; padding: 12px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: all 0.3s ease;`;
        button.addEventListener('click', btn.handler);
        button.addEventListener('mouseover', () => button.style.background = btn.hoverColor);
        button.addEventListener('mouseout', () => button.style.background = btn.color);
        sharingButtons.appendChild(button);
    });
    
    sharingSection.appendChild(sharingButtons);
    
    const startOverBtn = document.createElement('button');
    startOverBtn.className = 'btn';
    startOverBtn.textContent = '🔮 Create Another Reading';
    startOverBtn.style.cssText = 'width: 100%; margin-top: 10px;';
    startOverBtn.addEventListener('click', startOver);
    sharingSection.appendChild(startOverBtn);
    
    mainContainer.appendChild(sharingSection);
    sidebar.appendChild(mainContainer);
}

// URL validation function
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

// Safe window.open function with validation
function safeWindowOpen(url, target = '_blank') {
    if (!isValidUrl(url)) {
        console.error('Invalid URL blocked:', url);
        alert('Invalid URL detected. Action blocked for security.');
        return;
    }
    
    // Additional validation for known social media domains
    const allowedDomains = [
        'twitter.com',
        'facebook.com',
        'www.facebook.com',
        'instagram.com',
        'www.instagram.com'
    ];
    
    try {
        const urlObj = new URL(url);
        const isAllowedDomain = allowedDomains.some(domain => 
            urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
        );
        
        if (url.startsWith('mailto:') || isAllowedDomain || urlObj.origin === window.location.origin) {
            window.open(url, target);
        } else {
            console.error('Domain not allowed:', urlObj.hostname);
            alert('Domain not allowed for security reasons.');
        }
    } catch (e) {
        console.error('URL validation error:', e);
        alert('Invalid URL format.');
    }
}

// Share functions with enhanced security
function shareToEmail() {
    const subject = "My Cosmic Reading";
    const sidebarContent = document.querySelector('.sidebar div');
    if (!sidebarContent) {
        alert('No reading content found to share.');
        return;
    }
    
    const body = sidebarContent.textContent || '';
    // Limit body length to prevent extremely long URLs
    const truncatedBody = body.length > 1000 ? body.substring(0, 1000) + '...' : body;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(truncatedBody)}`;
    safeWindowOpen(mailtoLink);
}

function shareToInstagram() {
    // Instagram doesn't support direct URL sharing, so copy to clipboard instead
    copyToClipboard();
    alert("✨ Reading copied to clipboard! Paste it into your Instagram story or post.");
}

function shareToTwitter() {
    const text = "Just got my personalized cosmic reading! ✨🔮";
    const currentUrl = window.location.href;
    
    // Validate current URL before using it
    if (!isValidUrl(currentUrl)) {
        console.error('Invalid current URL:', currentUrl);
        alert('Unable to share: Invalid page URL.');
        return;
    }
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    safeWindowOpen(twitterUrl);
}

function shareToFacebook() {
    const currentUrl = window.location.href;
    
    // Validate current URL before using it
    if (!isValidUrl(currentUrl)) {
        console.error('Invalid current URL:', currentUrl);
        alert('Unable to share: Invalid page URL.');
        return;
    }
    
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    safeWindowOpen(facebookUrl);
}

function copyToClipboard() {
    const readingText = document.querySelector('.sidebar div').textContent;
    navigator.clipboard.writeText(readingText).then(() => {
        alert("📋 Reading copied to clipboard!");
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = readingText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert("📋 Reading copied to clipboard!");
    });
}

function startOver() {
    // Reset everything and start over
    answers = {};
    currentQuestionIndex = 0;
    
    // Reset all nodes
    nodes.forEach(node => {
        node.element.className = 'node empty';
        node.element.textContent = nodes.indexOf(node) + 1;
    });
    
    // Clear connections
    document.querySelectorAll('.connection-line').forEach(line => line.remove());
    
    // Reset sidebar safely
    const sidebar = document.querySelector('.sidebar');
    sidebar.textContent = '';
    
    // Create questions container
    const questionsContainer = document.createElement('div');
    questionsContainer.id = 'questions-container';
    sidebar.appendChild(questionsContainer);
    
    // Create navigation container
    const navigation = document.createElement('div');
    navigation.className = 'navigation';
    
    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn';
    prevBtn.id = 'prev-btn';
    prevBtn.textContent = 'PREV';
    prevBtn.addEventListener('click', previousQuestion);
    navigation.appendChild(prevBtn);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';
    nextBtn.id = 'next-btn';
    nextBtn.textContent = 'NEXT';
    nextBtn.addEventListener('click', nextQuestion);
    navigation.appendChild(nextBtn);
    
    const goBtn = document.createElement('button');
    goBtn.className = 'btn primary';
    goBtn.id = 'go-btn';
    goBtn.textContent = 'GO →';
    goBtn.style.display = 'none';
    goBtn.addEventListener('click', generateHoroscope);
    navigation.appendChild(goBtn);
    
    sidebar.appendChild(navigation);
    
    // Restart the survey
    loadQuestion(0);
}

// Initialize the wheel when page loads
document.addEventListener('DOMContentLoaded', initializeWheel);

// Recalculate on window resize for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Clear existing nodes
        document.querySelectorAll('.node').forEach(node => node.remove());
        document.querySelectorAll('.connection-line').forEach(line => line.remove());
        nodes = [];
        
        // Reinitialize with delay to ensure layout is complete
        setTimeout(() => {
            initializeWheel();
            // Restore answered questions
            Object.keys(answers).forEach(questionId => {
                const questionIndex = questions.findIndex(q => q.id === questionId);
                if (questionIndex !== -1) {
                    updateNodeState(questionIndex);
                }
            });
            updateConnections();
        }, 50);
    }, 300);
});
