document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('gameContainer');
    const scoreDisplay = document.getElementById('score');
    const letterSound = document.getElementById('letterSound');
    let score = 0;

    function updateScore(points) {
        score += points;
        scoreDisplay.textContent = score;
    }

    function playSound(letter) {
        if (!letterSound.paused) return;  // Check if audio is playing and skip if it is
        letterSound.src = `sounds/${letter}.mp3`;
        letterSound.play().catch(error => console.error("Failed to play the sound:", error));
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
        balloon.style.left = `${Math.floor(Math.random() * 90)}vw`;
        balloon.style.top = '-100px';
        gameContainer.appendChild(balloon);

        let speed = 1;
        let interval = setInterval(() => {
            if (parseInt(balloon.style.top, 10) + speed > window.innerHeight) {
                clearInterval(interval);
                if (balloon.parentNode === gameContainer) {
                    gameContainer.removeChild(balloon);
                }
            } else {
                balloon.style.top = `${parseInt(balloon.style.top, 10) + speed}px`;
            }
        }, 20);
    }

    setInterval(createBalloon, 800);

    document.addEventListener('keydown', function (event) {
        document.querySelectorAll('.balloon').forEach(balloon => {
            if (balloon.textContent === event.key.toUpperCase()) {
                updateScore(10);
                playSound(balloon.textContent);
                if (balloon.parentNode === gameContainer) {
                    gameContainer.removeChild(balloon);
                }
            }
        });
    });
});

