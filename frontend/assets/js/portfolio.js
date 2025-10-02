/**
 * Hamid Aluminum Portfolio Gallery
 * Manages portfolio display and filtering functionality
 */

class PortfolioGallery {
    constructor() {
        this.portfolioItems = [
            {
                id: 1,
                title: "خزائن حمام فاخرة",
                titleEn: "Luxury Bathroom Vanity",
                description: "خزانة حمام فاخرة بأفضل خامات الألمنيوم والخشب، تجمع بين الجمال والعملية",
                category: "custom",
                image: "assets/images/portfolio/1.png",
                year: "2024"
            },
            {
                id: 2,
                title: "خزانة ملابس ",
                titleEn: " Wardrobe with Islamic Design",
                description: "خزانة ملابس عصرية متطورة وزخارف إسلامية أنيقة",
                category: "doors",
                image: "assets/images/portfolio/2.jpg",
                year: "2025"
            },
            {
                id: 3,
                title: "خزانة ملابس بزخرفة أنيقة",
                titleEn: "Elegant Wardrobe with Decorative Pattern",
                description: "خزانة ملابس أنيقة بزخرفة عربية تراثية مع أبواب منزلقة",
                category: "doors",
                image: "assets/images/portfolio/3.png",
                year: "2023"
            },
            {
                id: 4,
                title: "كابينة دوش زجاجية فاخرة",
                titleEn: "Luxury Glass Shower Cabin",
                description: "كابينة دوش من الزجاج المقسى والألمنيوم عالي الجودة",
                category: "doors",
                image: "assets/images/portfolio/4.png",
                year: "2019"
            },
            {
                id: 5,
                title: "خزانة مطبخ حديثة",
                titleEn: "Modern Kitchen Cabinet",
                description: "خزانة مطبخ عملية وعصرية، مصنوعة من أجود خامات الخشب والألمنيوم، مناسبة لكل مطبخ",
                category: "custom",
                image: "assets/images/portfolio/5.png",
                year: "2025"
            },
            {
                id: 6,
                title: "خزائن حمام فاخرة",
                titleEn: "Luxury Bathroom Vanity",
                description: "خزانة حمام فاخرة بأفضل خامات الألمنيوم والخشب، تجمع بين الجمال والعملية",
                category: "custom",
                image: "assets/images/portfolio/6.png",
                year: "2024"
            },
            {
                id: 7,
                title: "واجهة ألمنيوم حديثة",
                titleEn: "Modern Aluminum Interface",
                description: "تصميم واجهة عصرية باستخدام ألمنيوم عالي الجودة، يجمع بين الجمالية والمتانة لأي مشروع",
                category: "facades",
                image: "assets/images/portfolio/7.png",
                year: "2018"
            },
            {
                id: 8,
                title: "نافذة ألمنيوم عصرية",
                titleEn: "Modern Aluminum Window",
                description: "تصميم نافذة عصرية مصنوعة من ألمنيوم عالي الجودة، توفر الإضاءة والتهوية بطريقة أنيقة وعملية",
                category: "windows",
                image: "assets/images/portfolio/8.png",
                year: "2019"
            },
            {
                id: 9,
                title: "خزائن حمام فاخرة",
                titleEn: "Luxury Bathroom Vanity",
                description: "خزانة حمام فاخرة بأفضل خامات الألمنيوم والخشب، تجمع بين الجمال والعملية",
                category: "custom",
                image: "assets/images/portfolio/9.png",
                year: "2025"
            },
            {
                id: 10,
                title: "باب ألمنيوم عصري",
                titleEn: "Modern Aluminum Door",
                description: "تصميم باب عصري مصنوع من ألمنيوم عالي الجودة، يجمع بين المتانة والأناقة لمختلف المشاريع",
                category: "doors",
                image: "assets/images/portfolio/10.png",
                year: "2022"
            },
            {
                id: 11,
                title: "باب ألمنيوم عصري",
                titleEn: "Modern Aluminum Door",
                description: "تصميم باب عصري مصنوع من ألمنيوم عالي الجودة، يجمع بين المتانة والأناقة لمختلف المشاريع",
                category: "doors",
                image: "assets/images/portfolio/11.png",
                year: "2022"
            },
            {
                id: 12,
                title: "باب ألمنيوم عصري",
                titleEn: "Modern Aluminum Door",
                description: "تصميم باب عصري مصنوع من ألمنيوم عالي الجودة، يجمع بين المتانة والأناقة لمختلف المشاريع",
                category: "doors",
                image: "assets/images/portfolio/12.png",
                year: "2022"
            }
        ];

        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderPortfolio();
        this.bindEvents();
        this.initializeAnimations();
    }

    bindEvents() {
        // Portfolio filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterPortfolio(filter);
            });
        });

        // Portfolio item click events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-item')) {
                const item = e.target.closest('.portfolio-item');
                const itemId = parseInt(item.getAttribute('data-id'));
                this.openPortfolioModal(itemId);
            }
        });
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Filter and render items
        this.renderPortfolio();
        
        // Animate filtered items
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item').forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('filter-animation');
            });
        }, 100);
    }

    renderPortfolio() {
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (!portfolioGrid) return;

        const filteredItems = this.currentFilter === 'all' 
            ? this.portfolioItems 
            : this.portfolioItems.filter(item => item.category === this.currentFilter);

        portfolioGrid.innerHTML = filteredItems.map(item => this.createPortfolioItemHTML(item)).join('');

        // Add fade-in animation class
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }, 50);
    }

    createPortfolioItemHTML(item) {
        return `
            <div class="portfolio-item fade-in" data-id="${item.id}" data-category="${item.category}">
                <div class="portfolio-image">
                    <img src="${item.image}" alt="${item.title}">
                        <div class="portfolio-overlay">
                        <i class="fas fa-search-plus"></i>
                        <span>عرض التفاصيل</span>
                    </div>
                </div>
                <div class="portfolio-content">
                    <span class="portfolio-category">${this.getCategoryName(item.category)}</span>
                    <h3 class="portfolio-title">${item.title}</h3>
                    <p class="portfolio-title-en">${item.titleEn}</p>
                    <p class="portfolio-description">${item.description}</p>
                    <div class="portfolio-meta">
                        <span class="portfolio-location">
                            <i class="fas fa-map-marker-alt"></i> ${item.location}
                        </span>
                        <span class="portfolio-year">
                            <i class="fas fa-calendar"></i> ${item.year}
                        </span>
                    </div>
                    <a href="https://wa.me/212637891724?text=مرحباً، أريد الاستفسار عن ${item.title}" 
                       class="portfolio-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> استفسر عن مشروع مماثل
                    </a>
                </div>
            </div>
        `;
    }

    getCategoryName(category) {
        const categoryNames = {
            'windows': 'نوافذ',
            'doors': 'أبواب',
            'facades': 'واجهات',
            'structures': 'هياكل',
            'custom': 'أعمال خاصة'
        };
        return categoryNames[category] || category;
    }

    openPortfolioModal(itemId) {
        const item = this.portfolioItems.find(p => p.id === itemId);
        if (!item) return;

        // Create modal overlay if it doesn't exist
        let modal = document.getElementById('portfolioModal');
        if (!modal) {
            modal = this.createPortfolioModal();
            document.body.appendChild(modal);
        }

        // Update modal content
        this.updateModalContent(modal, item);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createPortfolioModal() {
        const modal = document.createElement('div');
        modal.id = 'portfolioModal';
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-body">
                    <!-- Content will be dynamically inserted -->
                </div>
            </div>
        `;

        // Bind close events
        modal.querySelector('.modal-close').addEventListener('click', () => this.closePortfolioModal());
        modal.querySelector('.modal-overlay').addEventListener('click', () => this.closePortfolioModal());

        return modal;
    }

    updateModalContent(modal, item) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="modal-info">
                <span class="modal-category">${this.getCategoryName(item.category)}</span>
                <h2 class="modal-title">${item.title}</h2>
                <h3 class="modal-title-en">${item.titleEn}</h3>
                <p class="modal-description">${item.description}</p>
                <div class="modal-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>الموقع: ${item.location}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>السنة: ${item.year}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tag"></i>
                        <span>النوع: ${this.getCategoryName(item.category)}</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="https://wa.me/212637891724?text=مرحباً، أريد الاستفسار عن ${item.title} في ${item.location}" 
                       class="btn btn-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i> استفسر عن مشروع مماثل
                    </a>
                    <a href="https://wa.me/212637891724?text=أريد طلب عرض سعر لمشروع مماثل لـ ${item.title}" 
                       class="btn btn-outline" target="_blank">
                        <i class="fas fa-calculator"></i> طلب عرض سعر
                    </a>
                </div>
            </div>
        `;
    }

    closePortfolioModal() {
        const modal = document.getElementById('portfolioModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    initializeAnimations() {
        // Add CSS for modal
        if (!document.getElementById('portfolioModalStyles')) {
            const styles = document.createElement('style');
            styles.id = 'portfolioModalStyles';
            styles.textContent = `
                .portfolio-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }

                .portfolio-modal.active {
                    opacity: 1;
                    visibility: visible;
                }

                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                }

                .modal-content {
                    position: relative;
                    background: white;
                    border-radius: 20px;
                    max-width: 90%;
                    max-height: 90%;
                    overflow-y: auto;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                }

                .portfolio-modal.active .modal-content {
                    transform: scale(1);
                }

                .modal-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 1001;
                    transition: background 0.3s ease;
                }

                .modal-close:hover {
                    background: rgba(0,0,0,0.8);
                }

                .modal-body {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                    min-height: 500px;
                }

                .modal-image {
                    background: linear-gradient(45deg, #bdc3c7, #ecf0f1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px 0 0 20px;
                }

                .placeholder-image {
                    text-align: center;
                    color: #7f8c8d;
                }

                .placeholder-image i {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    display: block;
                }

                .modal-info {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .modal-category {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    display: inline-block;
                    margin-bottom: 20px;
                    width: fit-content;
                }

                .modal-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 10px;
                    font-family: 'Cairo', Arial, sans-serif;
                }

                .modal-title-en {
                    font-size: 1.3rem;
                    font-weight: 300;
                    color: #7f8c8d;
                    margin-bottom: 20px;
                }

                .modal-description {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #5d6d7e;
                    margin-bottom: 30px;
                }

                .modal-details {
                    margin-bottom: 30px;
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    font-size: 1rem;
                    color: #34495e;
                }

                .detail-item i {
                    margin-left: 10px;
                    color: #3498db;
                    width: 20px;
                }

                .modal-actions {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .portfolio-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(52, 152, 219, 0.9);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    cursor: pointer;
                }

                .portfolio-item:hover .portfolio-overlay {
                    opacity: 1;
                }

                .portfolio-overlay i {
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                .portfolio-whatsapp {
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    padding: 10px 15px;
                    border-radius: 20px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    margin-top: 15px;
                }

                .portfolio-whatsapp:hover {
                    background: linear-gradient(135deg, #128C7E, #075E54);
                    transform: translateY(-2px);
                    color: white;
                }

                .portfolio-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #ecf0f1;
                    font-size: 0.9rem;
                    color: #7f8c8d;
                }

                .portfolio-title-en {
                    font-size: 1rem;
                    font-weight: 300;
                    color: #95a5a6;
                    margin-bottom: 10px;
                }

                @media (max-width: 768px) {
                    .modal-body {
                        grid-template-columns: 1fr;
                    }
                    
                    .modal-image {
                        border-radius: 20px 20px 0 0;
                        min-height: 200px;
                    }
                    
                    .modal-info {
                        padding: 30px 20px;
                    }
                    
                    .modal-actions {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('portfolioGrid')) {
        new PortfolioGallery();
    }
});
