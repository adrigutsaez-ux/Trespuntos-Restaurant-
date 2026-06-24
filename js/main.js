// ==========================================
// TRES PUNTOS - RESTAURANT WEBSITE
// Main JavaScript Functionality
// ==========================================

(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const langButtons = document.querySelectorAll('.lang-btn');

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });

    // Language Selector
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Store preference
            localStorage.setItem('preferred-language', lang);
            
            // Update content (example)
            updateLanguage(lang);
        });
    });

    // Language Update Function
    function updateLanguage(lang) {
        console.log('Language changed to:', lang);
        // Here you would implement actual language switching
        // This could load translations from a JSON file or update DOM directly
    }

    // Initialize preferred language
    function initializeLanguage() {
        const preferred = localStorage.getItem('preferred-language') || 'es';
        const langBtn = document.querySelector(`[data-lang="${preferred}"]`);
        if (langBtn) {
            langBtn.click();
        }
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.dish-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Keyboard Navigation for Dish Cards
    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.focus();
            }
        });
    });

    // Performance: Lazy Loading for Images (if implemented)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initializeLanguage();
    });

    // Analytics Event Tracking
    function trackEvent(eventName, eventData = {}) {
        if (window.gtag) {
            gtag('event', eventName, eventData);
        }
        console.log('Event tracked:', eventName, eventData);
    }

    // Track CTA clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent,
                button_class: this.className
            });
        });
    });

    // Log page view
    window.addEventListener('load', function() {
        trackEvent('page_load', {
            page_title: document.title
        });
    });

})();
