// Target date: December 24, 2025, 18:50:00
const startDate = new Date('2025-12-24T18:50:00').getTime();

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(difference % 1000);

    // Update DOM
    document.getElementById('days').innerText = String(days).padStart(2, '0');
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

if (planDetailsBtn) {
    planDetailsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        planModal.classList.add('active');
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        planModal.classList.remove('active');
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === planModal) {
        planModal.classList.remove('active');
    }
});
