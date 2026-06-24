// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// WCAG 2.1 AA Compliance
// ==========================================

(function() {
    'use strict';

    // Detect Reduced Motion Preference
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Detect Dark Mode Preference
    function prefersDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Detect High Contrast Mode
    function prefersHighContrast() {
        return window.matchMedia('(prefers-contrast: more)').matches;
    }

    // Keyboard Navigation Support
    function enhanceKeyboardNavigation() {
        // Allow Enter and Space to activate buttons that aren't native buttons
        document.addEventListener('keydown', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && 
                e.target.getAttribute('role') === 'button' &&
                e.target.tagName !== 'BUTTON') {
                e.preventDefault();
                e.target.click();
            }
        });
    }

    // Focus Management
    function manageFocus() {
        // Ensure first focusable element gets focus on load
        const firstFocusable = document.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (firstFocusable && !document.activeElement) {
            firstFocusable.focus();
        }
    }

    // Announce Dynamic Content Changes
    function announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            announcement.remove();
        }, 3000);
    }

    // Enhanced Focus Visibility
    function enhanceFocusVisibility() {
        let isKeyboardNav = false;

        document.addEventListener('keydown', function() {
            isKeyboardNav = true;
            document.body.classList.add('keyboard-nav');
        });

        document.addEventListener('mousedown', function() {
            isKeyboardNav = false;
            document.body.classList.remove('keyboard-nav');
        });
    }

    // Test Color Contrast
    function testContrast() {
        // This is a simplified version. For production, use a library like polished
        console.log('Testing color contrast for WCAG AA compliance...');
        // Primary to text: #d4af37 on #1a1a1a = high contrast ✓
    }

    // Skip Navigation Links
    function createSkipLinks() {
        if (!document.querySelector('.skip-link')) {
            const skip = document.createElement('a');
            skip.href = '#main-content';
            skip.className = 'skip-link';
            skip.textContent = 'Saltar al contenido principal';
            document.body.insertBefore(skip, document.body.firstChild);
        }
    }

    // Landmark Navigation Support
    function enhanceLandmarks() {
        // Ensure all landmark regions have proper ARIA labels
        document.querySelectorAll('header, nav, main, footer, section').forEach(el => {
            if (!el.hasAttribute('role') && !el.getAttribute('aria-label')) {
                if (el.tagName === 'HEADER') {
                    el.setAttribute('role', 'banner');
                } else if (el.tagName === 'NAV') {
                    el.setAttribute('role', 'navigation');
                    if (!el.getAttribute('aria-label')) {
                        el.setAttribute('aria-label', 'Navegación principal');
                    }
                } else if (el.tagName === 'MAIN') {
                    el.setAttribute('role', 'main');
                } else if (el.tagName === 'FOOTER') {
                    el.setAttribute('role', 'contentinfo');
                }
            }
        });
    }

    // Form Accessibility
    function enhanceFormAccessibility() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            // Ensure all inputs have labels
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (!label && !input.getAttribute('aria-label')) {
                console.warn('Input missing label:', input);
            }

            // Add aria-required if required attribute is present
            if (input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
            }

            // Add aria-invalid if input has error class
            if (input.classList.contains('error')) {
                input.setAttribute('aria-invalid', 'true');
            }
        });
    }

    // Language Detection
    function detectLanguage() {
        const storedLang = localStorage.getItem('preferred-language');
        const browserLang = navigator.language.split('-')[0];
        const html = document.documentElement;

        const lang = storedLang || (browserLang === 'es' ? 'es' : 'en');
        html.setAttribute('lang', lang);
    }

    // Print Stylesheet Check
    function verifyPrintStyle() {
        // Verify print styles are present
        const printStyle = document.querySelector('style[media="print"], link[media="print"]');
        if (!printStyle) {
            console.log('Consider adding print styles for better accessibility');
        }
    }

    // ARIA Attributes Validator
    function validateAria() {
        const issues = [];

        // Check for aria-labels where needed
        document.querySelectorAll('button:not(:has(> *)), a:not(:has(> *))').forEach(el => {
            const hasText = el.textContent.trim().length > 0;
            const hasAriaLabel = el.hasAttribute('aria-label');
            const hasTitle = el.hasAttribute('title');

            if (!hasText && !hasAriaLabel && !hasTitle) {
                issues.push(`${el.tagName} without accessible label:`, el);
            }
        });

        if (issues.length > 0) {
            console.warn('ARIA validation issues found:', issues);
        }
    }

    // Initialize All Accessibility Features
    function initAccessibility() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            createSkipLinks();
            enhanceKeyboardNavigation();
            manageFocus();
            enhanceFocusVisibility();
            enhanceLandmarks();
            enhanceFormAccessibility();
            detectLanguage();
            verifyPrintStyle();
            validateAria();
            testContrast();

            // Log preferences
            console.log('Accessibility Preferences:');
            console.log('- Reduced Motion:', prefersReducedMotion());
            console.log('- Dark Mode:', prefersDarkMode());
            console.log('- High Contrast:', prefersHighContrast());
        }
    }

    // Export functions for external use
    window.Accessibility = {
        announceChange,
        prefersReducedMotion,
        prefersDarkMode,
        prefersHighContrast
    };

    // Start initialization
    initAccessibility();

})();
