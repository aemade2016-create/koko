// Skin Quiz Page Logic

const quizQuestions = [
    {
        id: 1,
        question: "What is your skin type?",
        options: [
            { value: "oily", label: "Oily", icon: "fa-droplet" },
            { value: "dry", label: "Dry", icon: "fa-sun" },
            { value: "combination", label: "Combination", icon: "fa-circle-half-stroke" },
            { value: "normal", label: "Normal", icon: "fa-face-smile" }
        ]
    },
    {
        id: 2,
        question: "What is your main skin concern?",
        options: [
            { value: "acne", label: "Acne & Blemishes", icon: "fa-circle-dot" },
            { value: "aging", label: "Anti-Aging", icon: "fa-clock" },
            { value: "dark-spots", label: "Dark Spots", icon: "fa-circle" },
            { value: "hydration", label: "Hydration", icon: "fa-droplet" }
        ]
    },
    {
        id: 3,
        question: "How sensitive is your skin?",
        options: [
            { value: "very", label: "Very Sensitive", icon: "fa-exclamation-triangle" },
            { value: "somewhat", label: "Somewhat Sensitive", icon: "fa-exclamation-circle" },
            { value: "not", label: "Not Sensitive", icon: "fa-check-circle" }
        ]
    },
    {
        id: 4,
        question: "What's your age range?",
        options: [
            { value: "18-25", label: "18-25", icon: "fa-user" },
            { value: "26-35", label: "26-35", icon: "fa-user" },
            { value: "36-45", label: "36-45", icon: "fa-user" },
            { value: "46+", label: "46+", icon: "fa-user" }
        ]
    },
    {
        id: 5,
        question: "What's your budget preference?",
        options: [
            { value: "budget", label: "Budget Friendly (< 300 EGP)", icon: "fa-tag" },
            { value: "mid", label: "Mid Range (300-600 EGP)", icon: "fa-tags" },
            { value: "premium", label: "Premium (> 600 EGP)", icon: "fa-gem" }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = {};

function renderQuestion() {
    const question = quizQuestions[currentQuestion];
    const container = document.getElementById('quiz-container');

    container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">${question.question}</h2>
        <div class="grid md:grid-cols-2 gap-4">
            ${question.options.map(option => `
                <button onclick="selectAnswer('${option.value}')" 
                    class="quiz-option flex items-center gap-4 p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-gray-700 transition">
                    <i class="fas ${option.icon} text-3xl text-pink-600"></i>
                    <span class="text-lg font-semibold">${option.label}</span>
                </button>
            `).join('')}
        </div>

        ${currentQuestion > 0 ? `
            <button onclick="previousQuestion()" class="mt-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                <i class="fas fa-arrow-left mr-2"></i>Previous Question
            </button>
        ` : ''}
    `;

    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function selectAnswer(value) {
    const question = quizQuestions[currentQuestion];
    quizAnswers[question.id] = value;

    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

async function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');

    // Analyze answers
    const skinType = quizAnswers[1];
    const concern = quizAnswers[2];
    const sensitivity = quizAnswers[3];

    // Display analysis
    const analysisContainer = document.getElementById('skin-analysis');
    analysisContainer.innerHTML = `
        <div class="text-center p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
            <i class="fas fa-droplet text-3xl text-pink-600 mb-2"></i>
            <p class="font-semibold">Skin Type</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${skinType}</p>
        </div>
        <div class="text-center p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
            <i class="fas fa-bullseye text-3xl text-pink-600 mb-2"></i>
            <p class="font-semibold">Main Concern</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${concern}</p>
        </div>
        <div class="text-center p-4 bg-pink-50 dark:bg-gray-700 rounded-lg">
            <i class="fas fa-shield-alt text-3xl text-pink-600 mb-2"></i>
            <p class="font-semibold">Sensitivity</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${sensitivity}</p>
        </div>
    `;

    // Get recommended products
    const allProducts = await getAllProducts();
    const recommended = allProducts.filter(product => {
        // Match skin type
        if (!product.suitableFor.includes(skinType)) return false;

        // Match concern
        const concernMap = {
            'acne': 'acne',
            'aging': 'anti-aging',
            'dark-spots': 'dark spots',
            'hydration': 'hydration'
        };
        if (product.concerns.length > 0 && !product.concerns.includes(concernMap[concern])) return false;

        // Match budget
        const budget = quizAnswers[5];
        if (budget === 'budget' && product.price > 300) return false;
        if (budget === 'mid' && (product.price < 300 || product.price > 600)) return false;
        if (budget === 'premium' && product.price < 600) return false;

        return true;
    }).slice(0, 6);

    // Display recommended products
    const productsContainer = document.getElementById('recommended-products');
    if (recommended.length > 0) {
        productsContainer.innerHTML = recommended.map(product => createProductCard(product)).join('');
        updatePageTranslations();
    } else {
        productsContainer.innerHTML = '<p class="col-span-3 text-center text-gray-500">No exact matches found. Browse all products to find what you need!</p>';
    }

    // Save quiz results
    AppState.quizResults = {
        answers: quizAnswers,
        date: new Date().toISOString(),
        recommendations: recommended.map(p => p.id)
    };
    saveStateToStorage();

    window.scrollTo(0, 0);
}

function restartQuiz() {
    currentQuestion = 0;
    quizAnswers = {};
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('results-container').classList.add('hidden');
    renderQuestion();
    window.scrollTo(0, 0);
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quiz-container')) {
        renderQuestion();
    }
});
