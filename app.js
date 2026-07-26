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

    // 2. Interactive Terminal Smart Contract Simulator
    const deployBtn = document.getElementById('deploy-btn');
    const terminalBody = document.getElementById('terminal-body');

    if (deployBtn && terminalBody) {
        deployBtn.addEventListener('click', () => {
            const randomHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

            const lines = [
                `<p class="term-line"><span class="term-prompt">sppu@blockchain:~$</span> npx hardhat run scripts/deploy.js --network sppuMainnet</p>`,
                `<p class="term-line"><span class="term-info">[COMPILING]</span> Contracts compiled successfully.</p>`,
                `<p class="term-line"><span class="term-info">[DEPLOYING]</span> Transaction TxHash: ${randomHash.substring(0, 18)}...</p>`,
                `<p class="term-line"><span class="term-success">[SUCCESS]</span> Contract deployed at: ${randomHash}</p>`
            ];

            terminalBody.innerHTML = '';
            lines.forEach((line, idx) => {
                setTimeout(() => {
                    terminalBody.innerHTML += line;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, idx * 400);
            });
        });
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