// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.querySelector('.nav-list').classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.querySelector('.nav-list').classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler with mailto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create email body
    const emailBody = `
Nouvelle demande de contact depuis le site Boreal Clim

Nom: ${name}
Email: ${email}
Téléphone: ${phone}
Adresse: ${address}

Objet: ${subject}

Message:
${message}

---
Envoyé depuis le formulaire de contact de borealclim.fr
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:borealclim@gmail.com?subject=${encodeURIComponent('Contact site web: ' + subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show message
    setTimeout(() => {
        alert('Votre client email va s\'ouvrir. Si cela ne fonctionne pas, envoyez un email à borealclim@gmail.com');
        contactForm.reset();
    }, 500);
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, features, and other animated elements
const animatedElements = document.querySelectorAll(
    '.service-card, .feature, .contact-item, .stat, .about-text'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add click animation to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: var(--color-primary);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Console message
console.log('%cBoreal Clim', 'color: #4C6FFC; font-size: 24px; font-weight: bold;');
console.log('%cSite web créé avec soin', 'color: #666; font-size: 12px;');

// ========================================
// GOOGLE REVIEWS INTEGRATION
// ========================================

// Fonction appelée par l'API Google Places
window.initGoogleReviews = function() {
    console.log('Google Places API loaded, fetching reviews...');

    const config = window.GOOGLE_CONFIG;

    if (!config || !config.placeId || config.placeId === 'VOTRE_PLACE_ID_GOOGLE') {
        console.warn('Google Place ID not configured properly');
        return;
    }

    // Créer un élément div temporaire pour le service Places
    const map = document.createElement('div');
    const service = new google.maps.places.PlacesService(map);

    // Requête pour obtenir les détails du lieu avec les avis
    const request = {
        placeId: config.placeId,
        fields: ['name', 'rating', 'reviews', 'user_ratings_total']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('Reviews fetched successfully:', place);
            displayGoogleReviews(place.reviews);

            // Mettre à jour le rating dans Schema.org
            updateSchemaRating(place.rating, place.user_ratings_total);
        } else {
            console.error('Error fetching Google reviews:', status);
            console.log('Using fallback reviews');
        }
    });
};

// Fonction pour afficher les avis Google
function displayGoogleReviews(reviews) {
    if (!reviews || reviews.length === 0) {
        console.log('No reviews found, keeping existing ones');
        return;
    }

    // Trier les avis par note (5 étoiles d'abord) puis par date
    const sortedReviews = reviews
        .filter(review => review.rating >= 4) // Garder seulement 4 et 5 étoiles
        .sort((a, b) => b.rating - a.rating || b.time - a.time)
        .slice(0, 6); // Prendre les 6 meilleurs

    if (sortedReviews.length === 0) {
        console.log('No 4-5 star reviews found, keeping existing ones');
        return;
    }

    // Trouver le container des avis
    const testimonialsTrack = document.querySelector('.testimonials-track');
    if (!testimonialsTrack) {
        console.error('Testimonials container not found');
        return;
    }

    // Créer le HTML des nouveaux avis
    let reviewsHTML = '';

    sortedReviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        const authorName = review.author_name || 'Client';
        const text = review.text || 'Excellent service !';

        // Limiter le texte à 200 caractères
        const shortText = text.length > 200 ? text.substring(0, 200) + '...' : text;

        reviewsHTML += `
            <div class="testimonial-card">
                <div class="testimonial-stars">${stars}</div>
                <p class="testimonial-text">"${shortText}"</p>
                <div class="testimonial-author">
                    <strong>${authorName}</strong>
                    <span>Avis Google</span>
                </div>
            </div>
        `;
    });

    // Dupliquer pour le scroll infini
    const duplicateHTML = reviewsHTML;
    testimonialsTrack.innerHTML = reviewsHTML + duplicateHTML;

    console.log(`Displayed ${sortedReviews.length} Google reviews`);
}

// Fonction pour mettre à jour le rating dans Schema.org
function updateSchemaRating(rating, totalReviews) {
    const schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (schemaScript) {
        try {
            const schema = JSON.parse(schemaScript.textContent);
            if (schema.aggregateRating) {
                schema.aggregateRating.ratingValue = rating.toFixed(1);
                schema.aggregateRating.reviewCount = totalReviews.toString();
                schemaScript.textContent = JSON.stringify(schema, null, 2);
                console.log(`Updated Schema.org rating: ${rating} (${totalReviews} reviews)`);
            }
        } catch (e) {
            console.error('Error updating Schema.org rating:', e);
        }
    }
}

// Afficher un message si les avis Google ne sont pas configurés
if (window.GOOGLE_CONFIG) {
    if (!window.GOOGLE_CONFIG.enableRealReviews) {
        console.log('%cℹ️ Avis Google désactivés', 'color: #orange; font-size: 14px;');
        console.log('Pour activer: enableRealReviews: true dans index.html');
    } else if (window.GOOGLE_CONFIG.apiKey === 'VOTRE_CLE_API_GOOGLE') {
        console.log('%c⚠️ Clé API Google non configurée', 'color: #ff6b6b; font-size: 14px;');
        console.log('Consultez GUIDE-GOOGLE-REVIEWS.md pour les instructions');
    } else if (window.GOOGLE_CONFIG.placeId === 'VOTRE_PLACE_ID_GOOGLE') {
        console.log('%c⚠️ Place ID Google non configuré', 'color: #ff6b6b; font-size: 14px;');
        console.log('Consultez GUIDE-GOOGLE-REVIEWS.md pour les instructions');
    }
}

// ========================================
// PARTNERS CAROUSEL
// ========================================

const partnersCarousel = {
    track: document.getElementById('partners-track'),
    prevBtn: document.getElementById('partners-prev'),
    nextBtn: document.getElementById('partners-next'),
    dotsContainer: document.getElementById('partners-dots'),
    currentIndex: 0,
    itemsToShow: 3, // Nombre de logos visibles à la fois
    totalItems: 0,

    init() {
        if (!this.track) return;

        this.totalItems = this.track.children.length;
        this.createDots();
        this.updateCarousel();

        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Responsive
        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
    },

    createDots() {
        const maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Aller à la slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
    },

    updateCarousel() {
        const itemWidth = 250 + 32; // width + gap
        const translateX = -this.currentIndex * itemWidth;
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.totalItems - this.itemsToShow;

        if (this.prevBtn.disabled) {
            this.prevBtn.style.opacity = '0.5';
            this.prevBtn.style.cursor = 'not-allowed';
        } else {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
        }

        if (this.nextBtn.disabled) {
            this.nextBtn.style.opacity = '0.5';
            this.nextBtn.style.cursor = 'not-allowed';
        } else {
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        }
    },

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    },

    next() {
        if (this.currentIndex < this.totalItems - this.itemsToShow) {
            this.currentIndex++;
            this.updateCarousel();
        }
    },

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    },

    handleResize() {
        const width = window.innerWidth;

        if (width < 768) {
            this.itemsToShow = 1;
        } else if (width < 1024) {
            this.itemsToShow = 2;
        } else {
            this.itemsToShow = 3;
        }

        // Recreate dots
        this.dotsContainer.innerHTML = '';
        this.createDots();

        // Reset if currentIndex is out of bounds
        const maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }

        this.updateCarousel();
    }
};

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => partnersCarousel.init());
} else {
    partnersCarousel.init();
}

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

const testimonialsCarousel = {
    track: document.getElementById('testimonials-track'),
    prevBtn: document.getElementById('testimonials-prev'),
    nextBtn: document.getElementById('testimonials-next'),
    dotsContainer: document.getElementById('testimonials-dots'),
    currentIndex: 0,
    itemsToShow: 3, // Nombre d'avis visibles à la fois
    totalItems: 0,

    init() {
        if (!this.track) return;

        this.totalItems = this.track.children.length;
        this.createDots();
        this.updateCarousel();

        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Responsive
        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
    },

    createDots() {
        const maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Aller à la slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
    },

    updateCarousel() {
        const itemWidth = 350 + 48; // width + gap (3rem = 48px)
        const translateX = -this.currentIndex * itemWidth;
        this.track.style.transform = `translateX(${translateX}px)`;

        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.totalItems - this.itemsToShow;

        if (this.prevBtn.disabled) {
            this.prevBtn.style.opacity = '0.5';
            this.prevBtn.style.cursor = 'not-allowed';
        } else {
            this.prevBtn.style.opacity = '1';
            this.prevBtn.style.cursor = 'pointer';
        }

        if (this.nextBtn.disabled) {
            this.nextBtn.style.opacity = '0.5';
            this.nextBtn.style.cursor = 'not-allowed';
        } else {
            this.nextBtn.style.opacity = '1';
            this.nextBtn.style.cursor = 'pointer';
        }
    },

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    },

    next() {
        if (this.currentIndex < this.totalItems - this.itemsToShow) {
            this.currentIndex++;
            this.updateCarousel();
        }
    },

    goTo(index) {
        this.currentIndex = index;
        this.updateCarousel();
    },

    handleResize() {
        const width = window.innerWidth;

        if (width < 768) {
            this.itemsToShow = 1;
        } else if (width < 1024) {
            this.itemsToShow = 2;
        } else {
            this.itemsToShow = 3;
        }

        // Recreate dots
        this.dotsContainer.innerHTML = '';
        this.createDots();

        // Reset if currentIndex is out of bounds
        const maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex;
        }

        this.updateCarousel();
    }
};

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => testimonialsCarousel.init());
} else {
    testimonialsCarousel.init();
}

// ========================================
// HERO SCROLL INDICATOR
// ========================================

const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.getElementById('apropos');
        if (aboutSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ========================================
// LIGHTBOX FUNCTIONALITY
// ========================================

const lightbox = {
    element: document.getElementById('lightbox'),
    image: document.getElementById('lightbox-image'),
    closeBtn: document.getElementById('lightbox-close'),
    prevBtn: document.getElementById('lightbox-prev'),
    nextBtn: document.getElementById('lightbox-next'),
    galleryItems: [],
    currentIndex: 0,

    init() {
        if (!this.element) return;

        // Get all gallery items
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));

        if (this.galleryItems.length === 0) return;

        // Add click listeners to gallery items
        this.galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
        });

        // Close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Click outside to close
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.element.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    },

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.element.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    },

    close() {
        this.element.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    },

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateImage();
    },

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updateImage();
    },

    updateImage() {
        const currentImg = this.galleryItems[this.currentIndex];
        this.image.src = currentImg.src;
        this.image.alt = currentImg.alt;

        // Update button states
        this.updateButtons();
    },

    updateButtons() {
        // Show/hide navigation buttons if there's only one image
        if (this.galleryItems.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
        }
    }
};

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => lightbox.init());
} else {
    lightbox.init();
}
