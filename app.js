/**
 * MATH BOSS BATTLE - GAME ENGINE
 * Features: Battle state machine, dynamic config, visual effects, and local storage.
 */

// Firebase Configuration - Replace with your own project configuration from Firebase Console!
const firebaseConfig = {
  apiKey: "AIzaSyBkYIxsmK9qqbfFSoxzoUFSlAo0uy1E4jc",
  authDomain: "math-boss-game.firebaseapp.com",
  projectId: "math-boss-game",
  storageBucket: "math-boss-game.firebasestorage.app",
  messagingSenderId: "319406455291",
  appId: "1:319406455291:web:3166380b46fee31c16b35e",
  measurementId: "G-BNDBM247LW"
};

// Initialize Firebase App & Firestore
let db = null;
let isFirebaseActive = false;

try {
    if (firebaseConfig && firebaseConfig.projectId && typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        isFirebaseActive = true;
        console.log("Firebase initialized successfully!");
    } else {
        console.log("Firebase is not configured or SDK not loaded. Operating in Local Mode.");
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Default configuration from user request
const DEFAULT_STAGES = [
    {
        "stage": 1,
        "bossName": "朱孟玲",
        "bossGender": "female",
        "avatarUrl": "assets/boss_mengling.png",
        "dialogue": "想過第一關？先算對我的乘除法！",
        "questions": [
            { "question": "8 × 7 = ?", "options": ["54", "56", "64", "48"], "answer": 1 },
            { "question": "9 × 6 = ?", "options": ["45", "54", "63", "56"], "answer": 1 },
            { "question": "63 ÷ 7 = ?", "options": ["8", "9", "7", "6"], "answer": 1 },
            { "question": "48 ÷ 6 = ?", "options": ["6", "8", "7", "9"], "answer": 1 },
            { "question": "12 × 4 = ?", "options": ["48", "44", "46", "52"], "answer": 0 },
            { "question": "15 × 3 = ?", "options": ["35", "45", "55", "40"], "answer": 1 },
            { "question": "40 ÷ 5 = ?", "options": ["7", "8", "9", "6"], "answer": 1 },
            { "question": "24 × 2 = ?", "options": ["48", "46", "44", "50"], "answer": 0 },
            { "question": "36 ÷ 4 = ?", "options": ["8", "9", "7", "10"], "answer": 1 },
            { "question": "14 × 5 = ?", "options": ["60", "70", "80", "65"], "answer": 1 },
            { "question": "72 ÷ 8 = ?", "options": ["8", "9", "7", "6"], "answer": 1 },
            { "question": "13 × 3 = ?", "options": ["36", "39", "42", "33"], "answer": 1 },
            { "question": "54 ÷ 6 = ?", "options": ["8", "9", "7", "10"], "answer": 1 },
            { "question": "16 × 5 = ?", "options": ["70", "80", "90", "75"], "answer": 1 },
            { "question": "32 ÷ 8 = ?", "options": ["3", "4", "5", "6"], "answer": 1 },
            { "question": "18 × 4 = ?", "options": ["68", "72", "76", "64"], "answer": 1 },
            { "question": "45 ÷ 9 = ?", "options": ["4", "5", "6", "7"], "answer": 1 },
            { "question": "22 × 3 = ?", "options": ["66", "64", "62", "68"], "answer": 0 },
            { "question": "56 ÷ 7 = ?", "options": ["7", "8", "9", "6"], "answer": 1 },
            { "question": "25 × 3 = ?", "options": ["70", "75", "80", "65"], "answer": 1 }
        ]
    },
    {
        "stage": 2,
        "bossName": "朱佩玲",
        "bossGender": "female",
        "avatarUrl": "assets/boss_peiling.png",
        "dialogue": "我是朱佩玲，看你能不能算對我的進階乘除法！",
        "questions": [
            { "question": "125 × 4 = ?", "options": ["450", "500", "550", "600"], "answer": 1 },
            { "question": "85 ÷ 6 = ?", "options": ["14 餘 1", "14 餘 2", "14 餘 3", "14 餘 0"], "answer": 0 },
            { "question": "45 × 12 = ?", "options": ["520", "540", "560", "500"], "answer": 1 },
            { "question": "98 ÷ 7 = ?", "options": ["12", "14", "13", "15"], "answer": 1 },
            { "question": "240 × 3 = ?", "options": ["680", "720", "760", "700"], "answer": 1 },
            { "question": "76 ÷ 5 = ?", "options": ["15 餘 1", "15 餘 2", "15 餘 3", "15 餘 0"], "answer": 0 },
            { "question": "16 × 15 = ?", "options": ["230", "240", "250", "220"], "answer": 1 },
            { "question": "112 ÷ 4 = ?", "options": ["26", "28", "30", "24"], "answer": 1 },
            { "question": "32 × 11 = ?", "options": ["342", "352", "362", "332"], "answer": 1 },
            { "question": "135 ÷ 9 = ?", "options": ["14", "15", "16", "13"], "answer": 1 },
            { "question": "105 × 6 = ?", "options": ["610", "630", "650", "620"], "answer": 1 },
            { "question": "92 ÷ 8 = ?", "options": ["11 餘 4", "11 餘 2", "11 餘 3", "11 餘 0"], "answer": 0 },
            { "question": "25 × 16 = ?", "options": ["380", "400", "420", "350"], "answer": 1 },
            { "question": "168 ÷ 6 = ?", "options": ["26", "28", "30", "24"], "answer": 1 },
            { "question": "35 × 12 = ?", "options": ["400", "420", "440", "380"], "answer": 1 },
            { "question": "147 ÷ 7 = ?", "options": ["20", "21", "22", "19"], "answer": 1 },
            { "question": "18 × 25 = ?", "options": ["430", "450", "470", "400"], "answer": 1 },
            { "question": "196 ÷ 4 = ?", "options": ["47", "49", "51", "45"], "answer": 1 },
            { "question": "23 × 15 = ?", "options": ["325", "345", "365", "335"], "answer": 1 },
            { "question": "252 ÷ 9 = ?", "options": ["26", "28", "30", "24"], "answer": 1 }
        ]
    },
    {
        "stage": 3,
        "bossName": "朱雁玲",
        "bossGender": "female",
        "avatarUrl": "assets/boss_yanling.png",
        "dialogue": "我是朱雁玲！因數與倍數你真的搞懂了嗎？",
        "questions": [
            { "question": "36的因數有幾個？", "options": ["8個", "9個", "10個", "6個"], "answer": 1 },
            { "question": "12與18的最大公因數是？", "options": ["3", "6", "9", "4"], "answer": 1 },
            { "question": "6與8的最小公倍數是？", "options": ["18", "24", "32", "16"], "answer": 1 },
            { "question": "2/3 等於下列哪一個分數？", "options": ["4/9", "6/9", "5/9", "8/9"], "answer": 1 },
            { "question": "0.6 換成分數是？", "options": ["3/5", "2/5", "1/5", "4/5"], "answer": 0 },
            { "question": "4/5 換成小數是？", "options": ["0.75", "0.8", "0.85", "0.6"], "answer": 1 },
            { "question": "15與25的公因數除了1還有？", "options": ["3", "5", "15", "10"], "answer": 1 },
            { "question": "42的因數中，最大的是？", "options": ["21", "42", "14", "7"], "answer": 1 },
            { "question": "3/4 + 1/8 = ?", "options": ["5/8", "7/8", "6/8", "9/8"], "answer": 1 },
            { "question": "1 - 3/10 = ?", "options": ["6/10", "7/10", "8/10", "5/10"], "answer": 1 },
            { "question": "0.25 換成分數是？", "options": ["1/5", "1/4", "1/3", "1/6"], "answer": 1 },
            { "question": "15的因數有幾個？", "options": ["3個", "4個", "5個", "6個"], "answer": 1 },
            { "question": "8與12的公倍數中，小於50的有？", "options": ["24", "24與48", "48", "36"], "answer": 1 },
            { "question": "5/6 - 1/3 = ?", "options": ["1/3", "1/2", "2/3", "1/6"], "answer": 1 },
            { "question": "1.2 換成最簡分數是？", "options": ["6/5", "5/4", "7/5", "8/5"], "answer": 0 },
            { "question": "18的因數不包含？", "options": ["4", "6", "9", "3"], "answer": 0 },
            { "question": "4與10的最小公倍數是？", "options": ["12", "20", "40", "30"], "answer": 1 },
            { "question": "7/10 等於下列哪一個小數？", "options": ["0.07", "0.7", "0.77", "0.007"], "answer": 1 },
            { "question": "24與36的最大公因數是？", "options": ["6", "12", "18", "8"], "answer": 1 },
            { "question": "3/5 + 0.2 = ?", "options": ["0.7", "0.8", "0.9", "0.6"], "answer": 1 }
        ]
    },
    {
        "stage": 4,
        "bossName": "溫化有",
        "bossGender": "female",
        "avatarUrl": "assets/boss_wenhuayou.png",
        "dialogue": "我是溫化有。想挑戰我，先算對分數的乘除與體積！",
        "questions": [
            { "question": "3/4 × 8 = ?", "options": ["5", "6", "7", "4"], "answer": 1 },
            { "question": "一個長10公分、寬5公分、高4公分的長方體體積是？", "options": ["180立方公分", "200立方公分", "220立方公分", "150立方公分"], "answer": 1 },
            { "question": "6/7 ÷ 3 = ?", "options": ["1/7", "2/7", "3/7", "4/7"], "answer": 1 },
            { "question": "2.5 × 0.4 = ?", "options": ["0.1", "1", "10", "0.01"], "answer": 1 },
            { "question": "1/2 × 2/3 = ?", "options": ["1/4", "1/3", "1/2", "1/6"], "answer": 1 },
            { "question": "正方體每邊長5公分，體積是？", "options": ["100立方公分", "125立方公分", "150立方公分", "75立方公分"], "answer": 1 },
            { "question": "4/5 × 10/12 = ?", "options": ["1/3", "2/3", "3/4", "1/2"], "answer": 1 },
            { "question": "2.4 ÷ 0.6 = ?", "options": ["0.4", "4", "40", "0.04"], "answer": 1 },
            { "question": "小明有120元，花了其中的 2/3，花了多少元？", "options": ["60元", "80元", "90元", "100元"], "answer": 1 },
            { "question": "1/2 ÷ 1/4 = ?", "options": ["1", "2", "4", "1/2"], "answer": 1 },
            { "question": "0.15 × 0.6 = ?", "options": ["0.09", "0.9", "0.009", "0.095"], "answer": 0 },
            { "question": "體積 300 立方公分的長方體，底面積 60 平方公分，高是？", "options": ["4公分", "5公分", "6公分", "8公分"], "answer": 1 },
            { "question": "3/5 ÷ 4/5 = ?", "options": ["3/4", "4/5", "3/5", "1/2"], "answer": 0 },
            { "question": "2.25 × 2 = ?", "options": ["4.25", "4.5", "4.75", "5.0"], "answer": 1 },
            { "question": "1公升等於多少毫升（立方公分）？", "options": ["100", "1000", "10000", "10"], "answer": 1 },
            { "question": "4/9 × 3 = ?", "options": ["1/3", "4/3", "2/3", "4/9"], "answer": 1 },
            { "question": "1.5 ÷ 0.3 = ?", "options": ["0.5", "5", "50", "0.05"], "answer": 1 },
            { "question": "3/8 ÷ 3/4 = ?", "options": ["1/4", "1/2", "2/3", "3/8"], "answer": 1 },
            { "question": "底面積 15 平方公尺、高 4 公尺的長方體體積是？", "options": ["45立方公尺", "60立方公尺", "75立方公尺", "30立方公尺"], "answer": 1 },
            { "question": "3.5 × 1.2 = ?", "options": ["4.0", "4.2", "4.4", "4.5"], "answer": 1 }
        ]
    },
    {
        "stage": 5,
        "bossName": "朱振興",
        "bossGender": "male",
        "avatarUrl": "assets/boss_zhenxing.png",
        "dialogue": "我是朱振興。這裡是終極之戰！看招，國小六年級的速率與幾何！",
        "questions": [
            { "question": "81的質因數分解為下列何者？", "options": ["9×9", "3×3×3×3", "3×27", "81"], "answer": 1 },
            { "question": "半徑 10 公分的圓面積大約是多少？（圓周率以 3.14 計算）", "options": ["62.8平方公分", "314平方公分", "31.4平方公分", "628平方公分"], "answer": 1 },
            { "question": "小強跑 100 公尺花了 20 秒，他的平均速率是？", "options": ["4 公尺/秒", "5 公尺/秒", "6 公尺/秒", "10 公尺/秒"], "answer": 1 },
            { "question": "兩數的比是 3:5，若前項為 12，則後項為？", "options": ["15", "20", "25", "18"], "answer": 1 },
            { "question": "24的質因數分解是？", "options": ["2×2×2×3", "2×3×4", "3×8", "2×12"], "answer": 0 },
            { "question": "直徑 20 公分的圓周長大約是？（圓周率 3.14）", "options": ["31.4公分", "62.8公分", "125.6公分", "6.28公分"], "answer": 1 },
            { "question": "時速 72 公里等於秒速多少公尺？", "options": ["15公尺/秒", "20公尺/秒", "25公尺/秒", "30公尺/秒"], "answer": 1 },
            { "question": "比值 0.75 寫成最簡整數比是？", "options": ["3:4", "4:3", "3:5", "6:8"], "answer": 0 },
            { "question": "30與45的最大公因數是？", "options": ["5", "15", "30", "10"], "answer": 1 },
            { "question": "半徑 5 公分的圓，其周長約是？（圓周率 3.14）", "options": ["15.7公分", "31.4公分", "62.8公分", "3.14公分"], "answer": 1 },
            { "question": "火車以秒速 30 公尺行駛 5 分鐘，行駛了多少公尺？", "options": ["150公尺", "9000公尺", "1500公尺", "6000公尺"], "answer": 1 },
            { "question": "15:20 的比值是？", "options": ["3/4", "4/3", "3/5", "1/2"], "answer": 0 },
            { "question": "下列哪一個數是質數？", "options": ["27", "29", "33", "35"], "answer": 1 },
            { "question": "圓周率大約是？", "options": ["3.1415", "3.14", "3.1416", "3.1"], "answer": 1 },
            { "question": "秒速 15 公尺換算成時速是？", "options": ["36公里/小時", "54公里/小時", "72公里/小時", "45公里/小時"], "answer": 1 },
            { "question": "一包糖重 3/4 公斤，平分成 3 袋，每袋重多少公斤？", "options": ["1/3公斤", "1/4公斤", "1/2公斤", "3/8公斤"], "answer": 1 },
            { "question": "大圓半徑是小圓半徑的 3 倍，大圓面積是小圓面積的幾倍？", "options": ["3倍", "9倍", "6倍", "27倍"], "answer": 1 },
            { "question": "若甲數:乙數 = 4:7，乙數是 21，甲數是？", "options": ["8", "12", "16", "14"], "answer": 1 },
            { "question": "速率的計算公式是？", "options": ["時間÷距離", "距離÷時間", "距離×時間", "距離+時間"], "answer": 1 },
            { "question": "50的質因數分解是？", "options": ["2×5×5", "2×25", "5×10", "1×50"], "answer": 0 }
        ]
    }
];

// Game State Variables
let stages = [];
let activeQuestions = [];
let currentStageIndex = 0;
let currentQuestionIndex = 0;
let playerHP = 100;
let bossHP = 100;
let maxPlayerHP = 100;
let maxBossHP = 100;
let comboCount = 0;
let isAnsweringBlocked = false;

// Statistics
let correctAnswersCount = 0;
let totalAnswersCount = 0;

// Timer Config
let timerInterval = null;
let timeLeft = 15;
const questionDuration = 15; // seconds

// DOM Element References
const screenIntro = document.getElementById('screen-intro');
const screenBattle = document.getElementById('screen-battle');

const btnStartGame = document.getElementById('btn-start-game');
const btnQuitBattle = document.getElementById('btn-quit-battle');

// Sync elements
const syncGroupCodeInput = document.getElementById('sync-group-code');
const btnSyncGroup = document.getElementById('btn-sync-group');
const syncStatusEl = document.getElementById('sync-status');

// Battle Screen Stats
const stageNumberEl = document.getElementById('stage-number');
const timerBarFill = document.getElementById('timer-bar-fill');
const timerText = document.getElementById('timer-text');

const playerHpText = document.getElementById('player-hp-text');
const playerHpBar = document.getElementById('player-hp-bar');
const comboCountEl = document.getElementById('combo-count');
const comboDots = document.getElementById('combo-dots').children;

const bossAvatar = document.getElementById('boss-avatar');
const bossDamageOverlay = document.getElementById('boss-damage-overlay');
const bossNameEl = document.getElementById('boss-name');
const bossHpText = document.getElementById('boss-hp-text');
const bossHpBar = document.getElementById('boss-hp-bar');
const bossDialogue = document.getElementById('boss-dialogue');
const bossDialogueBubble = document.getElementById('boss-dialogue-bubble');
const bossCard = document.getElementById('boss-card');

const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const logsBody = document.getElementById('logs-body');
const effectLayer = document.getElementById('effect-layer');
const questionProgressEl = document.getElementById('question-progress');
const goalProgressEl = document.getElementById('goal-progress');

// Profile State
let profiles = [];
let activeProfileId = null;

// Profile DOM References
const profilesGrid = document.getElementById('profiles-grid');
const profileFormContainer = document.getElementById('profile-form-container');
const profileNameInput = document.getElementById('profile-name');
const profileOrderSelect = document.getElementById('profile-order');
const btnSubmitProfile = document.getElementById('btn-submit-profile');
const btnCancelProfile = document.getElementById('btn-cancel-profile');

// Modals

const modalVictory = document.getElementById('modal-victory');
const victoryMessage = document.getElementById('victory-message');
const statCorrect = document.getElementById('stat-correct');
const statTotal = document.getElementById('stat-total');
const statHp = document.getElementById('stat-hp');
const btnNextStage = document.getElementById('btn-next-stage');
const btnVictoryHome = document.getElementById('btn-victory-home');

const modalDefeat = document.getElementById('modal-defeat');
const defeatMessage = document.getElementById('defeat-message');
const statDefeatProgress = document.getElementById('stat-defeat-progress');
const btnRetry = document.getElementById('btn-retry');
const btnDefeatHome = document.getElementById('btn-defeat-home');

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

function init() {
    // Load stages from default configuration
    stages = [...DEFAULT_STAGES];



    // Event Listeners
    btnStartGame.addEventListener('click', () => {
        const activeProfile = profiles.find(p => p.id === activeProfileId);
        if (activeProfile) {
            const targetStage = Math.min(activeProfile.unlockedStageIndex, stages.length - 1);
            startBattle(targetStage);
        }
    });

    // Profile Actions
    btnSubmitProfile.addEventListener('click', createProfile);
    btnCancelProfile.addEventListener('click', () => toggleProfileForm(false));

    // Load Group Code from LocalStorage if present
    const savedGroupCode = localStorage.getItem('math_boss_group_code');
    if (savedGroupCode && syncGroupCodeInput) {
        syncGroupCodeInput.value = savedGroupCode;
    }

    // Sync button event listener
    if (btnSyncGroup) {
        btnSyncGroup.addEventListener('click', handleGroupSync);
    }

    // Load initial profiles
    loadProfiles();
    


    // Game Actions
    btnQuitBattle.addEventListener('click', quitToHome);
    
    // Modal buttons
    btnVictoryHome.addEventListener('click', quitToHome);
    btnDefeatHome.addEventListener('click', quitToHome);
    
    btnNextStage.addEventListener('click', () => {
        closeModal(modalVictory);
        if (currentStageIndex + 1 < stages.length) {
            startBattle(currentStageIndex + 1);
        } else {
            quitToHome();
        }
    });

    btnRetry.addEventListener('click', () => {
        closeModal(modalDefeat);
        startBattle(currentStageIndex);
    });


}

/* ==========================================================================
   GAME PLAY LOOP
   ========================================================================== */

function startBattle(stageIdx) {
    if (!stages || stages.length === 0) {
        alert('請先載入有效的關卡配置！');
        return;
    }

    currentStageIndex = stageIdx;
    currentQuestionIndex = 0;
    playerHP = 100;
    comboCount = 0;
    isAnsweringBlocked = false;

    correctAnswersCount = 0;
    totalAnswersCount = 0;

    // Reset UI displays
    resetComboDots();
    clearLogs();

    // Transition Screens
    screenIntro.classList.remove('active');
    screenBattle.classList.add('active');

    // Load Stage Data
    const stage = stages[currentStageIndex];
    stageNumberEl.textContent = String(stage.stage).padStart(2, '0');
    bossNameEl.textContent = stage.bossName;
    bossAvatar.src = stage.avatarUrl || 'assets/boss_mengling.png';
    bossDialogue.textContent = stage.dialogue || '受死吧，數學挑戰者！';
    
    // Set health values
    maxPlayerHP = 100;
    playerHP = maxPlayerHP;
    
    // Boss HP is 100 units.
    maxBossHP = 100;
    bossHP = maxBossHP;

    // Randomly select 10 questions from the 20-question pool
    if (!stage.questions || !Array.isArray(stage.questions) || stage.questions.length < 10) {
        addLog('⚠️ 此關卡題目配置不足，無法開始戰鬥！', 'system');
        alert('此關卡題目配置不足（少於 10 題），無法開始戰鬥！');
        quitToHome();
        return;
    }
    activeQuestions = shuffleArray(stage.questions).slice(0, 10);

    updateHpBars();
    updateProgressBadges();

    addLog(`🚩 挑戰開始：STAGE ${stage.stage} - 迎戰魔王【${stage.bossName}】！`, 'system');

    // Load first question
    loadQuestion();
}

function loadQuestion() {
    isAnsweringBlocked = false;
    const originalQuestion = activeQuestions[currentQuestionIndex];

    // Check if stage has questions
    if (!originalQuestion) {
        addLog('此關卡沒有題目配置。', 'system');
        return;
    }

    // Capture correct answer value
    const correctValue = originalQuestion.options[originalQuestion.answer];

    // Create a shuffled copy of options
    const shuffledOptions = shuffleArray(originalQuestion.options);

    // Find the new correct answer index
    const newAnswerIndex = shuffledOptions.indexOf(correctValue);

    // Create a temporary questionData object for this battle session
    const questionData = {
        question: originalQuestion.question,
        options: shuffledOptions,
        answer: newAnswerIndex
    };

    // Store this in activeQuestions so other functions can read the updated answer index
    activeQuestions[currentQuestionIndex] = questionData;

    updateProgressBadges();

    // Set UI elements
    questionText.textContent = questionData.question;
    
    // Clear and build options grid
    optionsGrid.innerHTML = '';
    questionData.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-option glass';
        btn.textContent = optText;
        btn.dataset.index = idx;
        btn.addEventListener('click', (e) => handleAnswerClick(idx, btn));
        optionsGrid.appendChild(btn);
    });

    // Start Timer
    startTimer();
}

/* ==========================================================================
   TIMER MANAGEMENT
   ========================================================================== */

function startTimer() {
    stopTimer();
    timeLeft = questionDuration;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            timeLeft = 0;
            updateTimerUI();
            stopTimer();
            handleTimeout();
        } else {
            updateTimerUI();
        }
    }, 100);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerUI() {
    const percentage = (timeLeft / questionDuration) * 100;
    timerBarFill.style.width = `${percentage}%`;
    timerText.textContent = `${Math.ceil(timeLeft)}s`;

    // Warn if time is low
    if (timeLeft <= 4) {
        timerBarFill.style.background = 'var(--danger)';
        timerBarFill.style.boxShadow = '0 0 8px rgba(255, 0, 85, 0.6)';
    } else {
        timerBarFill.style.background = 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))';
        timerBarFill.style.boxShadow = '0 0 8px var(--neon-cyan-glow)';
    }
}

/* ==========================================================================
   GAMEPLAY RULES & MATH INTERACTION
   ========================================================================== */

function handleAnswerClick(selectedIdx, btnElement) {
    if (isAnsweringBlocked) return;
    isAnsweringBlocked = true;
    stopTimer();

    const questionData = activeQuestions[currentQuestionIndex];
    const correctIdx = questionData.answer;
    
    totalAnswersCount++;

    // Lock option buttons visually
    const allButtons = optionsGrid.querySelectorAll('.btn-option');
    allButtons.forEach(btn => btn.style.cursor = 'default');

    if (selectedIdx === correctIdx) {
        // Correct answer!
        correctAnswersCount++;
        btnElement.classList.add('correct');
        handleCorrectAnswer();
    } else {
        // Wrong answer
        btnElement.classList.add('incorrect');
        // Show correct answer too
        allButtons[correctIdx].classList.add('correct');
        handleIncorrectAnswer(false);
    }

    // Wait 1.3 seconds before advancing or resolving game status
    setTimeout(() => {
        checkBattleResolution();
    }, 1300);
}

function handleTimeout() {
    if (isAnsweringBlocked) return;
    isAnsweringBlocked = true;
    
    totalAnswersCount++;

    // Disable grid options
    const allButtons = optionsGrid.querySelectorAll('.btn-option');
    allButtons.forEach(btn => {
        btn.style.cursor = 'default';
        btn.classList.add('incorrect');
    });

    const questionData = activeQuestions[currentQuestionIndex];
    allButtons[questionData.answer].classList.add('correct');

    addLog('⏰ 時間到！你未能及時回答！', 'system');
    handleIncorrectAnswer(true);

    setTimeout(() => {
        checkBattleResolution();
    }, 1300);
}

function handleCorrectAnswer() {
    const stage = stages[currentStageIndex];
    const totalQuestions = activeQuestions.length;
    
    // Combo Increment
    comboCount++;
    if (comboCount > 3) comboCount = 3;
    updateComboUI();

    // Damage calculated proportionally
    let dmgToBoss = Math.ceil(maxBossHP / totalQuestions);
    
    // Combo multiplier bonus
    let isComboBonus = false;
    if (comboCount === 3) {
        dmgToBoss = Math.ceil(dmgToBoss * 1.5);
        isComboBonus = true;
        comboCount = 0; // reset combo
        resetComboDots();
        // Heal player a little bit on max combo
        playerHP = Math.min(maxPlayerHP, playerHP + 10);
        addLog('🌟 COMBO MAX! 額外造成 1.5 倍傷害並回復 10 HP！', 'success');
    }

    bossHP = Math.max(0, bossHP - dmgToBoss);
    updateHpBars();

    // Visual Effects
    triggerScreenShake(bossCard);
    triggerDamageFlash(bossDamageOverlay);
    spawnDmgNumber(dmgToBoss, false);

    addLog(`💥 答對了！對 ${stage.bossName} 造成 ${dmgToBoss} 點傷害！`, 'player-hit');
}

function handleIncorrectAnswer(isTimeout) {
    comboCount = 0;
    updateComboUI();

    // Damage to player
    const dmgToPlayer = 20;
    playerHP = Math.max(0, playerHP - dmgToPlayer);
    updateHpBars();

    // Visual Effects
    const playerSideEl = document.querySelector('.player-side');
    triggerScreenShake(playerSideEl);
    spawnDmgNumber(dmgToPlayer, true);

    if (!isTimeout) {
        addLog(`❌ 答錯了！受到 ${dmgToPlayer} 點反擊傷害！`, 'boss-hit');
    } else {
        addLog(`💥 受到 ${dmgToPlayer} 點逾時懲罰傷害！`, 'boss-hit');
    }
}

/* ==========================================================================
   BATTLE RESOLUTION & STAGE PROGRESSION
   ========================================================================== */

function checkBattleResolution() {
    if (playerHP <= 0) {
        // Defeat
        showDefeatModal();
    } else {
        // Progress to next question
        currentQuestionIndex++;
        
        if (currentQuestionIndex < activeQuestions.length) {
            loadQuestion();
        } else {
            // End of questions, enforce 8/10 correct answers rule!
            if (correctAnswersCount >= 8) {
                // Defeat the boss completely
                bossHP = 0;
                updateHpBars();
                triggerScreenShake(bossCard);
                triggerDamageFlash(bossDamageOverlay);
                spawnDmgNumber(100, false);
                showVictoryModal();
            } else {
                addLog(`⚠️ 答題結束。答對題數為 ${correctAnswersCount} 題，未達 8 題目標！`, 'boss-hit');
                showDefeatModal();
            }
        }
    }
}

function showVictoryModal() {
    stopTimer();
    addLog(`🏆 擊敗魔王！STAGE ${stages[currentStageIndex].stage} 通關！`, 'success');
    
    // Stats calculation
    statCorrect.textContent = correctAnswersCount;
    statTotal.textContent = totalAnswersCount;
    statHp.textContent = `${playerHP}/${maxPlayerHP}`;

    // Save active player progress
    saveActiveProfileProgress(true);

    // Adjust "Next Stage" button
    if (currentStageIndex + 1 < stages.length) {
        btnNextStage.textContent = '下一關';
    } else {
        btnNextStage.textContent = '回首頁';
    }
    btnNextStage.style.display = 'block';

    victoryMessage.textContent = `恭喜！您答對了 ${correctAnswersCount} 題（已達 8 題通關門檻），擊敗了魔王【${stages[currentStageIndex].bossName}】！`;
    openModal(modalVictory);
}

function showDefeatModal() {
    stopTimer();
    addLog(`💀 戰敗！挑戰失敗。`, 'boss-hit');

    // Progress percentage
    const progress = Math.round(((maxBossHP - bossHP) / maxBossHP) * 100);
    statDefeatProgress.textContent = `${progress}%`;
    
    if (playerHP <= 0) {
        defeatMessage.textContent = `魔王【${stages[currentStageIndex].bossName}】將你擊倒。您需要答對 8 題以上才能通關。請再次挑戰！`;
    } else {
        defeatMessage.textContent = `答題結束，您只答對了 ${correctAnswersCount} 題，未達 8 題通關門檻。請再次挑戰！`;
    }
    openModal(modalDefeat);
}

function quitToHome() {
    stopTimer();
    closeModal(modalVictory);
    closeModal(modalDefeat);
    screenBattle.classList.remove('active');
    screenIntro.classList.add('active');
}

/* ==========================================================================
   UI UTILITY FUNCTIONS & EFFECTS
   ========================================================================== */

function updateHpBars() {
    playerHpText.textContent = `${playerHP}/${maxPlayerHP}`;
    const playerPct = (playerHP / maxPlayerHP) * 100;
    playerHpBar.style.width = `${playerPct}%`;

    // Low HP Warn
    if (playerPct <= 30) {
        playerHpBar.style.background = 'var(--danger)';
    } else {
        playerHpBar.style.background = 'linear-gradient(90deg, #00d2ff, var(--neon-cyan))';
    }

    bossHpText.textContent = `${bossHP}/${maxBossHP}`;
    const bossPct = (bossHP / maxBossHP) * 100;
    bossHpBar.style.width = `${bossPct}%`;
}

function updateComboUI() {
    comboCountEl.textContent = comboCount;
    resetComboDots();
    for (let i = 0; i < comboCount; i++) {
        if (comboDots[i]) {
            comboDots[i].classList.add('active');
        }
    }
}

function updateProgressBadges() {
    if (questionProgressEl) {
        const displayIndex = Math.min(currentQuestionIndex + 1, activeQuestions.length);
        questionProgressEl.textContent = `${displayIndex}/${activeQuestions.length}`;
    }
    
    if (goalProgressEl) {
        goalProgressEl.textContent = `${correctAnswersCount}/8`;
    }
}

function resetComboDots() {
    for (let i = 0; i < comboDots.length; i++) {
        comboDots[i].classList.remove('active');
    }
}

// Spawns float damage text above character cards
function spawnDmgNumber(amount, isPlayerTarget) {
    const num = document.createElement('div');
    num.className = `dmg-number ${isPlayerTarget ? 'player-dmg' : 'boss-dmg'}`;
    num.textContent = `-${amount} HP`;

    // Randomize positioning offset slightly to prevent stacking
    const offsetX = Math.floor(Math.random() * 40) - 20;
    const offsetY = Math.floor(Math.random() * 30) - 15;

    // Get coordinates from target sides
    const targetCard = isPlayerTarget ? document.querySelector('.player-side') : bossCard;
    const rect = targetCard.getBoundingClientRect();

    num.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
    num.style.top = `${rect.top + rect.height / 3 + offsetY}px`;

    effectLayer.appendChild(num);

    // Remove element after animation completes
    setTimeout(() => {
        num.remove();
    }, 1000);
}

// Battle Log appending
function addLog(text, type) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = text;
    logsBody.appendChild(entry);
    logsBody.scrollTop = logsBody.scrollHeight;
}

function clearLogs() {
    logsBody.innerHTML = '';
}

// Visual animations classes trigger
function triggerScreenShake(element) {
    element.classList.add('shake-ani');
    setTimeout(() => {
        element.classList.remove('shake-ani');
    }, 350);
}

function triggerDamageFlash(overlayElement) {
    overlayElement.classList.add('active');
    setTimeout(() => {
        overlayElement.classList.remove('active');
    }, 200);
}

/* ==========================================================================
   MODAL UTILITIES
   ========================================================================== */

function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}



/* ==========================================================================
   USER PROFILE MANAGEMENT
   ========================================================================== */

function loadProfiles() {
    const groupCode = syncGroupCodeInput ? syncGroupCodeInput.value.trim() : localStorage.getItem('math_boss_group_code');
    
    if (isFirebaseActive && groupCode) {
        if (syncStatusEl) {
            syncStatusEl.textContent = "正在同步雲端資料...";
            syncStatusEl.classList.remove('error');
        }
        
        db.collection('groups').doc(groupCode).collection('profiles').get()
            .then(querySnapshot => {
                const fetched = [];
                querySnapshot.forEach(doc => {
                    fetched.push(doc.data());
                });
                profiles = fetched;
                
                // Cache to LocalStorage
                localStorage.setItem('math_boss_profiles', JSON.stringify(profiles));
                
                // Restore active selection
                const savedActive = localStorage.getItem('math_boss_active_profile_id');
                if (savedActive && profiles.some(p => p.id === savedActive)) {
                    activeProfileId = savedActive;
                } else {
                    activeProfileId = null;
                }
                
                renderProfiles();
                updateStartButtonState();
                if (syncStatusEl) {
                    syncStatusEl.textContent = "✅ 已成功與雲端同步！";
                    syncStatusEl.classList.remove('error');
                }
            })
            .catch(error => {
                console.error("Firestore read failed, falling back to LocalStorage:", error);
                loadProfilesFromLocal();
                if (syncStatusEl) {
                    syncStatusEl.textContent = "⚠️ 雲端讀取失敗，改用本機快取。";
                    syncStatusEl.classList.add('error');
                }
            });
    } else {
        loadProfilesFromLocal();
        if (syncStatusEl) {
            syncStatusEl.textContent = "";
        }
    }
}

function loadProfilesFromLocal() {
    const saved = localStorage.getItem('math_boss_profiles');
    if (saved) {
        try {
            profiles = JSON.parse(saved);
        } catch (e) {
            profiles = [];
        }
    } else {
        profiles = [];
    }
    
    // Read active profile selection if any
    const savedActive = localStorage.getItem('math_boss_active_profile_id');
    if (savedActive && profiles.some(p => p.id === savedActive)) {
        activeProfileId = savedActive;
    } else {
        activeProfileId = null;
    }

    renderProfiles();
    updateStartButtonState();
}

function handleGroupSync() {
    if (!syncGroupCodeInput) return;
    const groupCode = syncGroupCodeInput.value.trim();
    
    if (!groupCode) {
        localStorage.removeItem('math_boss_group_code');
        if (syncStatusEl) {
            syncStatusEl.textContent = "❌ 已改用本機單機模式。";
            syncStatusEl.classList.remove('error');
        }
        loadProfiles();
        return;
    }
    
    if (!isFirebaseActive) {
        alert("尚未在 app.js 中配置 Firebase 金鑰。已將您的代碼暫存在本機，並繼續使用本機儲存。");
        localStorage.setItem('math_boss_group_code', groupCode);
        if (syncStatusEl) {
            syncStatusEl.textContent = "⚠️ 尚未設定雲端金鑰，暫以單機執行。";
            syncStatusEl.classList.add('error');
        }
        loadProfiles();
        return;
    }
    
    localStorage.setItem('math_boss_group_code', groupCode);
    loadProfiles();
}

function renderProfiles() {
    if (!profilesGrid) return;
    profilesGrid.innerHTML = '';

    // Render each profile card
    profiles.forEach(p => {
        const card = document.createElement('div');
        card.className = `profile-card glass ${p.id === activeProfileId ? 'selected' : ''}`;
        card.addEventListener('click', () => selectProfile(p.id));

        // Determine avatar emoji based on birth order / order
        let emoji = '👦';
        if (p.order === '老大') emoji = '👑';
        else if (p.order === '老二') emoji = '🥈';
        else if (p.order === '老三') emoji = '🥉';
        else if (p.order === '阿公') emoji = '👴';
        else if (p.order === '阿婆') emoji = '👵';

        const displayStage = p.unlockedStageIndex + 1;

        card.innerHTML = `
            <div class="profile-avatar-icon">${emoji}</div>
            <div class="profile-card-name">${escapeHTML(p.name)}</div>
            <div class="profile-card-order">${escapeHTML(p.order)}</div>
            <div class="profile-card-progress">目前關卡: 第 ${displayStage} 關</div>
        `;
        profilesGrid.appendChild(card);
    });

    // Render "Add Card" button
    const addCard = document.createElement('div');
    addCard.className = 'profile-card add-card';
    addCard.innerHTML = `
        <div class="plus-icon">+</div>
        <div class="profile-card-progress">登記新勇者</div>
    `;
    addCard.addEventListener('click', () => toggleProfileForm(true));
    profilesGrid.appendChild(addCard);
}

function selectProfile(pId) {
    activeProfileId = pId;
    localStorage.setItem('math_boss_active_profile_id', pId);
    
    // Re-render profiles to update selections
    renderProfiles();
    updateStartButtonState();
}

function updateStartButtonState() {
    if (activeProfileId) {
        const activeProfile = profiles.find(p => p.id === activeProfileId);
        const stageNum = activeProfile.unlockedStageIndex + 1;
        btnStartGame.disabled = false;
        btnStartGame.textContent = `開始戰鬥 (進度: 第 ${stageNum} 關)`;
    } else {
        btnStartGame.disabled = true;
        btnStartGame.textContent = `請先選擇勇者角色`;
    }
}

function toggleProfileForm(show) {
    if (show) {
        profileFormContainer.classList.remove('hidden');
        profileNameInput.value = '';
        profileNameInput.focus();
    } else {
        profileFormContainer.classList.add('hidden');
        profileNameInput.value = '';
    }
}

function createProfile() {
    const name = profileNameInput.value.trim();
    const order = profileOrderSelect.value;

    if (!name) {
        alert('請輸入勇者姓名！');
        return;
    }

    const newProfile = {
        id: Date.now().toString(),
        name: name,
        order: order,
        unlockedStageIndex: 0,
        history: []
    };

    profiles.push(newProfile);
    localStorage.setItem('math_boss_profiles', JSON.stringify(profiles));
    
    // Automatically select the newly created profile
    activeProfileId = newProfile.id;
    localStorage.setItem('math_boss_active_profile_id', newProfile.id);

    // Save to Firestore if active
    const groupCode = syncGroupCodeInput ? syncGroupCodeInput.value.trim() : localStorage.getItem('math_boss_group_code');
    if (isFirebaseActive && groupCode) {
        db.collection('groups').doc(groupCode).collection('profiles').doc(newProfile.id).set(newProfile)
            .then(() => {
                console.log("Profile successfully created in Firestore");
            })
            .catch(err => {
                console.error("Firestore write failed:", err);
            });
    }

    toggleProfileForm(false);
    renderProfiles();
    updateStartButtonState();
}

function saveActiveProfileProgress(hasPassed) {
    if (!activeProfileId) return;
    const activeProfile = profiles.find(p => p.id === activeProfileId);
    if (!activeProfile) return;

    if (hasPassed) {
        // If the cleared stage is the current unlocked stage, unlock the next one!
        if (currentStageIndex === activeProfile.unlockedStageIndex) {
            activeProfile.unlockedStageIndex++;
        }
        
        // Add to history
        if (!activeProfile.history) activeProfile.history = [];
        activeProfile.history.push({
            stage: stages[currentStageIndex].stage,
            bossName: stages[currentStageIndex].bossName,
            correctCount: correctAnswersCount,
            totalCount: totalAnswersCount,
            date: new Date().toLocaleDateString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' })
        });

        // Save profiles locally
        localStorage.setItem('math_boss_profiles', JSON.stringify(profiles));
        renderProfiles();

        // Save to Firestore if active
        const groupCode = syncGroupCodeInput ? syncGroupCodeInput.value.trim() : localStorage.getItem('math_boss_group_code');
        if (isFirebaseActive && groupCode) {
            db.collection('groups').doc(groupCode).collection('profiles').doc(activeProfile.id).set(activeProfile)
                .then(() => {
                    console.log("Progress successfully updated in Firestore");
                })
                .catch(err => {
                    console.error("Firestore progress write failed:", err);
                });
        }
    }
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Run initializer
init();
