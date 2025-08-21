// Hero Slider Functionality
class HeroSlider {
    private slides: NodeListOf<Element>;
    private indicators: NodeListOf<Element>;
    private currentSlide = 0;
    private slideInterval: number | null = null;

    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.init();
    }

    init() {
        // Add event listeners to indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Start auto-play
        this.startAutoPlay();

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
            heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(slideIndex: number) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Update current slide index
        this.currentSlide = slideIndex;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoPlay() {
        this.slideInterval = window.setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Mobile Menu Functionality
class MobileMenu {
    private toggle: Element | null;
    private menu: Element | null;
    private isOpen = false;

    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.nav-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle?.contains(e.target as Node) && !this.menu?.contains(e.target as Node)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const menuElement = this.menu as HTMLElement;
        if (menuElement) {
            menuElement.style.setProperty('display', 'flex');
        }
        this.isOpen = true;

        // Change hamburger to close icon
        const icon = this.toggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
    }

    closeMenu() {
        const menuElement = this.menu as HTMLElement;
        if (menuElement) {
            menuElement.style.setProperty('display', 'none');
        }
        this.isOpen = false;

        // Change close icon back to hamburger
        const icon = this.toggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}

// Form Handling
class FormHandler {
    private form: Element | null;

    constructor() {
        this.form = document.querySelector('.consultation-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // Setup WhatsApp links
        this.setupWhatsAppLinks();
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        const data: { [key: string]: string } = {};

        // Get form data
        const inputs = this.form?.querySelectorAll('input, select');
        inputs?.forEach((input: any) => {
            if (input.name || input.placeholder) {
                const key = input.name || input.placeholder;
                data[key] = input.value;
            }
        });

        // Create WhatsApp message
        const message = this.createWhatsAppMessage(data);

        // Open WhatsApp
        const whatsappUrl = `https://api.whatsapp.com/send?phone=573209516522&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    createWhatsAppMessage(data: { [key: string]: string }): string {
        let message = 'Hola, me gustaría agendar una cita de valoración.\n\n';
        message += 'Mis datos son:\n';

        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                message += `${key}: ${value}\n`;
            }
        });

        message += '\nGracias por su atención.';
        return message;
    }

    setupWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('a[href="#"]');
        whatsappLinks.forEach(link => {
            const text = link.textContent?.toLowerCase();
            if (text?.includes('agenda') || text?.includes('cita') || text?.includes('whatsapp')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const message = 'Hola, me gustaría agendar una cita de valoración.';
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=573209516522&text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                });
            }
        });

        // Setup floating WhatsApp button
        const floatingBtn = document.querySelector('.whatsapp-btn');
        if (floatingBtn) {
            floatingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const message = 'Hola, me gustaría obtener más información sobre sus servicios.';
                const whatsappUrl = `https://api.whatsapp.com/send?phone=573209516522&text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            });
        }
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerHeight = document.querySelector('.header')?.clientHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    private observer: IntersectionObserver;

    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll(
            '.procedure-card, .clinic-text, .team-text, .infrastructure-images'
        );

        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    private header: Element | null;

    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (this.header) {
            if (currentScrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Trigger initial animations
            setTimeout(() => {
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.classList.add('animate-in');
                }
            }, 300);
        });
    }
}

// Phone Number Formatting
class PhoneFormatter {
    constructor() {
        this.init();
    }

    init() {
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => this.formatPhone(e));
        });
    }

    formatPhone(e: Event) {
        const input = e.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');

        // Format based on length
        if (value.length >= 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        } else if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})/, '$1 $2');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})/, '$1');
        }

        input.value = value;
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    new MobileMenu();
    new FormHandler();
    new SmoothScroll();
    new AnimationObserver();
    new HeaderScroll();
    new LoadingAnimation();
    new PhoneFormatter();

    console.log('Clínica Obesidad y Envejecimiento website loaded successfully!');
});

// Add some additional CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }

    .header.scrolled:hover {
        transform: translateY(0);
    }

    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }

    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .whatsapp-btn {
        animation: pulse 2s infinite;
    }

    .procedure-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .procedure-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
