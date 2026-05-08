// Intersection Observer for scroll reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add subtle parallax effect and smart navbar hiding
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        const navbar = document.querySelector('#navbar');

        // Parallax
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Smart Navbar
        if (navbar) {
            // Glass effect
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/Show logic
            if (scrolled > lastScroll && scrolled > 100) {
                // Scrolling down - Hide
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up - Show
                navbar.classList.remove('nav-hidden');
            }
        }
        lastScroll = scrolled;
    });
});
