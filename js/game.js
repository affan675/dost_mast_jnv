/* ============================================
   RAHIT'S REVENGE – MINI GAME LOGIC
   ============================================ */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-value');
const statusMessage = document.getElementById('status-message');

const GRID_SIZE = 20;
const TILE_SIZE = canvas.width / GRID_SIZE;

// 0: Path, 1: Wall, 2: Laptop (Goal)
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,2,1],
    [1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1],
    [1,2,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,2,0,1],
    [1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,1],
    [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

let player = { x: 1, y: 1, emoji: '🤓' };
let rageMode = false;
let enemies = [
    { x: 18, y: 1, emoji: '😈', type: 'Affan', dx: 0, dy: 0 },
    { x: 18, y: 17, emoji: '🔥', type: 'Chayan', dx: 0, dy: 0 }
];

let score = 0;
let totalLaptops = 0;
map.forEach(row => row.forEach(tile => { if(tile === 2) totalLaptops++; }));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                ctx.strokeStyle = '#333';
                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            } else if (map[y][x] === 2) {
                ctx.font = `${TILE_SIZE * 0.8}px Arial`;
                ctx.fillText('💻', x * TILE_SIZE + 2, y * TILE_SIZE + TILE_SIZE - 5);
            }
        }
    }

    // Draw Player
    ctx.font = `${TILE_SIZE * 0.8}px Arial`;
    ctx.fillText(player.emoji, player.x * TILE_SIZE + 2, player.y * TILE_SIZE + TILE_SIZE - 5);

    // Draw Enemies
    enemies.forEach(en => {
        ctx.fillText(en.emoji, en.x * TILE_SIZE + 2, en.y * TILE_SIZE + TILE_SIZE - 5);
    });
}

function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    if (map[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;

        if (map[newY][newX] === 2) {
            map[newY][newX] = 0;
            score += 10;
            scoreElement.textContent = score;
            statusMessage.textContent = "Evidence collected... but the Captains are angry!";
            
            if (score >= 50 && !rageMode) {
                rageMode = true;
                document.body.style.background = "#2a0000";
                statusMessage.textContent = "🚨 RAGE MODE: Captains are sprinting! 🚨";
            }

            if (score / 10 === totalLaptops) {
                alert("VICTORY! Rahit has enough evidence. The Captains are suspended!");
                window.location.href = 'index.html';
            }
        }
    }
    checkCollision();
}

function moveEnemies() {
    enemies.forEach(en => {
        // AFFAN BUFF: 40% chance to move twice (Sprint)
        // CHAYAN BUFF: 30% chance to move randomly (Strategist)
        let speedFactor = (en.type === 'Affan' && Math.random() > 0.6) ? 2 : 1;
        if (rageMode) speedFactor += 1; // Even faster in Rage Mode
        const isRandom = (en.type === 'Chayan' && Math.random() > 0.7);

        for (let i = 0; i < speedFactor; i++) {
            const directions = [{x:0,y:1}, {x:0,y:-1}, {x:1,y:0}, {x:-1,y:0}];
            
            // Hunting logic
            directions.sort((a, b) => {
                if (isRandom) return Math.random() - 0.5; // Break Rahit's ankles with random moves
                let distA = Math.abs((en.x + a.x) - player.x) + Math.abs((en.y + a.y) - player.y);
                let distB = Math.abs((en.x + b.x) - player.x) + Math.abs((en.y + b.y) - player.y);
                return distA - distB;
            });

            for (let dir of directions) {
                if (map[en.y + dir.y][en.x + dir.x] !== 1) {
                    en.x += dir.x;
                    en.y += dir.y;
                    break;
                }
            }
        }
    });
    checkCollision();
    draw();
}

function checkCollision() {
    enemies.forEach(en => {
        if (en.x === player.x && en.y === player.y) {
            alert(`BUSTED! ${en.type}: "Oye snitch! Tune socha humein pakad lega? Chal 500 pushups mar aur mess duty kar!"`);
            player.x = 1;
            player.y = 1;
            score = 0;
            scoreElement.textContent = score;
            // Reload laptops
            location.reload();
        }
    });
}

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': case 'w': movePlayer(0, -1); break;
        case 'ArrowDown': case 's': movePlayer(0, 1); break;
        case 'ArrowLeft': case 'a': movePlayer(-1, 0); break;
        case 'ArrowRight': case 'd': movePlayer(1, 0); break;
    }
    draw();
});

// Enemy movement interval
setInterval(moveEnemies, 280);

// Mobile Controls
window.move = function(dir) {
    if(dir === 'up') movePlayer(0,-1);
    if(dir === 'down') movePlayer(0,1);
    if(dir === 'left') movePlayer(-1,0);
    if(dir === 'right') movePlayer(1,0);
    draw();
};

draw();