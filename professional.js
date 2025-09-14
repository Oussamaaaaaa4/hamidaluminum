/**
 * Hamid Aluminum - Professional Animations & Interactions
 * Enhanced user experience with smooth animations and micro-interactions
 */

class ProfessionalAnimations {
    constructor() {
        this.init();
        this.setupScrollAnimations();
        this.setupMicroInteractions();
        this.setupParallaxEffects();
        this.setupTypingAnimations();
    }

    init() {
        // Initialize intersection observer for scroll animations
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver(
            this.handleScrollAnimation.bind(this),
            this.observerOptions
        );

        // Setup staggered animations
        this.setupStaggeredAnimations();
        
        // Enhanced loading screen
        this.enhancedLoadingScreen();
        
        // Professional cursor effects
        this.setupCursorEffects();
    }

    setupScrollAnimations() {
        // Add scroll reveal classes to elements
        const elementsToAnimate = [
            '.service-card',
            '.portfolio-item',
            '.hero-content > *',
            '.section-header',
            '.feature-card'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add('scroll-reveal');
                element.style.transitionDelay = `${index * 0.1}s`;
                this.scrollObserver.observe(element);
            });
        });

        // Advanced scroll effects for hero section
        this.setupHeroScrollEffects();
    }

    handleScrollAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('animate-slide-bottom');
                } else if (entry.target.classList.contains('portfolio-item')) {
                    entry.target.classList.add('animate-scale-in');
                } else if (entry.target.classList.contains('hero-content')) {
                    entry.target.classList.add('animate-slide-left');
                }
                
                // Unobserve after animation
                setTimeout(() => {
                    this.scrollObserver.unobserve(entry.target);
                }, 1000);
            }
        });
    }

    setupStaggeredAnimations() {
        // Staggered animation for navigation items
        document.querySelectorAll('.nav-menu li').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-slide-bottom');
        });

        // Staggered animation for service cards
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Staggered animation for social buttons
        document.querySelectorAll('.social-btn').forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.3}s`;
            btn.classList.add('animate-rotate-in');
        });
    }

    setupMicroInteractions() {
        // Enhanced button interactions
        document.querySelectorAll('.btn, .service-whatsapp, .service-instagram').forEach(button => {
            this.addButtonMicroInteraction(button);
        });

        // Logo interaction
        const logo = document.querySelector('.logo-link');
        if (logo) {
            this.addLogoInteraction(logo);
        }

        // Navigation hover effects
        this.setupNavigationEffects();

        // Service card interactions
        this.setupServiceCardInteractions();
    }

    addButtonMicroInteraction(button) {
        button.addEventListener('mouseenter', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            // Add CSS for ripple effect
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .ripple-effect {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: translate(-50%, -50%) scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple {
                        to {
                            transform: translate(-50%, -50%) scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    }

    addLogoInteraction(logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create celebration effect
            this.createCelebrationEffect(logo);
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createCelebrationEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #3498db, #e74c3c);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;

            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let posX = centerX;
            let posY = centerY;
            let opacity = 1;

            const animate = () => {
                posX += vx * 0.02;
                posY += vy * 0.02 + 2; // gravity
                opacity *= 0.95;

                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;

                if (opacity > 0.01) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }

    setupNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Add sound effect (visual feedback)
            link.addEventListener('click', (e) => {
                // Create visual feedback
                const feedback = document.createElement('div');
                feedback.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(52, 152, 219, 0.3);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: expand 0.5s ease-out forwards;
                    pointer-events: none;
                    z-index: 10;
                `;

                link.style.position = 'relative';
                link.appendChild(feedback);

                // Add expand animation
                if (!document.querySelector('#expand-styles')) {
                    const style = document.createElement('style');
                    style.id = 'expand-styles';
                    style.textContent = `
                        @keyframes expand {
                            to {
                                width: 100px;
                                height: 100px;
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                setTimeout(() => feedback.remove(), 500);
            });
        });
    }

    setupServiceCardInteractions() {
        document.querySelectorAll('.service-card').forEach(card => {
            let tiltTimeout;

            card.addEventListener('mousemove', (e) => {
                clearTimeout(tiltTimeout);
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                card.style.boxShadow = `0 ${Math.abs(rotateX)}px ${Math.abs(rotateX) * 2}px rgba(0,0,0,0.1)`;
            });

            card.addEventListener('mouseleave', () => {
                tiltTimeout = setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 200);
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.floating-aluminum');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Mouse parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                parallaxElements.forEach((element, index) => {
                    const moveX = (x - 0.5) * (10 + index * 5);
                    const moveY = (y - 0.5) * (10 + index * 5);
                    
                    element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
                });
            });
        }
    }

    setupTypingAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            this.typeWriter(heroTitle, heroTitle.textContent, 50);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                this.typeWriter(heroSubtitle, heroSubtitle.textContent, 30);
            }, 1000);
        }
    }

    typeWriter(element, text, speed) {
        element.textContent = '';
        element.style.borderRight = '2px solid #3498db';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        type();
    }

    enhancedLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (!loadingScreen) return;

        // Create enhanced loading animation
        const loader = loadingScreen.querySelector('.loading-spinner');
        if (loader) {
            loader.innerHTML = `
                <div class="professional-loader">
                    <div class="loader-ring"></div>
                    <div class="loader-ring"></div>
                    <div class="loader-ring"></div>
                    <div class="loader-text">حميد الألمنيوم</div>
                    <div class="loader-subtext">HAMID ALUMINUM</div>
                </div>
            `;

            // Add loader styles
            const style = document.createElement('style');
            style.textContent = `
                .professional-loader {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    margin: 0 auto;
                }
                
                .loader-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 3px solid transparent;
                    border-top: 3px solid #3498db;
                    border-radius: 50%;
                    animation: spin 2s linear infinite;
                }
                
                .loader-ring:nth-child(2) {
                    width: 80%;
                    height: 80%;
                    top: 10%;
                    left: 10%;
                    border-top-color: #e74c3c;
                    animation-duration: 1.5s;
                    animation-direction: reverse;
                }
                
                .loader-ring:nth-child(3) {
                    width: 60%;
                    height: 60%;
                    top: 20%;
                    left: 20%;
                    border-top-color: #f39c12;
                    animation-duration: 1s;
                }
                
                .loader-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -60%);
                    font-family: 'Cairo', Arial, sans-serif;
                    font-weight: 700;
                    font-size: 1rem;
                    color: #2c3e50;
                    text-align: center;
                }
                
                .loader-subtext {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -10%);
                    font-size: 0.7rem;
                    color: #7f8c8d;
                    text-align: center;
                    letter-spacing: 1px;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupCursorEffects() {
        // Create custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(52, 152, 219, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        // Track cursor movement
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });

        // Enhance cursor on hover
        document.querySelectorAll('a, button, .service-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'rgba(52, 152, 219, 0.6)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(52, 152, 219, 0.8)';
            });
        });
    }
}

// Initialize professional animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalAnimations();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfessionalAnimations;
}