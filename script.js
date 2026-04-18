/**
 * S ♡ N - Main Application Script
 * Mobile-first, App-like Experience
 */

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Global error:', msg, 'at line', lineNo);
    return false;
};

// ============================================
// 1. Password Protection
// ============================================
const CORRECT_PASSWORD = '03012026';
const passwordOverlay = document.getElementById('password-overlay');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

if (passwordOverlay) {
    // Check session
    if (sessionStorage.getItem('unlocked') === 'true') {
        passwordOverlay.classList.add('unlocked');
        // showMusicControl will be called after it's defined
        setTimeout(() => {
            if (typeof showMusicControl === 'function') showMusicControl();
        }, 0);
    }

    // Focus input
    if (!sessionStorage.getItem('unlocked') && passwordInput) {
        setTimeout(() => passwordInput.focus(), 300);
    }

    // Form submit
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredPassword = passwordInput.value;

            if (enteredPassword === CORRECT_PASSWORD) {
                passwordError.textContent = '';
                passwordOverlay.classList.add('unlocked');
                sessionStorage.setItem('unlocked', 'true');
                if (typeof showMusicControl === 'function') showMusicControl();
            } else {
                passwordError.textContent = 'Incorrect password. Try again.';
                passwordInput.value = '';
                passwordInput.focus();
                
                // Shake animation
                const card = document.querySelector('.password-card');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'shake 0.5s ease';
                }, 10);
            }
        });
    }
}

// Shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// ============================================
// 2. Countdown Timer
// ============================================
const startDate = new Date('2026-01-03T19:00:00').getTime();

function updateCountdown() {
    const dayEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    
    if (!dayEl || !hoursEl || !minsEl || !secsEl) {
        console.log('Countdown elements not found:', { dayEl, hoursEl, minsEl, secsEl });
        return;
    }

    const now = new Date().getTime();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    dayEl.textContent = String(Math.max(0, days)).padStart(2, '0');
    hoursEl.textContent = String(Math.max(0, hours)).padStart(2, '0');
    minsEl.textContent = String(Math.max(0, minutes)).padStart(2, '0');
    secsEl.textContent = String(Math.max(0, seconds)).padStart(2, '0');
}

// Initialize countdown when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, starting countdown...');
    try {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } catch (e) {
        console.error('Countdown error:', e);
    }
});

// ============================================
// 3. Music Control
// ============================================
const bgMusic = document.getElementById('bg-music');
const musicControl = document.getElementById('music-control');
const musicToggle = document.getElementById('music-toggle');

function showMusicControl() {
    if (musicControl) {
        musicControl.classList.add('visible');
    }
}

function toggleMusic() {
    if (!bgMusic) return;
    
    if (bgMusic.paused) {
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            musicToggle.classList.add('music-btn--playing');
            musicToggle.querySelector('.play-icon').style.display = 'none';
            musicToggle.querySelector('.pause-icon').style.display = 'block';
        }).catch(console.error);
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('music-btn--playing');
        musicToggle.querySelector('.play-icon').style.display = 'block';
        musicToggle.querySelector('.pause-icon').style.display = 'none';
    }
}

if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
}

// ============================================
// 4. Moments Timeline
// ============================================
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function initMoments() {
    const momentsGrid = document.getElementById('moments-grid');
    if (!momentsGrid || typeof momentsData === 'undefined') return;

    // Sort by date descending
    const sortedMoments = [...momentsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const limitedMoments = sortedMoments.slice(0, 4);
    const now = new Date();

    momentsGrid.innerHTML = limitedMoments.map((moment, index) => {
        const momentDate = new Date(moment.date);
        const isFuture = momentDate > now;
        const isLatest = !isFuture && index === limitedMoments.findIndex(m => new Date(m.date) <= now);

        let cardClass = 'moment-card';
        let badgeHtml = '';
        let countdownHtml = '';
        let metaText = formatDate(moment.date);

        if (isFuture) {
            cardClass += ' moment-card--upcoming';
            badgeHtml = '<span class="moment-badge moment-badge--upcoming">Upcoming</span>';
            metaText = formatDate(moment.date);
            countdownHtml = `
                <div class="mini-countdown" data-date="${moment.date}">
                    <span class="mini-countdown-label">⏱ COUNTDOWN</span>
                    <span class="mini-countdown-value" data-days>0</span><span class="mini-countdown-unit">d</span>
                    <span class="mini-countdown-value" data-hours>0</span><span class="mini-countdown-unit">h</span>
                    <span class="mini-countdown-value" data-mins>0</span><span class="mini-countdown-unit">m</span>
                    <span class="mini-countdown-value" data-secs>0</span><span class="mini-countdown-unit">s</span>
                </div>
            `;
        } else if (isLatest) {
            cardClass += ' moment-card--latest';
            badgeHtml = '<span class="moment-badge moment-badge--latest">Latest</span>';
        }

        let actionsHtml = '';
        if (moment.pageUrl) {
            actionsHtml += `
                <a href="${moment.pageUrl}" class="btn btn--secondary">
                    <svg class="btn-icon" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    Plan
                </a>
            `;
        } else if (moment.modalId) {
            actionsHtml += `
                <button class="btn btn--secondary plan-btn" data-modal-target="${moment.modalId}">
                    <svg class="btn-icon" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    Plan
                </button>
            `;
        }
        if (moment.photos) {
            actionsHtml += `
                <a href="${moment.photos}" target="_blank" class="btn btn--primary">
                    <svg class="btn-icon" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
                    </svg>
                    Photos
                </a>
            `;
        }

        return `
            <article class="${cardClass}">
                <div class="moment-meta">
                    ${badgeHtml}
                    <span class="moment-date">${metaText}</span>
                </div>
                <h3 class="moment-title">${moment.title}</h3>
                <p class="moment-description">${moment.description}</p>
                ${countdownHtml}
                <div class="card-actions">
                    ${actionsHtml}
                </div>
            </article>
        `;
    }).join('');

    // Setup buttons
    setupPlanButtons();
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

function setupPlanButtons() {
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.dataset.modalTarget;
            const modal = document.getElementById(targetId);
            if (modal) openModal(modal);
        });
    });
}

function updateCountdowns() {
    const now = new Date();
    document.querySelectorAll('.mini-countdown').forEach(el => {
        const targetDate = new Date(el.dataset.date);
        const diff = targetDate - now;
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            el.querySelector('[data-days]').textContent = days;
            el.querySelector('[data-hours]').textContent = hours;
            el.querySelector('[data-mins]').textContent = mins;
            el.querySelector('[data-secs]').textContent = secs;
        } else {
            el.style.display = 'none';
        }
    });
}

// ============================================
// 5. Modals (Bottom Sheet)
// ============================================
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    // Click outside to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Initialize moments
    initMoments();
});

// ============================================
// 6. Proposal Overlay
// ============================================
const proposalOverlay = document.getElementById('proposal-overlay');
const typewriterText = document.getElementById('typewriter-text');
const proposalStory = document.getElementById('proposal-story');
const finalProposal = document.getElementById('final-proposal');
const successMessage = document.getElementById('success-message');
const heartsContainer = document.getElementById('hearts-container');

const messages = [
    "Processing Access...",
    "Verified: Bunga Silvia",
    "Access Granted.",
    "Hi Sayang... ❤️",
    "Aku mau ngomong sesuatu..."
];

let currentSlide = 0;
const slides = document.querySelectorAll('.story-slide');

function startProposal() {
    if (!proposalOverlay) return;

    // Reset state
    currentSlide = 0;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === 0);
    });

    proposalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Show typewriter stage, hide others
    document.getElementById('typewriter-stage').classList.remove('hidden');
    proposalStory.classList.add('hidden');
    finalProposal.classList.add('hidden');
    successMessage.classList.add('hidden');

    // Play music
    if (bgMusic && bgMusic.paused) {
        toggleMusic();
    }

    // Start typewriter sequence
    playTypewriterSequence(0);
}

function playTypewriterSequence(index) {
    if (index >= messages.length) {
        setTimeout(() => {
            document.getElementById('typewriter-stage').classList.add('hidden');
            proposalStory.classList.remove('hidden');
        }, 800);
        return;
    }

    const text = messages[index];
    typewriterText.textContent = '';
    typewriterText.style.opacity = 1;

    let charIndex = 0;
    function typeChar() {
        if (charIndex < text.length) {
            typewriterText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 60);
        } else {
            setTimeout(() => {
                typewriterText.style.opacity = 0;
                setTimeout(() => playTypewriterSequence(index + 1), 400);
            }, 1200);
        }
    }
    typeChar();
}

// Story navigation
const nextStoryBtn = document.getElementById('next-story-btn');
if (nextStoryBtn) {
    nextStoryBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            slides[currentSlide].classList.remove('active');
            currentSlide++;
            slides[currentSlide].classList.add('active');
            
            if (currentSlide === slides.length - 1) {
                nextStoryBtn.textContent = 'The Question... ❤️';
            }
        } else {
            proposalStory.classList.add('hidden');
            finalProposal.classList.remove('hidden');
            startFloatingHearts();
        }
    });
}

// Yes/No buttons
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const enterWorldBtn = document.getElementById('enter-world-btn');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        finalProposal.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Intensify hearts
        setInterval(() => createFloatingHeart(true), 200);
    });
}

if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 100);
        noBtn.style.position = 'fixed';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    });

    noBtn.addEventListener('click', () => {
        alert('Error: Option unavailable. Only "Yes" is accepted! 😉');
    });
}

if (enterWorldBtn) {
    enterWorldBtn.addEventListener('click', () => {
        proposalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        sessionStorage.setItem('unlocked', 'true');
    });
}

// Floating hearts
function createFloatingHeart(intense = false) {
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = intense 
        ? ['❤️', '💖', '💝', '💕'][Math.floor(Math.random() * 4)]
        : '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * (intense ? 30 : 15) + 10) + 'px';
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
}

function startFloatingHearts() {
    setInterval(() => createFloatingHeart(), 500);
}

// View proposal button
document.addEventListener('DOMContentLoaded', () => {
    const viewProposalBtn = document.getElementById('view-proposal-btn');
    if (viewProposalBtn) {
        viewProposalBtn.addEventListener('click', startProposal);
    }
});

// ============================================
// 7. Letters Data (for view.html)
// ============================================
const letters = {
    letter1: {
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
    letter2: {
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

// View page logic
if (window.location.pathname.includes('view.html') || window.location.pathname.includes('view')) {
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
        viewText.textContent = data.text;
        viewSignature.textContent = data.signature;
    } else if (viewTitle) {
        viewTitle.textContent = "Letter Not Found";
        if (viewText) viewText.textContent = "Sorry, the letter you are looking for does not exist.";
    }
}
