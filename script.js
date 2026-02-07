// Get all scenes and buttons
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const scene4 = document.getElementById('scene4');
const scene5 = document.getElementById('scene5');

const enterBtn = document.getElementById('enterBtn');
const continueBtn1 = document.getElementById('continueBtn1');
const continueBtn2 = document.getElementById('continueBtn2');

// Function to switch scenes
function switchScene(currentScene, nextScene) {
    currentScene.style.opacity = '0';
    setTimeout(() => {
        currentScene.classList.remove('active');
        nextScene.classList.add('active');
        setTimeout(() => {
            nextScene.style.opacity = '1';
        }, 50);
    }, 1000);
}

// Auto transition from Scene 2 to Scene 3
function autoTransitionToScene3() {
    setTimeout(() => {
        switchScene(scene2, scene3);
    }, 5000); // 5 seconds display time
}

// Enter button click
enterBtn.addEventListener('click', () => {
    // Add click effect
    enterBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        enterBtn.style.transform = 'scale(1)';
    }, 100);
    
    // Switch to scene 2
    switchScene(scene1, scene2);
    
    // Auto transition to scene 3
    autoTransitionToScene3();
});

// Continue button 1 click
continueBtn1.addEventListener('click', () => {
    continueBtn1.style.transform = 'scale(0.95)';
    setTimeout(() => {
        continueBtn1.style.transform = 'scale(1)';
    }, 100);
    
    switchScene(scene3, scene4);
});

// Continue button 2 click
continueBtn2.addEventListener('click', () => {
    continueBtn2.style.transform = 'scale(0.95)';
    setTimeout(() => {
        continueBtn2.style.transform = 'scale(1)';
    }, 100);
    
    switchScene(scene4, scene5);
});

// Add extra floating hearts dynamically
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    const heartsContainer = document.querySelector('.hearts-animation');
    if (heartsContainer) {
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Create hearts periodically when scene 2 is active
setInterval(() => {
    if (scene2.classList.contains('active')) {
        createFloatingHeart();
    }
}, 800);

// Add sparkle animation effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '24px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
    sparkle.style.zIndex = '1000';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle effect CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleEffect {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add sparkles on button hover
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    });
});

// Prevent accidental back navigation
window.addEventListener('beforeunload', (e) => {
    if (!scene1.classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Add romantic background music (optional - commented out)
// You can uncomment this and add your own music file
/*
const audio = new Audio('romantic-music.mp3');
audio.loop = true;
audio.volume = 0.3;

enterBtn.addEventListener('click', () => {
    audio.play();
});
*/

// Easter egg: Create heart explosion on double click
document.addEventListener('dblclick', (e) => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = '32px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            heart.style.animation = `heartExplosion 1s ease-out forwards`;
            heart.style.setProperty('--vx', vx + 'px');
            heart.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, i * 50);
    }
});

// Add heart explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes heartExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

console.log('💝 Website loaded with love! 💝');
