// Render FAQs
function renderFAQs(faqs) {
    const container = document.getElementById('faq-list');

    if (!faqs || faqs.length === 0) {
        container.innerHTML = '<p class="empty-state">No FAQs yet.</p>';
        return;
    }

    container.innerHTML = faqs.map(faq => `
        <div class="faq-item">
            <h3 class="faq-question">${faq.question}</h3>
            <p class="faq-answer">${faq.answer}</p>
        </div>
    `).join('');
}

// Load FAQs from YAML file
async function loadFAQs() {
    try {
        const response = await fetch('faq.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);

        const faqs = data.faqs || [];
        renderFAQs(faqs);
    } catch (error) {
        console.error('Error loading FAQ data:', error);
        document.getElementById('faq-list').innerHTML =
            '<p class="empty-state">Error loading FAQs. Check console for details.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadFAQs);
