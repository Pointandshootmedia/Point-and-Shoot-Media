// Smooth scroll handler
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Video background handling
    const video = document.getElementById('background-video');
    video.play().catch(function(error) {
        console.log("Video autoplay failed:", error);
    });

    // Portfolio Navigation
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const prevBtn = document.querySelector('.portfolio-nav.prev');
    const nextBtn = document.querySelector('.portfolio-nav.next');
    const scrollAmount = 450; // Slightly more than item width to account for gap

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            portfolioGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });

    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.play-button').style.opacity = '1';
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.play-button').style.opacity = '0';
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Service cards animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add initial animation delay based on position
        const delay = Array.from(serviceCards).indexOf(card) * 0.2;
        card.style.animationDelay = `${delay}s`;
        
        // Add hover effect for icons
        const icon = card.querySelector('.service-icon i');
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
            icon.style.textShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            icon.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        });
    });

    // Learn more buttons handled by regular link navigation

    // BTS Carousel
    const track = document.querySelector('.bts-track');
    const prevButton = document.querySelector('.bts-nav.prev');
    const nextButton = document.querySelector('.bts-nav.next');
    const itemWidth = 400; // Width of each item including gap
    
    if (!track || !prevButton || !nextButton) return;

    function scroll(direction) {
        const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    prevButton.addEventListener('click', () => scroll('left'));
    nextButton.addEventListener('click', () => scroll('right'));

    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            scroll('right');
        } else if (touchEndX - touchStartX > 50) {
            scroll('left');
        }
    }, false);

    // Photo Carousel
    const photoTrack = document.querySelector('.photo-track');
    const photoPrevButton = document.querySelector('.photo-carousel .nav-btn.prev');
    const photoNextButton = document.querySelector('.photo-carousel .nav-btn.next');
    const photoItemWidth = photoTrack ? photoTrack.querySelector('.photo-item').offsetWidth + 20 : 400; // Width + gap
    
    if (photoTrack && photoPrevButton && photoNextButton) {
        function scrollPhotos(direction) {
            const scrollAmount = direction === 'left' ? -photoItemWidth : photoItemWidth;
            photoTrack.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }

        photoPrevButton.addEventListener('click', () => scrollPhotos('left'));
        photoNextButton.addEventListener('click', () => scrollPhotos('right'));

        // Handle touch events for mobile swipe
        photoTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        photoTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                scrollPhotos('right');
            } else if (touchEndX - touchStartX > 50) {
                scrollPhotos('left');
            }
        }, false);
    }
}); 
