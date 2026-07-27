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

            // Connect nodes with glowing lines representing block ledger sync
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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.style.color = '#00ff88';
            formStatus.textContent = '[SUCCESS]: Inquiry transmitted successfully! I will respond promptly.';
            contactForm.reset();
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

    // Close the modal if the user clicks outside the image
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