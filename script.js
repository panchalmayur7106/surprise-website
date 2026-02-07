// ========== HEARTS ANIMATION ==========
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    const colors = ['#ff69b4', '#ff1493', '#db7093', '#c71585', '#ff6b9d'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Create hearts continuously
setInterval(createHeart, 300);

// Initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 200);
}

// ========== SCREEN MANAGEMENT ==========
let currentScreen = 1;
const totalScreens = 8;

function showScreen(screenNumber) {
    // Hide all screens
    for (let i = 1; i <= totalScreens; i++) {
        const screen = document.getElementById(`screen${i}`);
        if (screen) {
            screen.classList.remove('active');
        }
    }
    
    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        setTimeout(() => {
            targetScreen.classList.add('active');
            currentScreen = screenNumber;
        }, 500);
    }
    
    // Create heart burst
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 50);
    }
}

// ========== AUTO TRANSITIONS ==========
// Screen 1 -> Screen 2 (after 3 seconds)
setTimeout(() => {
    showScreen(2);
}, 3000);

// Screen 2 -> Screen 3 (after 3 more seconds)
setTimeout(() => {
    showScreen(3);
}, 6000);

// Screen 3 -> Screen 4 (after 3 more seconds)
setTimeout(() => {
    showScreen(4);
}, 9000);

// ========== SCREEN 4: TAP TO BEGIN BUTTON ==========
const tapButton = document.getElementById('tapButton');
if (tapButton) {
    tapButton.addEventListener('click', () => {
        showScreen(5);
        
        // Start balloon animation and then move to screen 6
        setTimeout(() => {
            showScreen(6);
        }, 5000);
    });
}

// ========== SCREEN 6: CAROUSEL ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

// Next button
const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
}

// Previous button
const prevBtn = document.getElementById('prevBtn');
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play carousel
let carouselInterval;
function startCarousel() {
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 3000);
}

// Start carousel when screen 6 is active
setTimeout(() => {
    if (currentScreen === 6) {
        startCarousel();
    }
}, 15000); // Starts when screen 6 appears

// See Message button
const seeMessageBtn = document.getElementById('seeMessageBtn');
if (seeMessageBtn) {
    seeMessageBtn.addEventListener('click', () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        showScreen(7);
    });
}

// ========== SCREEN 7: YES BUTTON ==========
const yesButton = document.getElementById('yesButton');
if (yesButton) {
    yesButton.addEventListener('click', () => {
        // Create massive heart burst
        for (let i = 0; i < 50; i++) {
            setTimeout(createHeart, i * 30);
        }
        
        // Move to final screen
        showScreen(8);
        
        // Optional: Add confetti or fireworks effect
        createFireworks();
    });
}

// ========== FIREWORKS EFFECT ==========
function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'absolute';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            firework.style.fontSize = (Math.random() * 30 + 20) + 'px';
            firework.innerHTML = ['✨', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
            firework.style.zIndex = '1000';
            firework.style.animation = 'sparkle 2s forwards';
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 100);
    }
}

// ========== SPARKLES ON MOUSE MOVE ==========
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.background = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s forwards';
        sparkle.style.zIndex = '100';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// ========== TOUCH SUPPORT FOR MOBILE ==========
if (tapButton) {
    tapButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        tapButton.style.transform = 'scale(0.95)';
    });

    tapButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        tapButton.style.transform = 'scale(1.1)';
        showScreen(5);
        setTimeout(() => {
            showScreen(6);
        }, 5000);
    });
}

// Touch support for other buttons
if (seeMessageBtn) {
    seeMessageBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        seeMessageBtn.style.transform = 'scale(0.95)';
    });

    seeMessageBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        seeMessageBtn.style.transform = 'scale(1)';
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        showScreen(7);
    });
}

if (yesButton) {
    yesButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        yesButton.style.transform = 'scale(0.95)';
    });

    yesButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        yesButton.style.transform = 'scale(1)';
        for (let i = 0; i < 50; i++) {
            setTimeout(createHeart, i * 30);
        }
        showScreen(8);
        createFireworks();
    });
}

// ========== PREVENT DEFAULT BEHAVIORS ==========
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// ========== KEYBOARD NAVIGATION (OPTIONAL) ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentScreen < totalScreens) {
        showScreen(currentScreen + 1);
    } else if (e.key === 'ArrowLeft' && currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
});

// ========== CONSOLE EASTER EGG ==========
console.log('%c💖 Made with Love 💖', 'font-size: 24px; color: #ff69b4; font-weight: bold;');
console.log('%c@anujbuilds', 'font-size: 16px; color: #b968c7;');

// ========== PERFORMANCE OPTIMIZATION ==========
// Pause animations when not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations
        document.body.style.animationPlayState = 'running';
    }
});
