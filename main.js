document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth hover effect for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            navLinks.forEach(other => {
                if (other !== link) other.style.opacity = '0.3';
            });
        });
        link.addEventListener('mouseleave', () => {
            navLinks.forEach(other => {
                other.style.opacity = '0.6';
            });
        });
    });

    // Subtle parallax for hero visual
    window.addEventListener('scroll', () => {
        const visual = document.querySelector('.hero-visual');
        if (visual) {
            const scrolled = window.pageYOffset;
            visual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});
