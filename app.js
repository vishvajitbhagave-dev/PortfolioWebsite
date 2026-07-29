document.addEventListener('DOMContentLoaded', () => {

    // 1. Interactive Blockchain Canvas Node Network
    const canvas = document.getElementById('blockchain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let nodes = [];
        const nodeCount = 55;
        const maxConnectDistance = 140;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2 + 1.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00f2fe';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#00f2fe';
                ctx.fill();
            }
        }

        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }

        function animateNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectDistance) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / maxConnectDistance})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            requestAnimationFrame(animateNetwork);
        }
        animateNetwork();
    }

   // 3. Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                formStatus.style.color = '#00ff88';
                formStatus.textContent = '[SUCCESS]: Inquiry transmitted successfully! I will respond promptly.';
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            formStatus.style.color = '#ff5f56';
            formStatus.textContent = '[ERROR]: Something went wrong. Please try emailing me directly.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

    // 4. Mobile Navigation Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 5. Certificate Preview Modal
    const certModal = document.getElementById('certModal');
    const certImage = document.getElementById('certImage');

    window.openCertModal = function (imageSrc) {
        certImage.src = imageSrc;
        certModal.classList.add('show');
    };

    window.closeCertModal = function () {
        certModal.classList.remove('show');
    };

    window.addEventListener('click', (event) => {
        if (event.target === certModal) {
            closeCertModal();
        }
    });

    // 6. 3D Tilt Effect on Achievement Cards
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('.achievement-card'), {
            max: 12,
            speed: 400,
            glare: true,
            'max-glare': 0.25,
            scale: 1.02,
            easing: 'cubic-bezier(.03,.98,.52,.99)'
        });
    }
});

// 7. Tech Stack Scroll Reveal Animation
const skillCards = document.querySelectorAll('.skill-card-item');
const skillRowTitles = document.querySelectorAll('.skill-row-title');

if (skillCards.length || skillRowTitles.length) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => skillObserver.observe(card));
    skillRowTitles.forEach(title => skillObserver.observe(title));
}

// Education Card Fade-In Animation
const educationCard = document.querySelector('.about-card');
if (educationCard) {
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                educationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    educationObserver.observe(educationCard);
}

// GitHub Activity Card — Left-to-Right Reveal Animation
const githubCard = document.querySelector('.github-activity-card');
if (githubCard) {
    const githubObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                githubObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    githubObserver.observe(githubCard);
}

// =====================================================
// GALLERY — Slider + Active Highlight + Progress Dots
// =====================================================
const galleryTrack = document.getElementById('gallery-track');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

if (galleryTrack && galleryPrev && galleryNext) {

    const galleryCards = galleryTrack.querySelectorAll('.gallery-card');

    // --- Arrow Navigation ---
    const scrollAmount = () => galleryTrack.querySelector('.gallery-card').offsetWidth + 24;

    galleryNext.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    galleryPrev.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    // --- Active Center (two closest) Highlight ---
    function updateActiveGalleryCard() {
        const trackRect = galleryTrack.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        const cardsWithDistance = Array.from(galleryCards).map(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            return { card, distance: Math.abs(trackCenter - cardCenter) };
        });

        cardsWithDistance.sort((a, b) => a.distance - b.distance);

        galleryCards.forEach(card => card.classList.remove('is-active'));

        cardsWithDistance.slice(0, 2).forEach(item => {
            item.card.classList.add('is-active');
        });
    }

    // --- Progress Dots: created ONCE, matching the number of photos ---
    const galleryDotsContainer = document.getElementById('gallery-dots');
    let galleryDots = [];

    if (galleryDotsContainer) {
        galleryDotsContainer.innerHTML = ''; // safety: clear any old dots first

        galleryCards.forEach((card, index) => {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            dot.setAttribute('aria-label', `Go to photo ${index + 1}`);
            dot.addEventListener('click', () => {
                card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            });
            galleryDotsContainer.appendChild(dot);
        });

        galleryDots = galleryDotsContainer.querySelectorAll('.gallery-dot');
    }

    function updateActiveDot() {
        if (!galleryDots.length) return;

        const trackRect = galleryTrack.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        galleryCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(trackCenter - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        galleryDots.forEach(dot => dot.classList.remove('is-active-dot'));
        galleryDots[closestIndex].classList.add('is-active-dot');
    }

    // --- Run once on load ---
    updateActiveGalleryCard();
    updateActiveDot();

    // --- Single scroll listener drives both updates ---
    let scrollTimeout;
    galleryTrack.addEventListener('scroll', () => {
        window.cancelAnimationFrame(scrollTimeout);
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveGalleryCard();
            updateActiveDot();
        });
    });

    window.addEventListener('resize', () => {
        updateActiveGalleryCard();
        updateActiveDot();
    });
}

// Experience Cards — Staggered Fade-Up Animation
const experienceCards = document.querySelectorAll('.experience-card');
if (experienceCards.length) {
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                experienceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    experienceCards.forEach(card => experienceObserver.observe(card));
}

// Project Preview Tabs — Video / Live Toggle
document.querySelectorAll('.project-video-col').forEach(col => {
    const tabs = col.querySelectorAll('.preview-tab-btn');
    const panels = col.querySelectorAll('.preview-panel');
    const videoWrapper = col.querySelector('.project-video-wrapper');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('is-active'));
            panels.forEach(p => p.classList.remove('is-active'));

            tab.classList.add('is-active');
            document.getElementById(tab.dataset.target).classList.add('is-active');

            // Flash the border glow to confirm the switch
            if (videoWrapper) {
                videoWrapper.classList.remove('tab-switch-flash');
                void videoWrapper.offsetWidth; // forces the browser to restart the animation each click
                videoWrapper.classList.add('tab-switch-flash');
            }
        });
    });
});

// Project Cards — Staggered Fade-Up Animation
const projectShowcaseCards = document.querySelectorAll('.project-showcase-card');
if (projectShowcaseCards.length) {
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Trigger the Live Preview tab's one-time pulse after this card's entrance animation
                const liveTab = entry.target.querySelector('.preview-tab-btn[data-target="horizon-live"]');
                if (liveTab) {
                    setTimeout(() => {
                        liveTab.classList.add('pulse-once');
                    }, 900); // waits for the card's own fade-up to finish first
                }

                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    projectShowcaseCards.forEach(card => projectObserver.observe(card));
}

// Project Impact — Counting Number Animation
const impactCounters = document.querySelectorAll('.impact-counter');
if (impactCounters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterEl = entry.target;
                const target = parseInt(counterEl.dataset.count, 10);
                const duration = 1200; // total animation time in ms
                const startTime = performance.now();

                function tick(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentValue = Math.floor(progress * target);

                    counterEl.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        counterEl.textContent = target; // ensure it lands exactly on the real number
                    }
                }

                requestAnimationFrame(tick);
                counterObserver.unobserve(counterEl);
            }
        });
    }, { threshold: 0.5 });

    impactCounters.forEach(counter => counterObserver.observe(counter));
}

// Project Video Wrapper — Gentle Parallax on Scroll
const parallaxWrappers = document.querySelectorAll('.project-video-wrapper');

if (parallaxWrappers.length) {
    const maxShift = 18; // maximum pixels the box can shift — keep this small

    function updateParallax() {
        const viewportCenter = window.innerHeight / 2;

        parallaxWrappers.forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - viewportCenter;

            // Normalize distance to a small, capped pixel shift
            const shift = Math.max(Math.min(distanceFromCenter * 0.04, maxShift), -maxShift);

            wrapper.style.transform = `translateY(${shift}px)`;
        });
    }

    let parallaxTimeout;
    window.addEventListener('scroll', () => {
        window.cancelAnimationFrame(parallaxTimeout);
        parallaxTimeout = window.requestAnimationFrame(updateParallax);
    });

    // Run once on load in case a card is already in view
    updateParallax();
}

// Close certificate modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const certModal = document.getElementById('certModal');
        if (certModal && certModal.classList.contains('show')) {
            closeCertModal();
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const certModal = document.getElementById('certModal');
        if (certModal && certModal.classList.contains('show')) {
            closeCertModal();
        }
    }
});