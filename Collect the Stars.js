window.collectTheStars = () => {
    // Initialize the app
    const app = new window.PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
    document.body.appendChild(app.view);

    // Load assets
    app.loader
        .add('player', 'collect-the-stars/player.png')
        .add('star', 'collect-the-stars/star.png')
        .load(setup);

    let player, stars = [], score = 0, scoreText;

    function setup() {
        // Player sprite
        player = new PIXI.Sprite(app.loader.resources['player'].texture);
        player.x = app.view.width / 2;
        player.y = app.view.height - 50;
        player.anchor.set(0.5);
        player.vx = 0;
        player.vy = 0;
        app.stage.addChild(player);

        // Score text
        scoreText = new PIXI.Text('Score: 0', { fontSize: 24, fill: 0xffffff });
        scoreText.position.set(10, 10);
        app.stage.addChild(scoreText);

        // Create initial stars
        createStar();
        createStar();

        // Keyboard controls
        setupKeyboardControls();

        // Game loop
        app.ticker.add(delta => gameLoop(delta));
    }

    function gameLoop(delta) {
        // Update player position
        player.x += player.vx;
        player.y += player.vy;

        // Keep player within screen bounds
        player.x = Math.max(0, Math.min(app.view.width, player.x));
        player.y = Math.max(0, Math.min(app.view.height, player.y));

        // Check for collisions with stars
        stars.forEach((star, index) => {
            if (hitTestRectangle(player, star)) {
                // Increase score and remove star
                score++;
                scoreText.text = `Score: ${score}`;
                app.stage.removeChild(star);
                stars.splice(index, 1);
                createStar(); // Add a new star to replace the collected one
            }
        });
    }

    function createStar() {
        const star = new PIXI.Sprite(app.loader.resources['star'].texture);
        star.x = Math.random() * app.view.width;
        star.y = Math.random() * app.view.height;
        star.anchor.set(0.5);
        app.stage.addChild(star);
        stars.push(star);
    }

    function hitTestRectangle(r1, r2) {
        const bounds1 = r1.getBounds();
        const bounds2 = r2.getBounds();
        return bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y;
    }

    function setupKeyboardControls() {
        const keys = {};

        window.addEventListener('keydown', (e) => {
            keys[e.code] = true;
            updatePlayerVelocity();
        });

        window.addEventListener('keyup', (e) => {
            keys[e.code] = false;
            updatePlayerVelocity();
        });

        function updatePlayerVelocity() {
            player.vx = (keys['ArrowRight'] ? 5 : 0) - (keys['ArrowLeft'] ? 5 : 0);
            player.vy = (keys['ArrowDown'] ? 5 : 0) - (keys['ArrowUp'] ? 5 : 0);
        }
    }
}
