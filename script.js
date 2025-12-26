let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;
let isRunning = false;
let timerInterval;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

// Initialize: Start button active, Stop and Reset disabled
startBtn.disabled = false;
stopBtn.disabled = true;
resetBtn.disabled = true;

// Theme Toggle
const themeBtns = document.querySelectorAll('.theme-btn');
const html = document.documentElement;

// Load saved theme or default to 'day'
const savedTheme = localStorage.getItem('theme') || 'day';
html.setAttribute('data-theme', savedTheme);
updateThemeButtonStates();

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeButtonStates();
    });
});

function updateThemeButtonStates() {
    themeBtns.forEach(btn => {
        const theme = btn.getAttribute('data-theme');
        if (theme === html.getAttribute('data-theme')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function updateDisplay() {
    const hrsStr = String(hrs).padStart(2, '0');
    const minsStr = String(mins).padStart(2, '0');
    const secsStr = String(secs).padStart(2, '0');
    const msStr = String(ms).padStart(2, '0');
    display.textContent = `${hrsStr}:${minsStr}:${secsStr}:${msStr}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            ms++;
            if (ms === 100) {
                ms = 0;
                secs++;
            }
            if (secs === 60) {
                secs = 0;
                mins++;
            }
            if (mins === 60) {
                mins = 0;
                hrs++;
            }
            updateDisplay();
        }, 10);
    }
}

startBtn.onclick = function() {
    startTimer();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
}

stopBtn.onclick = function() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
}

resetBtn.onclick = function() {
    isRunning = false;
    ms = 0;
    clearInterval(timerInterval);
    hrs = 0;
    mins = 0;
    secs = 0;
    updateDisplay();
    
    // Reset to default state
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}