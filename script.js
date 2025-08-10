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
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Always initialize mobile app functionality (CSS will handle display)
    initializeMobileApp();
    
    // Handle hash navigation for mobile (when coming from service pages)
    if (isMobile) {
        const hash = window.location.hash.substring(1); // Remove the #
        if (hash) {
            // Wait for mobile app to initialize, then switch to the target screen
            setTimeout(() => {
                const targetScreen = document.getElementById(`mobile-${hash}`);
                const targetNavItem = document.querySelector(`[data-target="${hash}"]`);
                
                if (targetScreen && targetNavItem) {
                    // Switch to target screen
                    document.querySelectorAll('.mobile-screen').forEach(screen => {
                        screen.classList.remove('active');
                    });
                    targetScreen.classList.add('active');
                    
                    // Update active nav item
                    document.querySelectorAll('.mobile-nav-item').forEach(nav => {
                        nav.classList.remove('active');
                    });
                    targetNavItem.classList.add('active');
                }
            }, 200); // Give time for mobile app to initialize
        }
    }
    
    if (!isMobile) {
        // Desktop Menu Functionality
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    function initializeMobileApp() {
        // Wait a moment for DOM to be fully ready
        setTimeout(() => {
            // Mobile Bottom Navigation
            const navItems = document.querySelectorAll('.mobile-nav-item');
            const screens = document.querySelectorAll('.mobile-screen');
            
            // Check if we're on a service page (no mobile screens) or main page (has mobile screens)
            const isServicePage = screens.length === 0;
            
            if (navItems.length === 0) {
                console.warn('Mobile navigation not found, retrying in 100ms...');
                setTimeout(initializeMobileApp, 100);
                return;
            }
            
            if (isServicePage) {
                // Handle navigation from service pages - redirect to main page
                navItems.forEach(item => {
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const target = this.dataset.target;
                        if (target) {
                            // Redirect to main page with target section
                            window.location.href = `index.html#${target}`;
                        }
                    });
                });
                return; // Exit early for service pages
            }
            
            // Main page functionality (has mobile screens)
            if (screens.length === 0) {
                console.warn('Mobile screens not found, retrying in 100ms...');
                setTimeout(initializeMobileApp, 100);
                return;
            }
            
            // Make sure home screen is active by default
            const homeScreen = document.getElementById('mobile-home');
            if (homeScreen) {
                homeScreen.classList.add('active');
            }
            
            // Ensure first nav item is active
            if (navItems.length > 0) {
                navItems[0].classList.add('active');
            }
            
            navItems.forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const target = this.dataset.target;
                    if (target) {
                        switchMobileScreen(target);
                        
                        // Update active nav item
                        navItems.forEach(nav => nav.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });
            
            function switchMobileScreen(target) {
                screens.forEach(screen => {
                    screen.classList.remove('active');
                    if (screen.id === `mobile-${target}`) {
                        screen.classList.add('active');
                    }
                });
            }
        
        // Mobile Hero - No carousel needed anymore
        
            // Quick Actions
            const quickActions = document.querySelectorAll('.quick-action');
            
            quickActions.forEach(action => {
                action.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const target = this.dataset.target;
                    if (target) {
                        switchMobileScreen(target);
                        
                        // Update nav
                        navItems.forEach(nav => nav.classList.remove('active'));
                        const targetNav = document.querySelector(`.mobile-nav-item[data-target="${target}"]`);
                        if (targetNav) {
                            targetNav.classList.add('active');
                        }
                    }
                });
            });
        
        // Mobile Service Cards
        const serviceCards = document.querySelectorAll('.mobile-service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const service = this.dataset.service;
                // Navigate to appropriate service page
                switch(service) {
                    case 'video':
                        window.location.href = 'video-production.html';
                        break;
                    case 'photo':
                        window.location.href = 'photography.html';
                        break;
                    case 'drone':
                        window.location.href = 'drone-services.html';
                        break;
                    case 'marketing':
                        window.location.href = 'marketing-services.html';
                        break;
                }
            });
        });
        
        // Mobile Portfolio Tabs
        const portfolioTabs = document.querySelectorAll('.mobile-tab');
        const portfolioGrid = document.querySelector('.mobile-portfolio-grid');
        
        portfolioTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // If photo tab is clicked, redirect to clementho.com
                if (category === 'photo') {
                    window.open('https://www.clementho.com/', '_blank');
                    return;
                }
                
                portfolioTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                loadPortfolioItems(category);
            });
        });
        
        function loadPortfolioItems(category) {
            // Portfolio with videos and photos only
            const portfolioItems = {
                video: [
                    { type: 'video', title: 'Showreel - Video Production Showcase', videoId: '4-A-rvIuUHc', featured: true },
                    { type: 'video', title: 'REDACTED', videoId: 'RQbGV7NhxBI' },
                    { type: 'video', title: 'Promotional Video', videoId: 'bRdHr1kd1_Y' },
                    { type: 'video', title: 'One Ride', videoId: '96EA9VVWSk0' },
                    { type: 'video', title: 'Visitor', videoId: 'YZqgtrkMFF0' },
                    { type: 'video', title: 'Commercial', videoId: 'jpmrES95lM4' },
                    { type: 'video', title: 'Event Coverage', videoId: 'SHssPH4AHEw' },
                    { type: 'video', title: 'Behind the Scenes', videoId: 'TXzSUqoOayI' },
                    { type: 'video', title: 'Product Showcase', videoId: 'Lm0ztWIkhyc' },
                    { type: 'video', title: 'Real Estate', videoId: 'pOwgcCc3vLk' }
                ],
                photo: [
                    { type: 'photo', title: 'Photography Work', image: 'assets/bts-2.jpg' },
                    { type: 'photo', title: 'Portrait Sessions', image: 'assets/bts-5.jpg' }
                ]
            };
            
            const items = portfolioItems[category] || portfolioItems.video;
            
            if (portfolioGrid) {
                portfolioGrid.innerHTML = items.map(item => {
                    if (item.videoId) {
                        // YouTube video thumbnail (clickable, not playable)
                        const featuredClass = item.featured ? ' mobile-featured-video' : '';
                        const featuredBadge = item.featured ? '<div class="featured-badge">🎬 SHOWREEL</div>' : '';
                        
                        return `
                            <div class="mobile-portfolio-item mobile-video-item${featuredClass}" onclick="window.open('https://www.youtube.com/watch?v=${item.videoId}', '_blank')">
                                <div class="mobile-video-wrapper">
                                    <img 
                                        src="https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg"
                                        alt="${item.title}"
                                        loading="lazy">
                                    <div class="video-play-overlay">
                                        <i class="fas fa-play"></i>
                                    </div>
                                </div>
                                ${featuredBadge}
                                <div class="mobile-portfolio-overlay">
                                    <h4>${item.title}</h4>
                                    <p>Click to watch on YouTube</p>
                                </div>
                            </div>
                        `;
                    } else {
                        // Image item
                        return `
                            <div class="mobile-portfolio-item">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                                <div class="mobile-portfolio-overlay">
                                    <h4>${item.title}</h4>
                                </div>
                            </div>
                        `;
                    }
                }).join('');
            }
        }
        
        // Load initial portfolio items (video tab is now default)
        loadPortfolioItems('video');
        

        
        // Mobile Awards Carousel Touch Scroll
        const awardsCarousel = document.querySelector('.mobile-awards-carousel');
        if (awardsCarousel) {
            let isScrolling = false;
            let startX = 0;
            let scrollLeft = 0;
            
            awardsCarousel.addEventListener('touchstart', (e) => {
                isScrolling = true;
                startX = e.touches[0].pageX - awardsCarousel.offsetLeft;
                scrollLeft = awardsCarousel.scrollLeft;
            });
            
            awardsCarousel.addEventListener('touchmove', (e) => {
                if (!isScrolling) return;
                e.preventDefault();
                const x = e.touches[0].pageX - awardsCarousel.offsetLeft;
                const walk = (x - startX) * 2;
                awardsCarousel.scrollLeft = scrollLeft - walk;
            });
            
            awardsCarousel.addEventListener('touchend', () => {
                isScrolling = false;
            });
        }
        
        // Add mobile portfolio item styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-portfolio-item {
                position: relative;
                aspect-ratio: 1;
                border-radius: 10px;
                overflow: hidden;
                cursor: pointer;
            }
            
            .mobile-portfolio-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .mobile-portfolio-item:hover img {
                transform: scale(1.1);
            }
            
            .mobile-portfolio-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.8));
                padding: 20px 15px 15px;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            
            .mobile-portfolio-item:hover .mobile-portfolio-overlay {
                transform: translateY(0);
            }
            
            .mobile-portfolio-overlay h4 {
                color: white;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.9rem;
                margin: 0;
            }
        `;
        document.head.appendChild(style);
        
        }, 10); // End of setTimeout
    } // End of initializeMobileApp

    // Video background handling
    const video = document.getElementById('background-video');
    if (video) {
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
        });
    }

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
    
    if (track && prevButton && nextButton) {
        function updateBTSCarousel() {
            const items = track.querySelectorAll('.bts-item');
            const itemWidth = items[0].offsetWidth;
            const visibleWidth = track.offsetWidth;
            const totalWidth = itemWidth * items.length;
            let currentPosition = track.scrollLeft;

            // Enable/disable buttons based on scroll position
            prevButton.style.opacity = currentPosition <= 0 ? '0.5' : '1';
            nextButton.style.opacity = currentPosition >= totalWidth - visibleWidth ? '0.5' : '1';
        }

        function scrollBTS(direction) {
            const items = track.querySelectorAll('.bts-item');
            const itemWidth = items[0].offsetWidth;
            const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
            
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            setTimeout(updateBTSCarousel, 300);
        }

        // Initial setup
        updateBTSCarousel();

        // Event listeners
        prevButton.addEventListener('click', () => scrollBTS('left'));
        nextButton.addEventListener('click', () => scrollBTS('right'));
        track.addEventListener('scroll', updateBTSCarousel);

    // Handle touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            scrollBTS('right');
        } else if (touchEndX - touchStartX > 50) {
            scrollBTS('left');
        }
    }, false);
    }

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
