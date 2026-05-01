document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current if not active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial styles and observe
    const animElements = document.querySelectorAll('.feature-card, .plan-card, .testimonial-card, .why-us-text, .why-us-image, .service-card, .trust-stat');
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 4. Form Submission & WhatsApp Redirect
    const quoteBtn = document.getElementById('quoteBtn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;
            const city = document.getElementById("city").value;
            const phone = document.getElementById("phone").value;

            if (!age || !gender || !city || !phone) {
                alert("Please fill all details");
                return;
            }

            // Simple validation
            if (phone.length < 10) {
                alert("Please enter a valid phone number");
                return;
            }

            const message = `Hello, I would like to get an insurance quote:\n\nAge: ${age}\nGender: ${gender}\nCity: ${city}\nPhone: ${phone}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/916382560104?text=${encodedMessage}`;

            window.open(whatsappURL, "_blank");
        });
    }

    // 5. Horizontal Scroll buttons (Optional improvement)
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    if (scrollContainer) {
        // Smooth scrolling for add-ons logic can be added here if needed
        // For now, native touch/mouse scroll is enabled
    }

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const megaMenuContainer = document.querySelector('.mega-menu-container');
    
    if (mobileMenuBtn && megaMenuContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            megaMenuContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (megaMenuContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        megaMenuContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                megaMenuContainer.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // 7. Mega Menu Portal Logic
    const megaTriggers = document.querySelectorAll('[data-menu]');
    const megaMenus = document.querySelectorAll('.mega-menu');
    let activeMenu = null;
    let hideTimeout = null;

    megaTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            const menuId = trigger.getAttribute('data-menu');
            const targetMenu = document.getElementById(menuId);

            megaMenus.forEach(m => {
                if (m !== targetMenu) m.classList.remove('active');
            });

            if (targetMenu) {
                // Calculate dynamic positioning
                const rect = trigger.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const menuWidth = 820; // Matches CSS width
                
                let leftPos = rect.left;
                
                // Ensure menu doesn't overflow right edge
                if (leftPos + menuWidth > windowWidth - 20) {
                    leftPos = windowWidth - menuWidth - 20;
                }

                targetMenu.style.left = `${leftPos}px`;
                targetMenu.classList.add('active');
                activeMenu = targetMenu;
            }
        });

        trigger.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                if (activeMenu) {
                    activeMenu.classList.remove('active');
                    activeMenu = null;
                }
            }, 200);
        });
    });

    megaMenus.forEach(menu => {
        menu.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            activeMenu = menu;
        });

        menu.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                menu.classList.remove('active');
                activeMenu = null;
            }, 200);
        });
    });
    // 8. Policy Details Tab Switcher
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-target');

            // Update triggers
            tabTriggers.forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            // Update panels
            tabPanels.forEach(p => {
                p.classList.remove('active');
                if (p.id === target) {
                    p.classList.add('active');
                }
            });
        });
    });

    // 9. Interactive Offers Slider Logic
    const offerSelectors = document.querySelectorAll('.offer-selector-item');
    const offerSlides = document.querySelectorAll('.offer-slide');
    const offersContainer = document.querySelector('.offers-interactive-container');
    let currentOfferIndex = 0;
    let offerInterval;

    function showOffer(index) {
        // Handle selectors
        offerSelectors.forEach(s => s.classList.remove('active'));
        offerSelectors[index].classList.add('active');

        // Handle slides
        offerSlides.forEach(slide => {
            if (slide.classList.contains('active')) {
                slide.classList.remove('active');
                slide.classList.add('exit');
                setTimeout(() => {
                    slide.classList.remove('exit');
                }, 400);
            }
        });

        offerSlides[index].classList.add('active');
        currentOfferIndex = index;
    }

    function nextOffer() {
        let nextIndex = (currentOfferIndex + 1) % offerSelectors.length;
        showOffer(nextIndex);
    }

    function startOfferRotation() {
        offerInterval = setInterval(nextOffer, 5000);
    }

    function stopOfferRotation() {
        clearInterval(offerInterval);
    }

    if (offerSelectors.length > 0) {
        offerSelectors.forEach((selector, index) => {
            selector.addEventListener('click', () => {
                showOffer(index);
                stopOfferRotation();
                startOfferRotation(); // Reset timer on manual click
            });
        });

        if (offersContainer) {
            offersContainer.addEventListener('mouseenter', stopOfferRotation);
            offersContainer.addEventListener('mouseleave', startOfferRotation);
        }

        startOfferRotation();
    }
    // 9. Logo Click Behavior (Smooth Scroll to Top if on Home)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            const isHomePage = window.location.pathname.endsWith('index.html') || 
                               window.location.pathname === '/' || 
                               window.location.pathname.endsWith('/');
            
            if (isHomePage) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    // 10. Timed Calculator Popup on Mobile
    const calcModal = document.getElementById('calcModal');
    const closeCalc = document.getElementById('closeCalc');
    const isMobile = window.innerWidth <= 768 || window.matchMedia("(max-width: 768px)").matches || (document.querySelector('.mobile-menu-btn') && getComputedStyle(document.querySelector('.mobile-menu-btn')).display !== 'none');
    let popupShown = false;

    if (isMobile && calcModal) {
        if (!popupShown) {
            setTimeout(() => {
                calcModal.classList.add('active');
                popupShown = true;
            }, 10000); // 10 seconds
        }

        // Open calculator popup on mobile "Check Your Premium" click
        const checkPremiumBtn = document.querySelector('a[href="#quote"]');
        if (checkPremiumBtn) {
            checkPremiumBtn.addEventListener('click', (e) => {
                e.preventDefault();
                calcModal.classList.add('active');
            });
        }

        // Close on 'X' click
        if (closeCalc) {
            closeCalc.addEventListener('click', () => {
                calcModal.classList.remove('active');
            });
        }

        // Close on outside click
        calcModal.addEventListener('click', (e) => {
            if (e.target === calcModal) {
                calcModal.classList.remove('active');
            }
        });
    }

    // Calculator Form WhatsApp Submission (Global for desktop & mobile)
    const calcForm = document.getElementById('calculator-form');
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const city = document.getElementById('city').value;
            const phone = document.getElementById('phone').value;

            if (!age || !gender || !city || !phone) {
                alert('Please fill out all fields before proceeding.');
                return;
            }

            const waMessage = `Hello, I want a health insurance quote.%0A%0AAge: ${age}%0AGender: ${gender}%0ACity: ${city}%0APhone: ${phone}`;
            const waUrl = `https://wa.me/916382560104?text=${waMessage}`;
            
            window.open(waUrl, '_blank');
        });
    }
    // 11. Apple-Style Bottom Navigation Logic
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');

    function updateIndicator(activeItem) {
        if (!navIndicator || !activeItem) return;
        const rect = activeItem.getBoundingClientRect();
        const navRect = bottomNav.getBoundingClientRect();
        const centerX = rect.left - navRect.left + rect.width / 2;
        navIndicator.style.left = `${centerX - navIndicator.offsetWidth / 2}px`;
    }

    // Set initial position
    const initialActive = document.querySelector('.nav-item.active');
    if (initialActive) {
        setTimeout(() => updateIndicator(initialActive), 100);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const isHomePage = window.location.pathname.endsWith('index.html') || 
                               window.location.pathname === '/' || 
                               window.location.pathname.endsWith('/');

            // Smooth Scroll / Redirect Logic
            if (item.id === 'bottom-nav-home') {
                if (isHomePage) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.location.href = 'index.html';
                }
            } else if (item.id === 'bottom-nav-offers') {
                if (isHomePage) {
                    e.preventDefault();
                    const offersSection = document.getElementById('offers');
                    if (offersSection) {
                        offersSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.location.href = 'index.html#offers';
                }
            } else if (item.id === 'bottom-nav-services') {
                if (window.location.pathname.endsWith('services.html')) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }

            // UI Update
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            updateIndicator(item);

            // Add bounce animation
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.transform = '';
            }, 100);
        });
    });

    // Handle window resize for indicator
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-item.active');
        if (currentActive) updateIndicator(currentActive);
    });
    // 12. Premium Sliding CTA Guide Logic (Offers Section)
    setTimeout(() => {
        // Find the guide in the active slide
        const activeSlide = document.querySelector('.offer-slide.active');
        const guide = activeSlide ? activeSlide.querySelector('.cta-guide') : document.querySelector('.cta-guide');

        if (guide) {
            guide.classList.add('show');

            setTimeout(() => {
                guide.classList.remove('show');
                guide.classList.add('hide');
            }, 5000);
        }
    }, 3000);
    // 13. Comprehensive Benefits Alternating Animations
    const benefitItems = document.querySelectorAll('.benefits-simple-grid .benefit-item');
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    benefitItems.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'benefit-left' : 'benefit-right');
        item.style.transitionDelay = `${index * 0.1}s`;
        benefitObserver.observe(item);
    });

    // 14. Why SFS Feature Animations
    const featureItems = document.querySelectorAll('.feature-item');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    featureItems.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'feature-left' : 'feature-right');
        item.style.transitionDelay = `${index * 0.1}s`;
        featureObserver.observe(item);
    });

    // 4. Service Card Full Click Interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            const link = card.getAttribute('data-link');
            if (link && !e.target.closest('.service-link')) {
                window.location.href = link;
            }
        });
    });

    // 5. Staggered Scroll Animations (Intersection Observer)
    const staggeredItems = document.querySelectorAll('.animate-on-scroll');
    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Find all items in the section for index-based staggering
                const index = Array.from(staggeredItems).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 150);
                
                staggeredObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggeredItems.forEach(item => staggeredObserver.observe(item));

    // 8. Reviews Auto-Slider
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        let isPaused = false;
        let slideInterval;

        const startAutoSlide = () => {
            slideInterval = setInterval(() => {
                if (!isPaused) {
                    const cardWidth = reviewsSlider.querySelector('.review-card').offsetWidth + 20;
                    const maxScroll = reviewsSlider.scrollWidth - reviewsSlider.offsetWidth;
                    
                    if (reviewsSlider.scrollLeft >= maxScroll - 10) {
                        reviewsSlider.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        reviewsSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, 4000);
        };

        reviewsSlider.addEventListener('mouseenter', () => isPaused = true);
        reviewsSlider.addEventListener('mouseleave', () => isPaused = false);
        reviewsSlider.addEventListener('touchstart', () => isPaused = true);
        reviewsSlider.addEventListener('touchend', () => {
            setTimeout(() => isPaused = false, 2000);
        });

        startAutoSlide();
    }

    // 9. Review "Read More" Toggle
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.previousElementSibling;
            if (text && text.classList.contains('review-text')) {
                text.classList.toggle('collapsed');
                btn.innerText = text.classList.contains('collapsed') ? "Read more" : "Show less";
            }
        });
    });

    // 10. Global Popup Calculator Logic
    const calcModal = document.getElementById('calcModal');
    const closeCalc = document.getElementById('closeCalc');
    
    window.openPopup = function() {
        if (calcModal) {
            calcModal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    };

    window.closePopup = function() {
        if (calcModal) {
            calcModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    };

    if (closeCalc) {
        closeCalc.addEventListener('click', closePopup);
    }

    // Close on outside click
    if (calcModal) {
        calcModal.addEventListener('click', (e) => {
            if (e.target === calcModal) {
                closePopup();
            }
        });
    }

    // Update existing "Check Your Premium" buttons to use openPopup
    const premiumBtns = document.querySelectorAll('a[href="#quote"]');
    premiumBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup();
        });
    });

    // 6. Personal Loan EMI Calculator
    const calculateBtn = document.getElementById('calculateEMI');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const P = parseFloat(document.getElementById('loanAmount').value);
            const R = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
            const N = parseFloat(document.getElementById('tenure').value);

            if (P && R && N) {
                const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
                const totalPayment = emi * N;
                const totalInterest = totalPayment - P;

                const emiDisplay = document.getElementById('emiDisplay');
                const interestDisplay = document.getElementById('totalInterest');

                if (emiDisplay) emiDisplay.innerText = '₹ ' + Math.round(emi).toLocaleString('en-IN');
                if (interestDisplay) interestDisplay.innerText = '₹ ' + Math.round(totalInterest).toLocaleString('en-IN');
            }
        });
    }

    // 7. Personal Loan Form Submission (WhatsApp Redirect)
    const loanForm = document.getElementById('loanForm');
    if (loanForm) {
        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fullName')?.value;
            const phone = document.getElementById('phoneNumber')?.value;
            const amount = document.getElementById('requestedAmount')?.value;
            
            if (name && phone && amount) {
                const message = `Hi, I want to apply for a Personal Loan.\nName: ${name}\nPhone: ${phone}\nLoan Amount: ₹${amount}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/916382560104?text=${encodedMessage}`;
                window.location.href = whatsappUrl;
            }
        });
    }
});

