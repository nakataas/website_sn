// Password Protection
const CORRECT_PASSWORD = 'jakesully';
const passwordOverlay = document.getElementById('password-overlay');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

// Only run password logic if overlay exists (i.e., on pages with protection)
if (passwordOverlay) {
    // Check if already unlocked in session
    if (sessionStorage.getItem('unlocked') === 'true') {
        passwordOverlay.classList.add('unlocked');
    }

    // Focus on input when page loads if not unlocked
    if (!sessionStorage.getItem('unlocked') && passwordInput) {
        setTimeout(() => {
            passwordInput.focus();
        }, 300);
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredPassword = passwordInput.value;

            if (enteredPassword === CORRECT_PASSWORD) {
                // Success
                passwordError.textContent = '';
                passwordOverlay.classList.add('unlocked');
                sessionStorage.setItem('unlocked', 'true');

                // Optional: Remove overlay from DOM after transition
                setTimeout(() => {
                    passwordOverlay.style.display = 'none';
                }, 500);
            } else {
                // Wrong password
                passwordError.textContent = '❌ Incorrect password. Please try again.';
                passwordInput.value = '';
                passwordInput.focus();
                // Shake animation is handled by CSS
            }
        });
    }
}

// Target date: December 24, 2025, 18:50:00
const startDate = new Date('2025-12-24T18:50:00').getTime();

function updateCounter() {
    const dayEl = document.getElementById('days');
    // If counter elements don't exist, stop
    if (!dayEl) return;

    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(difference % 1000);

    // Update DOM
    dayEl.innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Update every second
setInterval(updateCounter, 1000);
// Initial call
updateCounter();

// Plan Details Modal
const planModal = document.getElementById('plan-modal');
const planDetailsBtn = document.getElementById('plan-details-btn');
const modalCloseBtn = document.querySelector('.modal-close');

if (planDetailsBtn && planModal) {
    planDetailsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        planModal.classList.add('active');
    });
}

if (modalCloseBtn && planModal) {
    modalCloseBtn.addEventListener('click', () => {
        planModal.classList.remove('active');
    });
}

// Close on outside click for Plan Modal
if (planModal) {
    window.addEventListener('click', (e) => {
        if (e.target === planModal) {
            planModal.classList.remove('active');
        }
    });
}

/* Letters Feature Logic */
const letters = {
    // Letter 1: For Silvia
    letter1: {
        recipient: "For Silvia",
        title: "You Are My Everything",
        date: "Dec 30, 2025",
        text: `Hey love,

I wanted to write this just to remind you how incredibly special you are to me. Every moment we spend together feels like a beautiful dream I never want to wake up from.

Thank you for being my partner, my best friend, and my greatest adventure. I can't wait for all the memories we have yet to create.

I love you more than words can say. ♡`,
        signature: "Your Nakata",
        type: "her" // for color coding
    },
    // Letter 2: For Nakata
    letter2: {
        recipient: "For Nakata",
        title: "You Make Me Smile",
        date: "Dec 30, 2025",
        text: `My Dearest,

You make my world so much brighter just by being in it. Your smile is my favorite thing, and your laugh is my favorite sound.

Thank you for always being there for me, for making me laugh, and for making me feel so loved. You are my favorite person.

Love you always! ( ˘͈ ᵕ ˘͈ ♡)`,
        signature: "Your Silvia",
        type: "him" // for color coding
    },
    // Keep legacy IDs for backward compatibility if needed
    her: {
        recipient: "For Silvia",
        title: "You Are My Everything",
        date: "Dec 30, 2025",
        text: `Hey love,

I wanted to write this just to remind you how incredibly special you are to me. Every moment we spend together feels like a beautiful dream I never want to wake up from.

Thank you for being my partner, my best friend, and my greatest adventure. I can't wait for all the memories we have yet to create.

I love you more than words can say. ♡`,
        signature: "Your Nakata",
        type: "her"
    },
    him: {
        recipient: "For Nakata",
        title: "You Make Me Smile",
        date: "Dec 30, 2025",
        text: `My Dearest,

You make my world so much brighter just by being in it. Your smile is my favorite thing, and your laugh is my favorite sound.

Thank you for always being there for me, for making me laugh, and for making me feel so loved. You are my favorite person.

Love you always! ( ˘͈ ᵕ ˘͈ ♡)`,
        signature: "Your Silvia",
        type: "him"
    }
};

// Modal Logic (For index.html if still used, though we are moving away from it)
const letterModal = document.getElementById('letter-modal');
const letterCloseBtn = document.querySelector('.letter-close');
const letterTitle = document.getElementById('letter-title');
const letterDate = document.querySelector('.letter-date');
const letterText = document.getElementById('letter-text');
const letterSignature = document.getElementById('letter-signature');

function openLetter(recipient) {
    // If we are moving to separate pages, this function might trigger a navigation instead
    // But to keep legacy support or if the user clicks the old button:
    // Check if we have a modal on this page
    if (letterModal) {
        const data = letters[recipient];
        if (!data) return;

        letterTitle.textContent = data.title;
        letterDate.textContent = data.date;
        letterText.innerText = data.text;
        letterSignature.textContent = data.signature;

        letterModal.classList.add('active');
    } else {
        // Fallback: Navigate to view page
        window.location.href = `view.html?id=${recipient}`;
    }
}

if (letterCloseBtn && letterModal) {
    letterCloseBtn.addEventListener('click', () => {
        letterModal.classList.remove('active');
    });
}

// Close letter modal on outside click
if (letterModal) {
    window.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.remove('active');
        }
    });
}

// VIEW PAGE LOGIC
// Check if we are on view.html
if (window.location.pathname.endsWith('view.html') || window.location.pathname.endsWith('view')) {
    const urlParams = new URLSearchParams(window.location.search);
    const letterId = urlParams.get('id');

    const viewTitle = document.getElementById('view-title');
    const viewDate = document.getElementById('view-date');
    const viewText = document.getElementById('view-text');
    const viewSignature = document.getElementById('view-signature');

    if (viewTitle && letterId && letters[letterId]) {
        const data = letters[letterId];
        viewTitle.textContent = data.title;
        viewDate.textContent = data.date;
        viewText.innerText = data.text;
        viewSignature.textContent = data.signature;
    } else if (viewTitle) {
        viewTitle.textContent = "Letter Not Found";
        viewText.textContent = "Sorry, the letter you are looking for does not exist or has been moved.";
        viewSignature.textContent = "";
    }
}
