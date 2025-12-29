// Google Sheets Configuration
const SPREADSHEET_ID = '1on00N1aSNpnf7xJ_usC4GLQCn_NWztm3kB6bvZG8ACA';
const SHEET_NAME = 'Form Responses 1';
const API_KEY = 'AIzaSyAVIdI3CrmhXZqJ2kNiej-f7aSw8XL02AQ'; // You'll need to replace this with your actual API key

// Global letters storage (will be used by view.html too)
window.lettersData = {};

// Fetch letters from Google Sheets
async function fetchLetters() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }

        const data = await response.json();
        const rows = data.values;

        // Skip header row (index 0)
        const letters = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length >= 4) {
                const timestamp = row[0];
                const recipient = row[1]; // "Nakata" or "Silvia"
                const subject = row[2];
                const content = row[3];

                // Create letter object
                const letter = {
                    id: `letter_${i}`,
                    timestamp: timestamp,
                    recipient: recipient,
                    subject: subject,
                    content: content,
                    type: recipient.toLowerCase() === 'silvia' ? 'her' : 'him',
                    // Parse date for display
                    date: formatDate(timestamp)
                };

                letters.push(letter);
                // Store in global object for view.html to access
                window.lettersData[letter.id] = letter;
            }
        }

        // Store in localStorage for view.html to access
        localStorage.setItem('lettersData', JSON.stringify(window.lettersData));

        return letters;
    } catch (error) {
        console.error('Error fetching letters:', error);
        return [];
    }
}

// Format timestamp to readable date
function formatDate(timestamp) {
    try {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (e) {
        return timestamp;
    }
}

// Render letters on the page
function renderLetters(letters) {
    const container = document.getElementById('letters-grid');

    if (!container) return;

    if (letters.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No letters yet. Be the first to write one! 💌</p>
            </div>
        `;
        return;
    }

    // Clear loading state
    container.innerHTML = '';

    // Render each letter (newest first)
    letters.reverse().forEach(letter => {
        const isForHer = letter.type === 'her';
        const cardClass = isForHer ? 'for-her' : 'for-him';
        const recipientClass = isForHer ? '' : 'blue';

        const cardHTML = `
            <a href="view.html?id=${letter.id}" class="letter-card-link">
                <div class="letter-card ${cardClass}">
                    <div class="envelope-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <div class="heart-seal ${recipientClass}">♡</div>
                    </div>
                    <span class="letter-recipient ${recipientClass}">For ${letter.recipient}</span>
                    <h3>${escapeHtml(letter.subject)}</h3>
                    <span class="letter-date-stamp">${letter.date}</span>
                    <span class="read-more">Read Letter &rarr;</span>
                </div>
            </a>
        `;

        container.innerHTML += cardHTML;
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize on letters.html page
if (window.location.pathname.includes('letters.html')) {
    fetchLetters().then(letters => {
        renderLetters(letters);
    });
}
