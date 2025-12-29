// View Letter Page Logic
// This script handles displaying individual letter content

function loadLetterContent() {
    // Get letter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const letterId = urlParams.get('id');

    if (!letterId) {
        showError('No letter ID provided');
        return;
    }

    // Try to get from localStorage first
    let lettersData = {};
    try {
        const stored = localStorage.getItem('lettersData');
        if (stored) {
            lettersData = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading from localStorage:', e);
    }

    // Check if we have the letter data
    if (lettersData[letterId]) {
        displayLetter(lettersData[letterId]);
    } else {
        // If not in localStorage, try to fetch fresh data
        fetchLetterById(letterId);
    }
}

// Fetch a specific letter by ID from Google Sheets
async function fetchLetterById(letterId) {
    try {
        const SPREADSHEET_ID = '1on00N1aSNpnf7xJ_usC4GLQCn_NWztm3kB6bvZG8ACA';
        const SHEET_NAME = 'Form Responses 1';
        const API_KEY = 'AIzaSyBSZyM7t7QiD6pxJQk9lMb0gzG_dJKHw8E';

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch letter data');
        }

        const data = await response.json();
        const rows = data.values;

        // Find the letter by ID
        // letterId format is "letter_X" where X is the row index
        const rowIndex = parseInt(letterId.replace('letter_', ''));

        if (rowIndex > 0 && rowIndex < rows.length) {
            const row = rows[rowIndex];
            if (row.length >= 4) {
                const letter = {
                    id: letterId,
                    timestamp: row[0],
                    recipient: row[1],
                    subject: row[2],
                    content: row[3],
                    type: row[1].toLowerCase() === 'silvia' ? 'her' : 'him',
                    date: formatDate(row[0])
                };

                displayLetter(letter);
                return;
            }
        }

        showError('Letter not found');
    } catch (error) {
        console.error('Error fetching letter:', error);
        showError('Failed to load letter');
    }
}

// Display letter content on the page
function displayLetter(letter) {
    const viewTitle = document.getElementById('view-title');
    const viewDate = document.getElementById('view-date');
    const viewText = document.getElementById('view-text');
    const viewSignature = document.getElementById('view-signature');

    if (viewTitle && viewDate && viewText && viewSignature) {
        viewTitle.textContent = letter.subject || 'Untitled Letter';
        viewDate.textContent = letter.date || '';
        viewText.innerText = letter.content || 'No content';

        // Determine signature based on recipient
        // If letter is FOR Silvia, it's FROM Nakata (and vice versa)
        const isForSilvia = letter.type === 'her';
        viewSignature.textContent = isForSilvia ? 'Your Nakata' : 'Your Silvia';
    }
}

// Show error message
function showError(message) {
    const viewTitle = document.getElementById('view-title');
    const viewText = document.getElementById('view-text');
    const viewSignature = document.getElementById('view-signature');

    if (viewTitle && viewText) {
        viewTitle.textContent = 'Error';
        viewText.textContent = message;
        viewSignature.textContent = '';
    }
}

// Format date helper
function formatDate(timestamp) {
    try {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (e) {
        return timestamp;
    }
}

// Initialize when page loads
if (window.location.pathname.includes('view.html')) {
    // Wait a bit for other scripts to load
    setTimeout(loadLetterContent, 100);
}
