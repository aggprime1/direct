/* =========================================
   AWAAZ GLOBAL GROUP - INTERACTIVE JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Custom Futuristic Cursor Logic
    const cursor = document.querySelector("#cursor");
    const cursorBlur = document.querySelector("#cursor-blur");

    document.addEventListener("mousemove", (e) => {
        // Cursor movement
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        // Blur background follow (with slight delay for smoothness)
        cursorBlur.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector("#navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Animated Counters for Stats
    const counters = document.querySelectorAll(".counter");
    let speed = 100;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString() + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger counters only when they become visible
    const statsSection = document.querySelector(".stats-section");
    const observerOptions = { threshold: 0.5 };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);

    // 5. Mobile Menu Toggle Logic
    const mobileBtn = document.querySelector("#mobileMenuBtn");
    const navLinks = document.querySelector(".nav-links");

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-active");
        mobileBtn.classList.toggle("open");
        
        // Basic animation for hamburger icon
        const spans = mobileBtn.querySelectorAll("span");
        if(mobileBtn.classList.contains("open")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    // 6. Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Add Parallax Effect on Hero Image
    window.addEventListener("scroll", () => {
        const scrollValue = window.scrollY;
        const heroImg = document.querySelector(".hero-bg");
        if(heroImg) {
            heroImg.style.transform = `scale(${1 + scrollValue * 0.0005}) translateY(${scrollValue * 0.2}px)`;
        }
    });

    // 8. Custom Interactivity (Modal Pop-up System)
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeModal = document.querySelector(".close-modal");
    
    // Har wo item jisme 'interactive-item' class lagi hai usko select karo
    const interactiveItems = document.querySelectorAll(".interactive-item");

    interactiveItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault(); // Agar link hai toh page reload/jump hone se roko
            
            // HTML se data nikalna
            const title = item.getAttribute("data-title") || "System Info";
            const desc = item.getAttribute("data-desc") || "More information will be available soon.";
            
            // Modal mein data daalna
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            
            // Modal show karna
            modal.classList.add("show");
        });
    });

    // Modal ko close karne ka function (Close button se)
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Modal ko close karne ka function (Bahar click karne par)
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    console.log("Awaaz Global Group: The Interactive Future is Ready.");
});
