/**
 * Hamid Aluminum - Professional E-Commerce Website
 * Main JavaScript File
 * Features: Modern ES6+, Professional animations, Mobile responsive
 */

class HamidAluminumApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.initializeLoading();
        this.initializeScrollAnimations();
        this.initializeNavigation();
        this.initializeMobileMenu();
        this.initializeCart();
        this.initializeSearch();
    }

    init() {
        console.log('🚀 Hamid Aluminum E-Commerce Website Initialized');
        
        // Set up app state
        this.state = {
            cart: JSON.parse(localStorage.getItem('hamid-aluminum-cart')) || [],
            user: JSON.parse(localStorage.getItem('hamid-aluminum-user')) || null,
            isLoading: true,
            isMobileMenuOpen: false,
            isCartOpen: false
        };

        // Update cart count on load
        this.updateCartCount();
    }

    bindEvents() {
        // Loading screen
        window.addEventListener('load', () => this.hideLoading());
        
        // Navigation scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });
    }

    initializeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Hide loading screen after minimum time
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hide');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
            this.state.isLoading = false;
        }, 1500);
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && !this.state.isLoading) {
            loadingScreen.classList.add('hide');
        }
    }

    initializeScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to animated elements
        document.querySelectorAll('.feature-card, .product-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    initializeNavigation() {
        const header = document.getElementById('header');
        
        // Add scrolled class to header on scroll
        this.handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // Active navigation link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (scrollY >= sectionTop) {
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
    }

    initializeMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const overlay = document.getElementById('overlay');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeMobileMenu();
                this.closeCart();
            });
        }
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const overlay = document.getElementById('overlay');
        const mobileToggle = document.getElementById('mobileMenuToggle');

        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;

        if (this.state.isMobileMenuOpen) {
            navMenu.classList.add('mobile-active');
            overlay.classList.add('active');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const overlay = document.getElementById('overlay');
        const mobileToggle = document.getElementById('mobileMenuToggle');

        this.state.isMobileMenuOpen = false;
        navMenu.classList.remove('mobile-active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    initializeCart() {
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');
        const overlay = document.getElementById('overlay');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }

        // Initialize cart display
        this.updateCartDisplay();
    }

    toggleCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('overlay');

        this.state.isCartOpen = !this.state.isCartOpen;

        if (this.state.isCartOpen) {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.updateCartDisplay();
        } else {
            this.closeCart();
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('overlay');

        this.state.isCartOpen = false;
        cartSidebar.classList.remove('active');
        
        if (!this.state.isMobileMenuOpen) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    addToCart(product) {
        const existingItem = this.state.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.state.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.state.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('hamid-aluminum-cart', JSON.stringify(this.state.cart));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    updateCartDisplay() {
        const cartContent = document.getElementById('cartContent');
        const emptyCart = document.getElementById('emptyCart');
        const cartFooter = document.getElementById('cartFooter');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartContent) return;

        if (this.state.cart.length === 0) {
            emptyCart.style.display = 'block';
            cartFooter.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartFooter.style.display = 'block';

        // Calculate total
        const total = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        // Generate cart HTML
        const cartHTML = this.state.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" onclick="app.updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="app.updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="app.removeFromCart('${item.id}')">×</button>
                    </div>
                </div>
            </div>
        `).join('');

        cartContent.innerHTML = cartHTML;
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.querySelector('.search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) return;

        console.log('Searching for:', query);
        // Implement search functionality here
        this.showNotification(`Searching for: ${query}`, 'info');
        
        // In a real app, this would make an API call
        // For now, we'll just filter visible products
        this.filterProducts(query);
    }

    filterProducts(query) {
        const productCards = document.querySelectorAll('.product-card');
        const searchTerm = query.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.product-description')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('search-match');
            } else {
                card.style.display = 'none';
                card.classList.remove('search-match');
            }
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (this.state.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            font-family: var(--font-secondary);
            font-size: 14px;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.state.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // Utility functions
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // API simulation methods (in real app, these would make HTTP requests)
    async loadProducts() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample product data
        return [
            {
                id: '1',
                name: 'Aluminum Sheet 6061-T6',
                description: 'High-quality aluminum sheet perfect for structural applications',
                price: 45.99,
                image: 'assets/images/products/aluminum-sheet.jpg',
                category: 'sheets'
            },
            {
                id: '2',
                name: 'Aluminum Extrusion Profile',
                description: 'Custom aluminum extrusion profile for industrial use',
                price: 32.50,
                image: 'assets/images/products/extrusion-profile.jpg',
                category: 'profiles'
            },
            {
                id: '3',
                name: 'Aluminum Tube Round',
                description: 'Round aluminum tube with excellent corrosion resistance',
                price: 28.75,
                image: 'assets/images/products/aluminum-tube.jpg',
                category: 'tubes'
            },
            {
                id: '4',
                name: 'Custom Aluminum Solution',
                description: 'Tailored aluminum fabrication for your specific needs',
                price: 150.00,
                image: 'assets/images/products/custom-solution.jpg',
                category: 'custom'
            }
        ];
    }

    async displayProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        try {
            const products = await this.loadProducts();
            
            const productsHTML = products.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">$${product.price}</div>
                        <div class="product-actions">
                            <button class="btn btn-outline" onclick="app.viewProduct('${product.id}')">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn btn-primary" onclick="app.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            productsGrid.innerHTML = productsHTML;
        } catch (error) {
            console.error('Error loading products:', error);
            productsGrid.innerHTML = '<p class="error-message">Error loading products. Please try again later.</p>';
        }
    }

    viewProduct(productId) {
        console.log('Viewing product:', productId);
        this.showNotification('Product details coming soon!', 'info');
    }

    // Initialize the app when DOM is ready
    static init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.app = new HamidAluminumApp();
                window.app.displayProducts();
            });
        } else {
            window.app = new HamidAluminumApp();
            window.app.displayProducts();
        }
    }
}

// Auto-initialize the app
HamidAluminumApp.init();

// Export for module systems
if (typeof module !== '' && module.exports) {
    module.exports = HamidAluminumApp;
}