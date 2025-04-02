document.addEventListener('DOMContentLoaded', function() {
    
    // Animation légère du dégradé de fond
    const adjustBackgroundPosition = () => {
        const now = Date.now();
        const x = Math.sin(now / 10000) * 10;
        const y = Math.cos(now / 10000) * 10;
        document.body.style.backgroundPosition = `${x}px ${y}px`;
    };
    
    // Appliquer un mouvement subtil au fond
    setInterval(adjustBackgroundPosition, 100);
    
    // Animation des points de chargement
    const animatePoints = () => {
        const points = document.querySelector('.points');
        if (points) {
            let currentText = points.textContent;
            
            if (currentText === '·········') {
                points.textContent = '·';
            } else if (currentText === '·') {
                points.textContent = '··';
            } else if (currentText === '··') {
                points.textContent = '···';
            } else if (currentText === '···') {
                points.textContent = '····';
            } else if (currentText === '····') {
                points.textContent = '·····';
            } else if (currentText === '·····') {
                points.textContent = '······';
            } else if (currentText === '······') {
                points.textContent = '·······';
            } else if (currentText === '·······') {
                points.textContent = '········';
            } else if (currentText === '········') {
                points.textContent = '·········';
            }
        }
    };
    
    // Animer les points toutes les 500ms
    setInterval(animatePoints, 500);
    
    // Animation de paillettes pour l'arrière-plan
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 150; // Plus de particules pour un effet plus dense
        
        // Couleurs des paillettes
        const colors = [
            'rgba(255, 236, 179, 0.8)', // Jaune doré
            'rgba(255, 215, 0, 0.8)',   // Or
            'rgba(255, 255, 255, 0.8)', // Blanc
            'rgba(255, 201, 102, 0.8)'  // Ambre
        ];
        
        // Création des paillettes
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5, // Particules plus petites
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: (Math.random() - 0.5) * 3, // Mouvement plus rapide
                speedY: (Math.random() - 0.5) * 3, // Mouvement plus rapide
                opacity: Math.random(),
                fadeDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
        
        // Animation des paillettes
        function animateGlitter() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                
                // Effet de scintillement
                p.opacity += 0.01 * p.fadeDirection;
                if (p.opacity >= 1 || p.opacity <= 0.3) {
                    p.fadeDirection *= -1;
                }
                
                // Dessiner la paillette
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                
                // Créer un dégradé radial pour un effet plus lumineux
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.radius
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, ' + p.opacity + ')');
                gradient.addColorStop(1, p.color.replace('0.8', p.opacity * 0.8));
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Déplacement plus rapide
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Rebond sur les bords avec un peu d'aléatoire
                if (p.x < 0 || p.x > canvas.width) {
                    p.speedX *= -1;
                    p.speedX += (Math.random() - 0.5) * 0.3; // Ajoute un peu d'aléatoire
                }
                if (p.y < 0 || p.y > canvas.height) {
                    p.speedY *= -1;
                    p.speedY += (Math.random() - 0.5) * 0.3; // Ajoute un peu d'aléatoire
                }
                
                // Ralentir progressivement pour éviter une accélération excessive
                p.speedX *= 0.99;
                p.speedY *= 0.99;
                
                // Regénérer les particules trop lentes
                if (Math.abs(p.speedX) < 0.2 && Math.abs(p.speedY) < 0.2) {
                    p.speedX = (Math.random() - 0.5) * 3;
                    p.speedY = (Math.random() - 0.5) * 3;
                }
            }
            
            requestAnimationFrame(animateGlitter);
        }
        
        animateGlitter();
        
        // Réajuster la taille du canvas lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Effet de lumière au survol des liens-boutons - CORRECTION DU SÉLECTEUR
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('glow-effect');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('glow-effect');
        });
    });
});