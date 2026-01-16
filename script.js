// ═══════════════════════════════════════════════════════════════════════════════
// VΞGΔ LANDING PAGE SCRIPT — Waitlist & VPS Integration
// ═══════════════════════════════════════════════════════════════════════════════

// VPS API Endpoint
const VPS_API_URL = 'https://api-studio.vxga.app/api/waitlist';

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Waitlist Form Handler
const waitlistForm = document.getElementById('waitlist-form');
const formMessage = document.getElementById('form-message');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        useCase: document.getElementById('use-case').value || null,
        timestamp: new Date().toISOString(),
        source: 'landing-page',
        repo: 'U-00D8'
    };
    
    // Show loading state
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Joining...';
    submitButton.disabled = true;
    formMessage.style.display = 'none';
    
    try {
        // Try VPS API first
        const response = await fetch(VPS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const data = await response.json();
            showMessage('success', 'Successfully joined the waitlist! We\'ll notify you soon.');
            waitlistForm.reset();
        } else {
            throw new Error('API error');
        }
    } catch (error) {
        // Fallback: Store locally or use alternative endpoint
        console.log('VPS API not available, using fallback:', error);
        
        // Store in localStorage as backup
        const waitlistData = JSON.parse(localStorage.getItem('waitlist') || '[]');
        waitlistData.push(formData);
        localStorage.setItem('waitlist', JSON.stringify(waitlistData));
        
        showMessage('success', 'Successfully joined the waitlist! (Saved locally)');
        waitlistForm.reset();
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat, .feature-card, .claim-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
});

// VPS Connection Status (optional)
async function checkVPSStatus() {
    try {
        const response = await fetch('https://api-studio.vxga.app/health');
        if (response.ok) {
            console.log('✅ VPS Connected');
        }
    } catch (error) {
        console.log('⚠️ VPS not reachable (using fallback)');
    }
}

// Check VPS on load
checkVPSStatus();
