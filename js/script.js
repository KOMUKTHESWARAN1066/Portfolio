// Portfolio JavaScript - Enhanced with Error Handling and Better Structure

// Global variables
let observer;
let certificateManager;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    try {
        // Initialize all components
        initMobileNavigation();
        initSmoothScrolling();
        initTypingAnimation();
        initSkillBars();
        initNavbarScroll();
        initContactForm();
        initProjectCards();
        initScrollToTop();
        initCertificateManager();
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Typing animation for home section
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) {
        console.warn('Typing text element not found');
        return;
    }

    const words = ['Data Analyst', 'Python Developer', 'Web Developer', 'Machine Learning Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typingText) return; // Safety check
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typeSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation with delay
    setTimeout(typeWriter, 1000);
}

// Animate skill bars when they come into view
function initSkillBars() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) {
        console.warn('Skills section not found');
        return;
    }

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width;
                    }
                });
            }
        });
    }, observerOptions);

    observer.observe(skillsSection);

    // Also observe certificates section if it exists
    const certificatesSection = document.querySelector('.certificates');
    if (certificatesSection) {
        observer.observe(certificatesSection);
    }
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        console.warn('Navbar not found');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Contact form handler
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!submitBtn) {
        console.warn('Submit button not found');
        return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending...';
            if (btnLoading) btnLoading.style.display = 'inline-block';
            if (formMessage) formMessage.style.display = 'none';

            // Get form data
            const formData = new FormData(this);
            
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Success message
                if (formMessage) {
                    formMessage.innerHTML = '✅ Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                }
                
                // Reset form
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error message
            if (formMessage) {
                formMessage.innerHTML = '❌ Sorry, there was an error sending your message. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = 'Send Message';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    });
}

// Project cards animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length === 0) {
        console.warn('No project cards found');
        return;
    }

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Certificate Manager
function initCertificateManager() {
    const certificatesContainer = document.getElementById('certificates-grid');
    if (!certificatesContainer) {
        console.warn('Certificates container not found - certificates section may not be added to HTML yet');
        return;
    }

    certificateManager = new CertificateManager();
}

// Certificate Manager Class
class CertificateManager {
    constructor() {
        this.certificatesContainer = document.getElementById('certificates-grid');
        this.configPath = 'certificates/certificates-config.json';
        
        if (!this.certificatesContainer) {
            console.error('Certificates container not found');
            return;
        }
        
        this.init();
    }

    async init() {
        try {
            await this.loadCertificates();
        } catch (error) {
            this.showError('Failed to load certificates');
            console.error('Certificate loading error:', error);
        }
    }

    async loadCertificates() {
        try {
            const response = await fetch(this.configPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.renderCertificates(data.certificates);
        } catch (error) {
            // If config file doesn't exist, show empty state
            this.showNoCertificates();
            console.warn('No certificates config found:', error.message);
        }
    }

    renderCertificates(certificates) {
        if (!certificates || certificates.length === 0) {
            this.showNoCertificates();
            return;
        }

        const certificatesHTML = certificates.map(cert => this.createCertificateCard(cert)).join('');
        this.certificatesContainer.innerHTML = certificatesHTML;

        // Add smooth reveal animation
        setTimeout(() => {
            const cards = this.certificatesContainer.querySelectorAll('.certificate-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    createCertificateCard(cert) {
        // Validate required fields
        if (!cert.name || !cert.issuer) {
            console.warn('Certificate missing required fields:', cert);
            return '';
        }

        const skills = cert.skills ? cert.skills.map(skill => 
            `<span class="cert-skill">${this.escapeHtml(skill)}</span>`).join('') : '';

        return `
            <div class="certificate-card">
                <div class="certificate-image">
                    <img src="${this.escapeHtml(cert.image || '')}" alt="${this.escapeHtml(cert.name)}" 
                         onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:3rem;\\'><i class=\\'fas fa-certificate\\'></i></div>'">
                    <div class="certificate-overlay">
                        <div class="certificate-links">
                            <a href="${this.escapeHtml(cert.pdf || '#')}" target="_blank" class="cert-btn">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${this.escapeHtml(cert.pdf || '#')}" download class="cert-btn">
                                <i class="fas fa-download"></i> Download
                            </a>
                        </div>
                    </div>
                </div>
                <div class="certificate-content">
                    <h3>${this.escapeHtml(cert.name)}</h3>
                    <p class="certificate-issuer">${this.escapeHtml(cert.issuer)}</p>
                    <div class="cert-date">${this.escapeHtml(cert.date || '')}</div>
                    ${cert.type ? `<div class="cert-type">${this.escapeHtml(cert.type)}</div>` : ''}
                    ${skills ? `<div class="cert-skills">${skills}</div>` : ''}
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    showNoCertificates() {
        this.certificatesContainer.innerHTML = `
            <div class="no-certificates">
                <i class="fas fa-certificate" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <h3 style="color: #6b7280; margin-bottom: 0.5rem;">No Certificates Found</h3>
                <p style="color: #9ca3af;">Add certificates to the certificates-config.json file to display them here.</p>
            </div>
        `;
    }

    showError(message) {
        this.certificatesContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <h3>Error Loading Certificates</h3>
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
    }

    // Method to refresh certificates (useful for development)
    async refresh() {
        if (!this.certificatesContainer) return;
        
        this.certificatesContainer.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Refreshing certificates...</p>
            </div>
        `;
        await this.loadCertificates();
    }
}

// Global utility functions
window.portfolioUtils = {
    // Refresh certificates manually (for development)
    refreshCertificates() {
        if (certificateManager) {
            certificateManager.refresh();
        } else {
            console.warn('Certificate manager not initialized');
        }
    },
    
    // Get portfolio status
    getStatus() {
        return {
            certificateManager: !!certificateManager,
            observer: !!observer,
            contactForm: !!document.querySelector('.contact-form'),
            skillsSection: !!document.querySelector('.skills')
        };
    }
};
