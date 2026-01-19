// Sandwich tracker - static version with YAML data

// Get star rating display
function getStarDisplay(rating) {
    const stars = '⭐'.repeat(rating);
    const labels = {
        5: 'Legendary',
        4: 'Great',
        3: 'Good',
        2: 'Okay',
        1: 'Meh'
    };
    return `${stars} ${labels[rating]}`;
}

// Format date to readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update the counter
function updateCounter(count) {
    document.getElementById('sandwichCount').textContent = count;
}

// Render sandwiches list
function renderSandwiches(sandwiches) {
    const container = document.getElementById('sandwiches');

    if (!sandwiches || sandwiches.length === 0) {
        container.innerHTML = '<p class="empty-state">No sandwiches yet. Time to start your delicious journey!</p>';
        return;
    }

    container.innerHTML = sandwiches.map((sandwich, index) => `
        <div class="sandwich-card">
            <div class="sandwich-number">#${index + 1}</div>
            <div class="sandwich-name">${sandwich.name}</div>
            <div class="sandwich-meta">
                <a href="${sandwich.link}" target="_blank" rel="noopener noreferrer" class="place-link">
                    ${sandwich.place}
                </a>
                <span class="separator">•</span>
                <span class="date">${formatDate(sandwich.date)}</span>
            </div>
            <div class="sandwich-header">
                <div class="rating">${getStarDisplay(sandwich.rating)}</div>
            </div>
            <div class="review">"${sandwich.review}"</div>
        </div>
    `).join('');
}

// Load sandwiches from YAML file
async function loadData() {
    try {
        const response = await fetch('data.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);

        const sandwiches = data.sandwiches || [];
        updateCounter(sandwiches.length);
        renderSandwiches(sandwiches);
    } catch (error) {
        console.error('Error loading sandwich data:', error);
        document.getElementById('sandwiches').innerHTML =
            '<p class="empty-state">Error loading sandwich data. Check console for details.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadData);
