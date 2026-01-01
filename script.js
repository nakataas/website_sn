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

// Plan Details Modal (High Tea)
document.addEventListener('DOMContentLoaded', function () {
    const planModal = document.getElementById('plan-modal');
    const planDetailsBtn = document.getElementById('plan-details-btn');
    const planModalCloseBtn = document.querySelector('#plan-modal .modal-close');

    if (planDetailsBtn && planModal) {
        planDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            planModal.classList.add('active');
        });
    }

    if (planModalCloseBtn && planModal) {
        planModalCloseBtn.addEventListener('click', () => {
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
});

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

// Timeline Scroll Arrow Navigation
const timelineContainer = document.querySelector('.timeline-container');
const scrollUpBtn = document.getElementById('scroll-up-btn');
const scrollDownBtn = document.getElementById('scroll-down-btn');

if (timelineContainer && scrollUpBtn && scrollDownBtn) {
    const scrollAmount = 300; // pixels to scroll per click

    // Check scroll position and show/hide arrows
    function updateArrowVisibility() {
        const { scrollTop, scrollHeight, clientHeight } = timelineContainer;

        // Show up arrow if scrolled down
        if (scrollTop > 20) {
            scrollUpBtn.classList.add('visible');
        } else {
            scrollUpBtn.classList.remove('visible');
        }

        // Show down arrow if there's more content below
        if (scrollTop + clientHeight < scrollHeight - 20) {
            scrollDownBtn.classList.add('visible');
        } else {
            scrollDownBtn.classList.remove('visible');
        }
    }

    // Scroll up when up arrow is clicked
    scrollUpBtn.addEventListener('click', () => {
        timelineContainer.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Scroll down when down arrow is clicked
    scrollDownBtn.addEventListener('click', () => {
        timelineContainer.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update arrow visibility on scroll
    timelineContainer.addEventListener('scroll', updateArrowVisibility);

    // Initial check
    updateArrowVisibility();

    // Recheck on window resize
    window.addEventListener('resize', updateArrowVisibility);
}

// Salon Plan Details Modal
document.addEventListener('DOMContentLoaded', function () {
    const planModalSalon = document.getElementById('plan-modal-salon');
    const planDetailsBtnSalon = document.getElementById('plan-btn-salon');
    const planModalCloseBtnSalon = document.querySelector('#plan-modal-salon .modal-close');

    if (planDetailsBtnSalon && planModalSalon) {
        planDetailsBtnSalon.addEventListener('click', (e) => {
            e.preventDefault();
            planModalSalon.classList.add('active');
        });
    }

    if (planModalCloseBtnSalon && planModalSalon) {
        planModalCloseBtnSalon.addEventListener('click', () => {
            planModalSalon.classList.remove('active');
        });
    }

    // Close on outside click for Salon Plan Modal
    if (planModalSalon) {
        window.addEventListener('click', (e) => {
            if (e.target === planModalSalon) {
                planModalSalon.classList.remove('active');
            }
        });
    }
});

// Mini Countdown Timers for Upcoming Dates
function updateMiniCountdowns() {
    const now = new Date();

    // Salon Date - Jan 4, 2026 (Month is 0-indexed: 0 = Jan)
    // Using new Date(year, monthIndex, day) is safer for mobile browsers than string parsing
    // Salon Date - Jan 4, 2026 13:35 (Departure time)
    // Using new Date(year, monthIndex, day, hours, minutes)
    const salonDate = new Date(2026, 0, 4, 13, 35, 0);
    const salonDiff = salonDate - now;

    if (salonDiff > 0) {
        const salonDays = Math.floor(salonDiff / (1000 * 60 * 60 * 24));
        const salonHours = Math.floor((salonDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const salonMinutes = Math.floor((salonDiff % (1000 * 60 * 60)) / (1000 * 60));

        const salonCountdown = document.getElementById('mini-countdown-salon');
        if (salonCountdown) {
            const daysEl = salonCountdown.querySelector('[data-days]');
            const hoursEl = salonCountdown.querySelector('[data-hours]');
            const minutesEl = salonCountdown.querySelector('[data-minutes]');

            if (daysEl) daysEl.textContent = salonDays;
            if (hoursEl) hoursEl.textContent = salonHours;
            if (minutesEl) minutesEl.textContent = salonMinutes;
        }
    }

    // Painting Date - Jan 3, 2026 16:00 (Pick Up time)
    const paintingDate = new Date(2026, 0, 3, 16, 0, 0);
    const paintingDiff = paintingDate - now;

    if (paintingDiff > 0) {
        const paintingDays = Math.floor(paintingDiff / (1000 * 60 * 60 * 24));
        const paintingHours = Math.floor((paintingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const paintingMinutes = Math.floor((paintingDiff % (1000 * 60 * 60)) / (1000 * 60));

        const paintingCountdown = document.getElementById('mini-countdown-painting');
        if (paintingCountdown) {
            const daysEl = paintingCountdown.querySelector('[data-days]');
            const hoursEl = paintingCountdown.querySelector('[data-hours]');
            const minutesEl = paintingCountdown.querySelector('[data-minutes]');

            if (daysEl) daysEl.textContent = paintingDays;
            if (hoursEl) hoursEl.textContent = paintingHours;
            if (minutesEl) minutesEl.textContent = paintingMinutes;
        }
    }
}

// Initialize mini countdowns with multiple fallbacks
function initCountdowns() {
    updateMiniCountdowns();
    // Clear any existing interval to prevent duplicates
    if (window.miniCountdownInterval) clearInterval(window.miniCountdownInterval);
    window.miniCountdownInterval = setInterval(updateMiniCountdowns, 1000);
}

// Run immediately if DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCountdowns();
} else {
    document.addEventListener('DOMContentLoaded', initCountdowns);
}

// Backup check for mobile (window 'load' often safer for full asset loading)
window.addEventListener('load', initCountdowns);
