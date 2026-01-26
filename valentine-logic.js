
// ==========================================
// VALENTINE POPUP LOGIC
// ==========================================

console.log('[VALENTINE] Script loaded!');

// Global function to be called after password unlock
window.checkAndShowValentinePopup = function () {
    console.log('[VALENTINE] checkAndShowValentinePopup called!');
    const valPopup = document.getElementById('valentine-popup');
    console.log('[VALENTINE] Popup element:', valPopup);

    const POPUP_SEEN_KEY = 'valentine_popup_seen_v5'; // Bump to v5

    const hasSeenBefore = localStorage.getItem(POPUP_SEEN_KEY);
    console.log('[VALENTINE] Has seen before?', hasSeenBefore);

    // FORCE SHOW for debugging - remove this check temporarily
    // if (!hasSeenBefore) {
    // Show with a slight delay for smooth transition after password fade
    setTimeout(() => {
        if (valPopup) {
            console.log('[VALENTINE] Adding active class to popup');
            valPopup.classList.add('active');
            valPopup.style.display = 'flex'; // Force display
            valPopup.style.opacity = '1';
            valPopup.style.visibility = 'visible';
            console.log('[VALENTINE] Popup should be visible now!');
        } else {
            console.error('[VALENTINE] Popup element not found!');
        }
    }, 800);
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('[VALENTINE] DOMContentLoaded fired');
    const valPopup = document.getElementById('valentine-popup');
    const valCloseBtn = document.querySelector('.valentine-close');
    const openValBtn = document.getElementById('open-valentine-btn');
    const POPUP_SEEN_KEY = 'valentine_popup_seen_v5';

    console.log('[VALENTINE] Elements found - Popup:', !!valPopup, 'Close:', !!valCloseBtn, 'Open:', !!openValBtn);

    // Close Button Logic
    if (valCloseBtn && valPopup) {
        valCloseBtn.addEventListener('click', () => {
            console.log('[VALENTINE] Close button clicked');
            valPopup.classList.remove('active');
            localStorage.setItem(POPUP_SEEN_KEY, 'true');
        });
    }

    // Open Main Valentine Page
    if (openValBtn) {
        openValBtn.addEventListener('click', () => {
            console.log('[VALENTINE] Open button clicked');
            localStorage.setItem(POPUP_SEEN_KEY, 'true');
            window.location.href = 'valentine.html';
        });
    }

    // Close on outside click
    if (valPopup) {
        window.addEventListener('click', (e) => {
            if (e.target === valPopup) {
                console.log('[VALENTINE] Outside click detected');
                valPopup.classList.remove('active');
                localStorage.setItem(POPUP_SEEN_KEY, 'true');
            }
        });
    }
});
