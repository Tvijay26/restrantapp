document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        const headerHeight = header.offsetHeight;
        let lastScrollPosition = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            
            if (currentScrollPosition <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > headerHeight) {
                header.classList.add('scrolled-down');
                header.classList.remove('scrolled-up');
            } else {
                header.classList.add('scrolled-up');
                header.classList.remove('scrolled-down');
            }
            
            if (currentScrollPosition > 200) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollPosition = currentScrollPosition;
        });
    }

    // Hero Slider
    const heroSlider = () => {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        const dotsContainer = slider.parentElement.querySelector('.slider-dots');
        const prevBtn = slider.parentElement.querySelector('.slider-prev');
        const nextBtn = slider.parentElement.querySelector('.slider-next');
        
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 6000;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.slide = index;
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        const goToSlide = (slideIndex) => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === slideIndex);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            
            currentSlide = slideIndex;
        };
        
        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        };
        
        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        };
        
        const startAutoSlide = () => {
            slideInterval = setInterval(nextSlide, slideDuration);
        };
        
        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };
        
        // Event listeners
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        prevBtn?.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.dataset.slide);
                goToSlide(slideIndex);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            }
        });
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Start the slider
        startAutoSlide();
    };
    heroSlider();

    // Menu Filtering
    const menuFilter = () => {
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                menuTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter items
                const category = tab.dataset.category;
                menuItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'flex';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };
    menuFilter();

    // Gallery Filter and Modal
    const galleryFunctionality = () => {
        const galleryFilterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryModal = document.querySelector('.gallery-modal');
        const modalImg = galleryModal?.querySelector('.modal-img');
        const modalCaption = galleryModal?.querySelector('.modal-caption');
        const closeModal = galleryModal?.querySelector('.close-modal');
        const prevBtn = galleryModal?.querySelector('.prev');
        const nextBtn = galleryModal?.querySelector('.next');
        
        let currentImageIndex = 0;
        let filteredImages = [];
        
        // Filter functionality
        galleryFilterBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Modal functionality
        galleryItems?.forEach((item, index) => {
            const viewBtn = item.querySelector('.view-btn');
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const desc = item.querySelector('p')?.textContent || '';
            
            viewBtn?.addEventListener('click', () => {
                currentImageIndex = index;
                updateModal(img.src, img.alt, title, desc);
                galleryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Update filtered images array based on current filter
                const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
                filteredImages = Array.from(galleryItems)
                    .filter(item => activeFilter === 'all' || item.dataset.category === activeFilter)
                    .map(item => ({
                        src: item.querySelector('img').src,
                        alt: item.querySelector('img').alt,
                        title: item.querySelector('h3')?.textContent || '',
                        desc: item.querySelector('p')?.textContent || ''
                    }));
                
                currentImageIndex = filteredImages.findIndex(imgObj => imgObj.src === img.src);
            });
        });
        
        const updateModal = (src, alt, title, desc) => {
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        };
        
        const navigateModal = (direction) => {
            if (direction === 'prev') {
                currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            } else {
                currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            }
            
            const { src, alt, title, desc } = filteredImages[currentImageIndex];
            updateModal(src, alt, title, desc);
        };
        
        closeModal?.addEventListener('click', () => {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        prevBtn?.addEventListener('click', () => navigateModal('prev'));
        nextBtn?.addEventListener('click', () => navigateModal('next'));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    navigateModal('prev');
                } else if (e.key === 'ArrowRight') {
                    navigateModal('next');
                }
            }
        });
        
        // Close modal when clicking outside
        galleryModal?.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    };
    galleryFunctionality();

    // Testimonials Slider
    const testimonialsSlider = () => {
        const slider = document.querySelector('.testimonials-slider');
        if (!slider) return;
        
        const testimonials = slider.querySelectorAll('.testimonial');
        const dotsContainer = slider.parentElement.querySelector('.testimonial-dots');
        const prevBtn = slider.parentElement.querySelector('.testimonial-prev');
        const nextBtn = slider.parentElement.querySelector('.testimonial-next');
        
        let currentTestimonial = 0;
        let autoSlideInterval;
        const slideDuration = 8000;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.testimonial = index;
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        const goToTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentTestimonial = index;
        };
        
        const nextTestimonial = () => {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            goToTestimonial(nextIndex);
        };
        
        const prevTestimonial = () => {
            const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            goToTestimonial(prevIndex);
        };
        
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextTestimonial, slideDuration);
        };
        
        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };
        
        // Event listeners
        nextBtn?.addEventListener('click', () => {
            nextTestimonial();
            stopAutoSlide();
            startAutoSlide();
        });
        
        prevBtn?.addEventListener('click', () => {
            prevTestimonial();
            stopAutoSlide();
            startAutoSlide();
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const testimonialIndex = parseInt(dot.dataset.testimonial);
                goToTestimonial(testimonialIndex);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Start the slider
        startAutoSlide();
    };
    testimonialsSlider();

    // Animate Stats Counter
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat .number');
        if (!stats.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.dataset.count);
                    const duration = 2000;
                    const start = 0;
                    const increment = target / (duration / 16);
                    
                    let current = start;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        stat.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    };
    animateStats();

    // Reservation Form
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            if (!name || !email || !phone || !date || !time || !guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const modal = document.getElementById('reservationModal');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Reset form
            reservationForm.reset();
        });
        
        // Close modal
        const closeModal = document.querySelector('.close-modal');
        const closeReservationModal = document.querySelector('.close-reservation-modal');
        
        const closeModalFunc = () => {
            const modal = document.getElementById('reservationModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        
        closeModal?.addEventListener('click', closeModalFunc);
        closeReservationModal?.addEventListener('click', closeModalFunc);
        
        // Close when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('reservationModal');
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Set minimum date for reservation (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = `${yyyy}-${mm}-${dd}`;
        
        dateInput.min = minDate;
    }

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 50 && 
                window.pageYOffset < sectionTop + sectionHeight - headerHeight - 50) {
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

    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link?.addEventListener('click', (e) => {
            if (window.innerWidth > 992) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 992) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        }
    });

    // Initialize AOS (Animate On Scroll) if you decide to add it later
    // AOS.init();
});