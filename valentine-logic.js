
// ==========================================
// VALENTINE POPUP LOGIC
// ==========================================

// Global function to be called after password unlock
window.checkAndShowValentinePopup = function () {
    const valPopup = document.getElementById('valentine-popup');
    const POPUP_SEEN_KEY = 'valentine_popup_seen_v2'; // Bump version to re-show if needed

    // Check if seen
    if (!localStorage.getItem(POPUP_SEEN_KEY)) {
        // Show with a slight delay for smooth transition after password fade
        setTimeout(() => {
            if (valPopup) {
                console.log("Showing Valentine Popup!");
                valPopup.classList.add('active');
            }
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const valPopup = document.getElementById('valentine-popup');
    const valCloseBtn = document.querySelector('.valentine-close');
    const openValBtn = document.getElementById('open-valentine-btn');
    const POPUP_SEEN_KEY = 'valentine_popup_seen_v2';

    // NOTE: We REMOVED the auto-show on DOMContentLoaded.
    // It is now triggered manually by script.js after password success.

    // Close Button Logic
    if (valCloseBtn && valPopup) {
        valCloseBtn.addEventListener('click', () => {
            valPopup.classList.remove('active');
            // Mark as seen so it doesn't show again
            localStorage.setItem(POPUP_SEEN_KEY, 'true');
        });
    }

    // Open Main Valentine Page
    if (openValBtn) {
        openValBtn.addEventListener('click', () => {
            // Mark as seen
            localStorage.setItem(POPUP_SEEN_KEY, 'true');
            // Redirect
            window.location.href = 'valentine.html';
        });
    }

    // Optional: Close on outside click
    if (valPopup) {
        window.addEventListener('click', (e) => {
            if (e.target === valPopup) {
                valPopup.classList.remove('active');
                localStorage.setItem(POPUP_SEEN_KEY, 'true');
            }
        });
    }
});
