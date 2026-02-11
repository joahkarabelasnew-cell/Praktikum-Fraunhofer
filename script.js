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

// Character Sets
const CHARACTER_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Event Listeners
lengthSlider.addEventListener('input', updateLengthDisplay);
generateBtn.addEventListener('click', generatePassword);
refreshBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);
clearBtn.addEventListener('click', clearPassword);

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
    generatePassword();
});
