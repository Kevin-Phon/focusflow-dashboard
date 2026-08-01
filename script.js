/**
 * FocusFlow Dashboard - Functional Logic
 * Demonstrating: DOM Manipulation, Event Listeners, Timer Logic (setInterval),
 * LocalStorage for persistence, and basic State Management.
 */

// --- State Management ---
let state = {
    timeLeft: 25 * 60,
    timerId: null,
    isPaused: true,
    currentMode: 'Focus',
    tasks: JSON.parse(localStorage.getItem('focusflow-tasks')) || []
};

// --- DOM Elements ---
const minutesDisplay = document.getElementById('timer-minutes');
const secondsDisplay = document.getElementById('timer-seconds');
const startBtn = document.getElementById('timer-start');
const pauseBtn = document.getElementById('timer-pause');
const resetBtn = document.getElementById('timer-reset');
const modeBtns = document.querySelectorAll('.mode-btn');
const themeToggle = document.getElementById('theme-toggle');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const studyTipEl = document.getElementById('study-tip');

const studyTips = [
    "Take a 5-minute walk every hour to refresh your mind.",
    "Explain what you're learning to someone else to solidify knowledge.",
    "Keep your study space clean to reduce mental clutter.",
    "Review your notes within 24 hours of writing them.",
    "Drink water—dehydration can lead to fatigue and loss of focus."
];

// --- Initialization ---
function init() {
    updateTimerDisplay();
    renderTasks();
    setupEventListeners();
    
    // Set random study tip
    studyTipEl.textContent = studyTips[Math.floor(Math.random() * studyTips.length)];
    
    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    // Timer Controls
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Mode Switches
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            changeMode(btn.dataset.time, btn.textContent);
        });
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Task Form
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });
}

// --- Timer Functions ---
function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update browser tab title
    document.title = `${minutesDisplay.textContent}:${secondsDisplay.textContent} - FocusFlow`;
}

function startTimer() {
    if (!state.isPaused) return;
    
    state.isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    state.timerId = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        
        if (state.timeLeft <= 0) {
            clearInterval(state.timerId);
            handleTimerComplete();
        }
    }, 1000);
}

function pauseTimer() {
    state.isPaused = true;
    clearInterval(state.timerId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    pauseTimer();
    const activeModeBtn = document.querySelector('.mode-btn.active');
    state.timeLeft = parseInt(activeModeBtn.dataset.time) * 60;
    updateTimerDisplay();
}

function changeMode(minutes, modeName) {
    pauseTimer();
    state.currentMode = modeName;
    state.timeLeft = parseInt(minutes) * 60;
    updateTimerDisplay();
}

function handleTimerComplete() {
    alert(`${state.currentMode} session complete!`);
    resetTimer();
}

// --- Task Functions ---
function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    state.tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    state.tasks = state.tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    state.tasks = state.tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('focusflow-tasks', JSON.stringify(state.tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    
    if (state.tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks for now. Add one to get started!</li>';
        taskCount.textContent = '0';
        return;
    }

    state.tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task as complete">
            <span>${task.text}</span>
            <button class="delete-task" aria-label="Delete task">Delete</button>
        `;

        // Checkbox listener
        li.querySelector('input').addEventListener('change', () => toggleTask(task.id));
        
        // Delete button listener
        li.querySelector('.delete-task').addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });

    taskCount.textContent = state.tasks.length;
}

// --- Theme Function ---
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Run initialization
init();
