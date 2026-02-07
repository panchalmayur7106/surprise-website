// Get all stages
const stages = document.querySelectorAll('.stage');
let currentStage = 0;

// Function to switch to next stage
function nextStage() {
    if (currentStage < stages.length - 1) {
        // Hide current stage
        stages[currentStage].style.opacity = '0';
        
        setTimeout(() => {
            stages[currentStage].classList.remove('active');
            currentStage++;
            
            // Show next stage
            stages[currentStage].classList.add('active');
            
            setTimeout(() => {
                stages[currentStage].style.opacity = '1';
            }, 50);
        }, 1000);
    }
}

// Add click/tap event to entire body
document.body.addEventListener('click', (e) => {
    // Don't advance if we're on the last stage
    if (currentStage < stages.length - 1) {
        nextStage();
    }
});

// Add touch event for better mobile experience
document.body.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (currentStage < stages.length - 1) {
        nextStage();
    }
});

// Create additional floating particles dynamically
function createParticles() {
    const activeStage = document.querySelector('.stage.active');
    const particleContainer = activeStage?.querySelector('.floating-particles');
    
    if (particleContainer && currentStage > 0 && currentStage < stages.length - 1) {
        // Create 3 random particles
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = 'radial-gradient(circle, #ffb3d9 0%, transparent 70%)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${8 + Math.random() * 4}s linear`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.opacity = '0';
            
            particleContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 12000);
        }
    }
}

// Create particles periodically for active stages
setInterval(() => {
    if (currentStage > 0 && currentStage < stages.length - 1) {
        createParticles();
    }
}, 3000);

// Add subtle background glow effect on tap
document.body.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.width = '100px';
    glow.style.height = '100px';
    glow.style.marginLeft = '-50px';
    glow.style.marginTop = '-50px';
    glow.style.background = 'radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '1000';
    glow.style.animation = 'tapGlow 0.8s ease-out forwards';
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        glow.remove();
    }, 800);
});

// Add tap glow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes tapGlow {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Prevent accidental back navigation
let hasStarted = false;

document.body.addEventListener('click', () => {
    hasStarted = true;
});

window.addEventListener('beforeunload', (e) => {
    if (hasStarted && currentStage > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Create ambient heart particles in background
function createAmbientHearts() {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '110%';
    heart.style.fontSize = (20 + Math.random() * 30) + 'px';
    heart.style.color = `rgba(255, ${Math.floor(107 + Math.random() * 50)}, ${Math.floor(157 + Math.random() * 50)}, ${0.1 + Math.random() * 0.15})`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '0';
    heart.style.animation = `riseUp ${10 + Math.random() * 10}s linear`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// Add rise up animation for ambient hearts
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes riseUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.15;
        }
        90% {
            opacity: 0.15;
        }
        100% {
            transform: translateY(-120vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Create ambient hearts periodically
setInterval(() => {
    if (Math.random() > 0.3) {
        createAmbientHearts();
    }
}, 2000);

// Keyboard support (for desktop testing)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        if (currentStage < stages.length - 1) {
            nextStage();
        }
    }
});

// Special effect for final stage
function finalStageEffect() {
    if (currentStage === stages.length - 1) {
        // Create extra sparkles
        const finalStage = stages[stages.length - 1];
        const content = finalStage.querySelector('.content');
        
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✦';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '20px';
            sparkle.style.color = '#ffd6e8';
            sparkle.style.opacity = '0';
            sparkle.style.animation = 'sparkleAppear 2s ease-in-out';
            sparkle.style.pointerEvents = 'none';
            
            content.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, 1500);
    }
}

// Watch for final stage
setInterval(() => {
    if (currentStage === stages.length - 1) {
        finalStageEffect();
    }
}, 100);

// Add sparkle appear animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAppear {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Log for debugging
console.log('Valentine website loaded with love 💝');
console.log('Tap anywhere to continue through the journey...');
