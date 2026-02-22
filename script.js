// ========== Smooth Scroll and Navigation ==========
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========== Mobile Menu Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(10, 14, 39, 0.95)';
        navMenu.style.padding = '20px';
        navMenu.style.zIndex = '999';
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ========== Scroll Animation - Reveal Elements ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== Active Navigation Link ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00d4ff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// ========== Contact Form Validation ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();
        let formMessage = document.getElementById("formMessage");

        // Basic validation
        if (name === "" || email === "" || subject === "" || message === "") {
            formMessage.style.color = "#ff6b6b";
            formMessage.textContent = "⚠️ Please fill all fields!";
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.style.color = "#ff6b6b";
            formMessage.textContent = "⚠️ Please enter a valid email!";
            return;
        }

        // Success message
        formMessage.style.color = "#00d4ff";
        formMessage.textContent = "✓ Message sent successfully! I'll get back to you soon.";
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = "";
        }, 5000);

        // Here you would send the form data to your backend
        // Example:
        // sendFormData({ name, email, subject, message });
    });
}

// ========== Typing Animation for Hero Title ==========
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    let index = 0;
    
    // Start typing animation after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroTitle.textContent = '';
            typeText();
        }, 100);
    });

    function typeText() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, 30);
        }
    }
}

// ========== Scroll to Top Button ==========
const scrollButton = document.createElement('button');
scrollButton.textContent = '↑';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00d4ff, #7b2cbf);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseover', () => {
    scrollButton.style.background = 'linear-gradient(135deg, #7b2cbf, #00d4ff)';
    scrollButton.style.transform = 'scale(1.1)';
});

scrollButton.addEventListener('mouseout', () => {
    scrollButton.style.background = 'linear-gradient(135deg, #00d4ff, #7b2cbf)';
    scrollButton.style.transform = 'scale(1)';
});

// ========== Parallax Effect ==========
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollY = window.pageYOffset;
        heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ========== Counter Animation for Stats ==========
const stats = document.querySelectorAll('.stat h3');
let hasAnimated = false;

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                const increment = target / 50;
                let current = 0;

                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current) + '+';
                        setTimeout(updateCount, 30);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                updateCount();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats')?.forEach(el => counterObserver.observe(el));

// ========== Tooltip Helper ==========
function addTooltip(element, text) {
    element.setAttribute('title', text);
}