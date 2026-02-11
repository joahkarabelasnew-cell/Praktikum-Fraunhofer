// DOM Elements
const lengthSlider = document.getElementById('length');
const lengthDisplay = document.getElementById('lengthDisplay');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const digitsCheckbox = document.getElementById('digits');
const specialCheckbox = document.getElementById('special');
const generateBtn = document.getElementById('generateBtn');
const refreshBtn = document.getElementById('refreshBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const statLength = document.getElementById('statLength');
const statCombinations = document.getElementById('statCombinations');
const statUnique = document.getElementById('statUnique');

// Settings Elements
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsClose = document.getElementById('settingsClose');
const colorPicker = document.getElementById('colorPicker');
const colorPalette = document.getElementById('colorPalette');
const scalePicker = document.getElementById('scalePicker');
const scaleDisplay = document.getElementById('scaleDisplay');
const resetSettings = document.getElementById('resetSettings');
const youtubeBtn = document.getElementById('youtubeBtn');
const githubBtn = document.getElementById('githubBtn');

// Color Palette - 100 verschiedene Farben
const COLORS = [
    // Blaue Töne (20)
    '#0066cc', '#0052a3', '#003d7a', '#002851', '#0a3a8e',
    '#1e4fb0', '#2563d4', '#3b7def', '#5b9ef5', '#7ab8ff',
    '#0099ff', '#00ccff', '#00bfff', '#1aadff', '#4dbaff',
    '#0048b8', '#005ecf', '#0076e6', '#1a8cff', '#4da6ff',
    
    // Lila/Violett Töne (15)
    '#6b21a8', '#7e22ce', '#8b5cf6', '#a78bfa', '#c4b5fd',
    '#5b21b6', '#6d28d9', '#7c3aed', '#a855f7', '#d8b4fe',
    '#9333ea', '#b024d5', '#c026d3', '#d946ef', '#f0abfc',
    
    // Rot/Pink Töne (15)
    '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca',
    '#991b1b', '#b91c1c', '#ea580c', '#ff4444', '#ff6666',
    '#ec4899', '#f43f5e', '#fb7185', '#ff80ab', '#ffb3c1',
    
    // Grün Töne (15)
    '#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0',
    '#065f46', '#047857', '#059669', '#10b981', '#6ee7b7',
    '#00c853', '#1aed7a', '#00ff88', '#66ff99', '#99ffaa',
    
    // Orange/Gelb Töne (15)
    '#ea580c', '#ff8800', '#ffaa00', '#ff9900', '#ff7700',
    '#fbbf24', '#fcd34d', '#fef08a', '#fef3c7', '#fde047',
    '#eab308', '#ca8a04', '#b45309', '#92400e', '#78350f',
    
    // Türkis/Cyan (10)
    '#06b6d4', '#14b8a6', '#0891b2', '#0d9488', '#14b8a6',
    '#2dd4bf', '#67e8f9', '#164e63', '#134e4a', '#0f766e',
    
    // Grau/Neutral (10)
    '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6',
    '#4b5563', '#6b7587', '#8b949e', '#c9d1d9', '#30363d'
];

// Character Sets
const CHARACTER_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Settings Funktionen
function initializeSettings() {
    loadSettings();
    initializeColorPalette();
    setupEventListeners();
}

function setupEventListeners() {
    // Password generation
    lengthSlider.addEventListener('input', updateLengthDisplay);
    generateBtn.addEventListener('click', generatePassword);
    refreshBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearPassword);
    
    // Settings
    settingsToggle.addEventListener('click', toggleSettings);
    settingsClose.addEventListener('click', closeSettings);
    settingsOverlay.addEventListener('click', closeSettings);
    colorPicker.addEventListener('change', handleColorChange);
    scalePicker.addEventListener('input', handleScaleChange);
    resetSettings.addEventListener('click', resetToDefaults);
    youtubeBtn.addEventListener('click', () => window.open('https://www.youtube.com', '_blank'));
    githubBtn.addEventListener('click', () => window.open('https://www.github.com', '_blank'));
    
    // Close settings on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettings();
        }
    });
}

function toggleSettings() {
    if (settingsPanel.classList.contains('active')) {
        closeSettings();
    } else {
        openSettings();
    }
}

function openSettings() {
    settingsPanel.classList.add('active');
    settingsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSettings() {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initializeColorPalette() {
    COLORS.forEach((color) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        colorOption.title = color;
        colorOption.addEventListener('click', () => {
            setColor(color);
        });
        colorPalette.appendChild(colorOption);
    });
}

function handleColorChange(e) {
    const color = e.target.value;
    setColor(color);
}

function setColor(color) {
    colorPicker.value = color;
    updateColorOptions(color);
    applyColor(color);
    localStorage.setItem('primaryColor', color);
}

function updateColorOptions(color) {
    document.querySelectorAll('.color-option').forEach(option => {
        if (option.style.backgroundColor === color) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function applyColor(hexColor) {
    // Konvertiere HEX zu RGB für weitere Verarbeitung
    const rgb = hexToRgb(hexColor);
    
    // Erstelle Variationen der Farbe
    const darkColor = shadeColor(hexColor, -20);
    const lightColor = shadeColor(hexColor, 20);
    const veryLight = shadeColor(hexColor, 50);
    
    // Setze CSS Variablen
    document.documentElement.style.setProperty('--primary-blue', hexColor);
    document.documentElement.style.setProperty('--primary-dark', darkColor);
    document.documentElement.style.setProperty('--primary-light', lightColor);
    document.documentElement.style.setProperty('--accent-blue', lightColor);
    
    // Ändere den Hintergrund-Gradient
    const gradientBg = document.querySelector('.gradient-bg');
    const veryDark = shadeColor(hexColor, -60);
    gradientBg.style.background = `linear-gradient(135deg, ${veryDark} 0%, ${darkColor} 50%, ${veryDark} 100%)`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + (R < 16 ? 0 : 1) * R * 0x10000 +
        (G < 16 ? 0 : 1) * G * 0x100 + (B < 16 ? 0 : 1) * B)
        .toString(16).slice(1);
}

function handleScaleChange(e) {
    const scale = parseInt(e.target.value);
    scaleDisplay.textContent = scale + '%';
    applyScale(scale);
    localStorage.setItem('layoutScale', scale.toString());
}

function applyScale(scale) {
    const scaleValue = scale / 100;
    document.documentElement.style.setProperty('--scale', scaleValue);
    document.documentElement.style.fontSize = (16 * scaleValue) + 'px';
}

function loadSettings() {
    // Load color
    const savedColor = localStorage.getItem('primaryColor') || '#0066cc';
    colorPicker.value = savedColor;
    applyColor(savedColor);
    updateColorOptions(savedColor);
    
    // Load scale
    const savedScale = localStorage.getItem('layoutScale') || '100';
    scalePicker.value = savedScale;
    scaleDisplay.textContent = savedScale + '%';
    applyScale(parseInt(savedScale));
}

function resetToDefaults() {
    if (confirm('Möchtest du wirklich alle Einstellungen zurücksetzen?')) {
        localStorage.removeItem('primaryColor');
        localStorage.removeItem('layoutScale');
        colorPicker.value = '#0066cc';
        scalePicker.value = '100';
        loadSettings();
        showNotification('✓ Einstellungen zurückgesetzt!', 'success');
    }
}

// Update length display
function updateLengthDisplay() {
    lengthDisplay.textContent = lengthSlider.value;
}

// Generate Password
function generatePassword() {
    // Check if at least one option is selected
    const hasUppercase = uppercaseCheckbox.checked;
    const hasLowercase = lowercaseCheckbox.checked;
    const hasDigits = digitsCheckbox.checked;
    const hasSpecial = specialCheckbox.checked;

    if (!hasUppercase && !hasLowercase && !hasDigits && !hasSpecial) {
        showNotification('Bitte wähle mindestens einen Zeichentyp aus!', 'error');
        return;
    }

    // Build character set
    let charset = '';
    if (hasUppercase) charset += CHARACTER_SETS.uppercase;
    if (hasLowercase) charset += CHARACTER_SETS.lowercase;
    if (hasDigits) charset += CHARACTER_SETS.digits;
    if (hasSpecial) charset += CHARACTER_SETS.special;

    // Generate password
    const length = parseInt(lengthSlider.value);
    let password = '';
    
    // Ensure at least one character from each selected type
    let requiredChars = [];
    if (hasUppercase) requiredChars.push(getRandomChar(CHARACTER_SETS.uppercase));
    if (hasLowercase) requiredChars.push(getRandomChar(CHARACTER_SETS.lowercase));
    if (hasDigits) requiredChars.push(getRandomChar(CHARACTER_SETS.digits));
    if (hasSpecial) requiredChars.push(getRandomChar(CHARACTER_SETS.special));

    // Fill remaining length with random chars
    for (let i = requiredChars.length; i < length; i++) {
        requiredChars.push(getRandomChar(charset));
    }

    // Shuffle the password
    password = shuffleArray(requiredChars).join('');

    // Display password
    displayPassword(password, charset);
}

// Get random character from string
function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

// Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Display password
function displayPassword(password, charset) {
    passwordDisplay.textContent = password;

    // Update stats
    statLength.textContent = password.length;
    const uniqueChars = new Set(password).size;
    statUnique.textContent = uniqueChars;

    // Calculate entropy
    const entropy = password.length * Math.log2(charset.length);
    const combinations = Math.pow(2, entropy);
    statCombinations.textContent = formatLargeNumber(combinations);

    // Calculate strength
    calculateStrength(password, charset);
}

// Format large numbers
function formatLargeNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(1) + 'e18';
    if (num >= 1e15) return (num / 1e15).toFixed(1) + 'e15';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'e12';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'e9';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'e6';
    return Math.floor(num).toString();
}

// Calculate password strength
function calculateStrength(password, charset) {
    const length = password.length;
    const uniqueChars = new Set(password).size;
    const charsetSize = charset.length;

    // Calculate strength score (0-100)
    let score = 0;

    // Length score (0-40)
    score += Math.min(40, (length / 64) * 40);

    // Character diversity score (0-40)
    score += Math.min(40, (uniqueChars / Math.max(length, 1)) * 100);

    // Charset complexity score (0-20)
    score += Math.min(20, (charsetSize / 94) * 20);

    // Update strength bar and text
    strengthFill.style.width = score + '%';

    if (score < 20) {
        strengthText.textContent = '🔴 Sehr Schwach';
        strengthText.style.color = '#ff3b30';
    } else if (score < 40) {
        strengthText.textContent = '🟠 Schwach';
        strengthText.style.color = '#ffb300';
    } else if (score < 60) {
        strengthText.textContent = '🟡 Mittel';
        strengthText.style.color = '#ffb300';
    } else if (score < 80) {
        strengthText.textContent = '🟢 Stark';
        strengthText.style.color = '#00c853';
    } else {
        strengthText.textContent = '🟢🟢 Sehr Stark';
        strengthText.style.color = '#00c853';
    }
}

// Copy to clipboard
async function copyToClipboard() {
    const password = passwordDisplay.textContent;

    if (password === 'hier wird dein passwort angezeigt') {
        showNotification('Bitte generiere zuerst ein Passwort!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        showNotification('✓ Passwort kopiert!', 'success');
        
        // Animate button
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        showNotification('Fehler beim Kopieren!', 'error');
    }
}

// Clear password
function clearPassword() {
    passwordDisplay.textContent = 'hier wird dein passwort angezeigt';
    strengthFill.style.width = '0%';
    strengthText.textContent = '-';
    strengthText.style.color = 'var(--accent-blue)';
    statLength.textContent = '0';
    statCombinations.textContent = '0';
    statUnique.textContent = '0';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff3b30, #ff1744)';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Keyboard shortcut: Enter to generate
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generatePassword();
    }
});

// Generate initial password on page load
window.addEventListener('load', () => {
    initializeSettings();
    generatePassword();
});
