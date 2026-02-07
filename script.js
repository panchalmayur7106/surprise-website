// Hearts Animation
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

// Screen Transition
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const tapButton = document.getElementById('tapButton');

// Auto transition from screen 1 to screen 2 after 3 seconds
setTimeout(() => {
    screen1.classList.remove('active');
    setTimeout(() => {
        screen2.classList.add('active');
    }, 500);
}, 3000);

// Button click handler - you can customize this
tapButton.addEventListener('click', () => {
    // Add your custom action here
    // For example: redirect to another page, show a message, etc.
    
    // Example: Create a burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // Example: You can redirect to another page
    // window.location.href = 'next-page.html';
    
    // Or show an alert
    // alert('💖 Let\'s begin this special journey! 💖');
    
    console.log('Button clicked! Add your custom action here.');
});

// Add sparkles effect on mouse move (optional)
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

// Prevent default drag behavior
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Add touch support for mobile
tapButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    tapButton.style.transform = 'scale(0.95)';
});

tapButton.addEventListener('touchend', (e) => {
    e.preventDefault();
    tapButton.style.transform = 'scale(1.1)';
    
    // Trigger click event
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    console.log('Button tapped! Add your custom action here.');
});
