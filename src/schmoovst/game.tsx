import { useEffect, useRef } from "react";
import p1Image from './image/p1.png'
import p2Image from './image/p2.png'
import p3Image from './image/p3.png'
import p4Image from './image/p4.png'
import bulletImage from './image/ship_B.png'
import enemyImage from './image/enemy.png'
import xpImage from './image/xp.png'
import upgradeSpeedImage from './image/upgrade_speed.svg'
import upgradeStrengthImage from './image/upgrade_strength.svg'
import upgradeBulletCountImage from './image/upgrade_bulletcount.svg'
import upgradeFireRateImage from './image/upgrade_firerate.svg'
import upgradeRangeImage from './image/upgrade_range.svg'
import upgradeTurnSpeedImage from './image/upgrade_turnspeed.svg'
import upgradeGravityImage from './image/upgrade_gravity.svg'
import { useLocation } from "react-router-dom";

enum LevelUpName {
    BULLET_COUNT = "bulletCount",  // dark green
    FIRE_RATE = "fireRate",        // green
    GRAVITY = "gravity",           // orange
    RANGE = "range",               // yellow
    SPEED = "speed",               // blue
    STRENGTH = "strength",         // red
    TURN_SPEED = "turnSpeed",      // cyan
}

type LevelUpOption = {
    name: LevelUpName;
    friendlyName: string;
    image: string;
    effect: (player: Player) => void;
    getLevel: (player: Player) => number;
}

const LEVEL_UP_OPTIONS: LevelUpOption[] = [
    {
        name: LevelUpName.BULLET_COUNT,
        friendlyName: "Bullet Count",
        image: upgradeBulletCountImage,
        effect: (player: Player) => { player.bulletCount++; },
        getLevel: (player: Player) => { return player.bulletCount; }
    },
    {
        name: LevelUpName.FIRE_RATE,
        friendlyName: "Fire Rate",
        image: upgradeFireRateImage,
        effect: (player: Player) => { player.fireRate++; },
        getLevel: (player: Player) => { return player.fireRate; }
    },
    {
        name: LevelUpName.GRAVITY,
        friendlyName: "Gravity",
        image: upgradeGravityImage,
        effect: (player: Player) => { player.gravity++; },
        getLevel: (player: Player) => { return player.gravity; }
    },
    {
        name: LevelUpName.RANGE,
        friendlyName: "Range",
        image: upgradeRangeImage,
        effect: (player: Player) => { player.range++; },
        getLevel: (player: Player) => { return player.range; }
    },
    {
        name: LevelUpName.SPEED,
        friendlyName: "Move Speed",
        image: upgradeSpeedImage,
        effect: (player: Player) => { player.speed++; },
        getLevel: (player: Player) => { return player.speed; }
    },
    {
        name: LevelUpName.STRENGTH,
        friendlyName: "Strength",
        image: upgradeStrengthImage,
        effect: (player: Player) => { player.strength++; },
        getLevel: (player: Player) => { return player.strength; }
    },
    {
        name: LevelUpName.TURN_SPEED,
        friendlyName: "Turn Speed",
        image: upgradeTurnSpeedImage,
        effect: (player: Player) => { player.turnSpeed++; },
        getLevel: (player: Player) => { return player.turnSpeed; }
    },
];

type Player = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
    hp: number;
    xp: number;
    level: number;

    // upgradeable stats, all default to 1 and increment by 1 when upgraded
    bulletCount: number;
    fireRate: number;
    gravity: number;
    range: number;
    speed: number;
    strength: number;
    turnSpeed: number;

    // level up menu navigation
    levelUpMenuOpen: boolean;
    levelUpOptions: LevelUpOption[];
    selectedLevelUp: number; // 0-2 for left/center/right
    buttonState: ButtonState;
}

type ButtonState = {
    leftBumper: boolean;
    rightBumper: boolean;
    face: boolean;
}

type Bullet = {
    id: string;
    playerId: number;
    x: number;
    y: number;
    angle: number;
    age: number;
}

type Enemy = {
    id: string;
    level: number;
    size: number;
    x: number;
    y: number;

    // upgradeable stats
    hp: number;
    speed: number;
}

type XP = {
    id: string;
    x: number;
    y: number;
}

type PlayerStats = {
    id: number;
    kills: number;
    level: number;
    timeAlive: number;
}

type GameState = {
    players: Player[];
    bullets: Bullet[];
    enemies: Enemy[];
    xps: XP[];
    stats: PlayerStats[];
}

let nextEnemyId = 1;
let nextBulletId = 1;
let nextXpId = 1;

function levelUp(player: Player, option: LevelUpOption) {
    option.effect(player);
    player.levelUpMenuOpen = false;
    player.levelUpOptions = [];
    player.buttonState = {
        leftBumper: false,
        rightBumper: false,
        face: false,
    };
    player.xp -= player.level * LEVEL_UP_RATE;
    player.level++;
    if (player.xp >= player.level * LEVEL_UP_RATE) {
        openLevelUpMenu(player);
    }
}

function openLevelUpMenu(player: Player) {
    // Weight options based on level
    const weightedOptions = LEVEL_UP_OPTIONS.reduce((acc, option) => {
        for (let i = 0; i < option.getLevel(player); i++) {
            acc.push(option);
        }
        return acc;
    }, [] as LevelUpOption[]);
    player.levelUpOptions = weightedOptions.sort(() => Math.random() - 0.5).filter((option, index, self) =>
        self.findIndex(t => t.name === option.name) === index
    ).slice(0, 3);
    player.selectedLevelUp = 1;
    player.levelUpMenuOpen = true;
}

const SHOOT_INTERVAL = 60;
const BULLET_SPEED = 10;
const BULLET_LIFETIME = 10;
const ENEMY_SPAWN_INTERVAL = 60;
const ENEMY_UPGRADE_INTERVAL = 30 * 60; // 30 seconds
const XP_SPEED = 10;
const LEVEL_UP_RATE = 5;
const PLAYER_HP = 100;
const BULLET_SPREAD = 5;

export default function ShooterGame() {
    let { numPlayers } = useLocation().state as { numPlayers: number }
    if (numPlayers === undefined) {
        numPlayers = 1;
    } else if (numPlayers < 1) {
        numPlayers = 1;
    } else if (numPlayers > 4) {
        numPlayers = 4;
    }
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    const SHIP_SIZE = Math.min(WIDTH, HEIGHT) / 48;
    const PLAYER_SPEED = 0.0025 * SHIP_SIZE;
    const BULLET_SIZE = SHIP_SIZE / 2;
    const ENEMY_SPAWN_RADIUS = 2;
    const ENEMY_SPEED = 0.01 * SHIP_SIZE;
    const ENEMY_KNOCKBACK = 1;
    const ENEMY_SIZE = SHIP_SIZE;
    const XP_SIZE = SHIP_SIZE / 2;

    const startOffset = Math.max(WIDTH / 16, HEIGHT / 16);

    // playerStartPositions[i][j] = where player j starts in an i-player game
    // i is 1-indexed, j is 0-indexed
    const playerStartPositions = [[], [
        { x: WIDTH / 2, y: HEIGHT / 2, angle: 0 }
    ], [
        { x: startOffset, y: startOffset, angle: 135 },
        { x: WIDTH - startOffset, y: HEIGHT - startOffset, angle: 315 }
    ], [
        { x: startOffset, y: startOffset, angle: 135 },
        { x: WIDTH - startOffset, y: startOffset, angle: 225 },
        { x: WIDTH / 2, y: HEIGHT - startOffset, angle: 0 }
    ], [
        { x: startOffset, y: startOffset, angle: 135 },
        { x: WIDTH - startOffset, y: startOffset, angle: 225 },
        { x: startOffset, y: HEIGHT - startOffset, angle: 45 },
        { x: WIDTH - startOffset, y: HEIGHT - startOffset, angle: 315 }
    ]]

    const gameStateRef = useRef<GameState>({
        players: playerStartPositions[numPlayers].map((position, index) => ({
            id: index,
            ...position,
            vx: 0,
            vy: 0,
            hp: PLAYER_HP,
            xp: 0,
            level: 1,

            bulletCount: 1,
            fireRate: 1,
            gravity: 1,
            range: 1,
            speed: 1,
            strength: 1,
            turnSpeed: 1,

            levelUpMenuOpen: false,
            selectedLevelUp: 1,
            levelUpOptions: [],
            buttonState: {
                leftBumper: false,
                rightBumper: false,
                face: false,
            },
        })),
        bullets: [],
        enemies: [],
        xps: [],
        stats: Array.from({ length: numPlayers }, (_, index) => ({
            id: index,
            kills: 0,
            level: 0,
            timeAlive: 0,
        })),
    })

    useEffect(() => {
        let startFlag = false;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const p1Img = new Image();
        p1Img.src = p1Image;
        const p2Img = new Image();
        p2Img.src = p2Image;
        const p3Img = new Image();
        p3Img.src = p3Image;
        const p4Img = new Image();
        p4Img.src = p4Image;
        const playerImages = [p1Img, p2Img, p3Img, p4Img];
        const bulletImg = new Image();
        bulletImg.src = bulletImage;
        const enemyImg = new Image();
        enemyImg.src = enemyImage;
        const xpImg = new Image();
        xpImg.src = xpImage;
        let animationId: number;

        const spawnEnemy = (level: number) => {
            let spawnX = Math.random() * WIDTH;
            let spawnY = Math.random() * HEIGHT;
            const size = ENEMY_SIZE * (level * 0.5 + 0.5);
            let doSpawn = true;
            let nearestDistance = Math.sqrt((spawnX - gameStateRef.current.players[0].x) ** 2 + (spawnY - gameStateRef.current.players[0].y) ** 2);
            gameStateRef.current.players.forEach(player => {
                const distance = Math.sqrt((spawnX - player.x) ** 2 + (spawnY - player.y) ** 2);
                if (distance < ENEMY_SPAWN_RADIUS * size) {
                    doSpawn = false;
                } else if (distance < nearestDistance) {
                    nearestDistance = distance;
                }
            });
            let hp = 1;
            let speed = 1;
            for (let i = 1; i < level; i++) {
                const choice = Math.random();
                if (choice < 1 / 2) {
                    hp++;
                } else {
                    speed++;
                }
            }
            if (doSpawn) {
                gameStateRef.current.enemies.push({
                    id: `${nextEnemyId++}`,
                    level: level,
                    size: size,
                    x: spawnX,
                    y: spawnY,
                    hp: hp,
                    speed: speed,
                });
            }
        }

        let gameOver = false;
        const draw = () => {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            // Draw players
            gameStateRef.current.players.forEach((player) => {
                // Draw player ship
                ctx.save();
                ctx.translate(player.x, player.y);
                ctx.rotate(player.angle * Math.PI / 180);
                ctx.drawImage(playerImages[player.id], -SHIP_SIZE / 2, -SHIP_SIZE / 2, SHIP_SIZE, SHIP_SIZE);
                ctx.restore();
                // Draw HP ring
                ctx.save();
                ctx.translate(player.x, player.y);
                ctx.strokeStyle = '#ff000099';
                ctx.lineWidth = SHIP_SIZE / 4;
                ctx.beginPath();
                ctx.arc(0, 0, SHIP_SIZE, 0, 2 * Math.PI * player.hp / PLAYER_HP);
                ctx.stroke();
                ctx.restore();
                // Draw XP ring
                ctx.save();
                ctx.translate(player.x, player.y);
                ctx.strokeStyle = '#33ffff99';
                ctx.lineWidth = SHIP_SIZE / 4;
                ctx.beginPath();
                ctx.arc(0, 0, SHIP_SIZE * 0.75, 0, 2 * Math.PI * player.xp / (player.level * LEVEL_UP_RATE));
                ctx.stroke();
                ctx.restore();
                // Draw level up menu attached to player
                if (player.levelUpMenuOpen) {
                    player.levelUpOptions.forEach((option, index) => {
                        const img = new Image();
                        img.src = option.image;
                        ctx.save();
                        ctx.translate(player.x, player.y - SHIP_SIZE);
                        ctx.drawImage(img, -SHIP_SIZE / 2 + (SHIP_SIZE * (index - 1)), SHIP_SIZE * 2, SHIP_SIZE, SHIP_SIZE);
                        ctx.restore();
                    });
                    ctx.save();
                    ctx.translate(player.x, player.y - SHIP_SIZE);
                    player.levelUpOptions.forEach((option, index) => {
                        if (index === player.selectedLevelUp) {
                            ctx.fillStyle = 'white';
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = 'white';
                            ctx.strokeRect(-SHIP_SIZE / 2 + (SHIP_SIZE * (index - 1)), SHIP_SIZE * 2, SHIP_SIZE, SHIP_SIZE);
                            // Draw name of upgrade
                            ctx.font = '12px sans-serif';
                            const textWidth = ctx.measureText(option.friendlyName).width;
                            ctx.fillText(option.friendlyName, -textWidth / 2, SHIP_SIZE * 3 + 12);
                        }
                    });
                    ctx.restore();
                }
            });
            // Draw bullets
            gameStateRef.current.bullets.forEach(bullet => {
                ctx.save();
                ctx.translate(bullet.x, bullet.y);
                ctx.rotate(bullet.angle * Math.PI / 180);
                ctx.drawImage(bulletImg, -BULLET_SIZE / 2, -BULLET_SIZE / 2, BULLET_SIZE, BULLET_SIZE);
                ctx.restore();
            });
            // Draw enemies
            gameStateRef.current.enemies.forEach(enemy => {
                ctx.save();
                ctx.translate(enemy.x, enemy.y);
                ctx.drawImage(enemyImg, -enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size);
                ctx.restore();
            });
            // Draw xps
            gameStateRef.current.xps.forEach(xp => {
                ctx.save();
                ctx.translate(xp.x, xp.y);
                ctx.drawImage(xpImg, -XP_SIZE / 2, -XP_SIZE / 2, XP_SIZE, XP_SIZE);
                ctx.restore();
            });

            // Draw stats
            if (gameOver) {
                gameStateRef.current.stats.forEach((stat, index) => {
                    // Stats window background
                    ctx.save();
                    ctx.translate(startOffset * 2, startOffset * 2);
                    ctx.fillStyle = '#00000066';
                    ctx.strokeStyle = '#ffffff99';
                    ctx.lineWidth = SHIP_SIZE / 4;
                    ctx.beginPath();
                    ctx.roundRect(0, 0, WIDTH - startOffset * 4, HEIGHT - startOffset * 4, 10);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();

                    // Game over text
                    ctx.save();
                    ctx.translate(WIDTH / 2, startOffset * 2 + 48);
                    ctx.font = '32px LogoFont';
                    ctx.fillStyle = 'white';
                    const textWidth = ctx.measureText('Game Over').width;
                    ctx.fillText('Game Over', -textWidth / 2, 0);
                    ctx.restore();

                    // Stats headers
                    ctx.save();
                    ctx.translate(startOffset * 2 + 200, startOffset * 2 + 100);
                    ctx.font = 'bold 24px sans-serif';
                    ctx.fillStyle = 'white';
                    ctx.fillText('Time', 0, 0);
                    ctx.translate(150, 0);
                    ctx.fillText('Kills', 0, 0);
                    ctx.translate(100, 0);
                    ctx.fillText('Level', 0, 0);
                    ctx.restore();

                    // Stats text
                    const sortedStats = gameStateRef.current.stats.sort((a, b) => b.timeAlive - a.timeAlive);
                    sortedStats.forEach((stat, index) => {
                        ctx.save();
                        ctx.translate(startOffset * 2 + 50, startOffset * 2 + 150 + index * 50);
                        ctx.font = 'bold 24px sans-serif';
                        ctx.fillStyle = 'white';
                        ctx.fillText(`Player ${stat.id + 1}`, 0, 0);
                        ctx.translate(150, 0);
                        ctx.fillText(`${stat.timeAlive.toFixed(1)}s`, 0, 0);
                        ctx.translate(150, 0);
                        ctx.fillText(`${stat.kills}`, 0, 0);
                        ctx.translate(100, 0);
                        ctx.fillText(`${stat.level}`, 0, 0);
                        ctx.restore();
                    });
                });
            }
        }

        const step = () => {
            draw();
            if (gameOver) {
                animationId = requestAnimationFrame(step);
                return;
            }
            const gamepads = navigator.getGamepads();
            gameStateRef.current.players.forEach((player, index) => {
                const gamepad = gamepads[index];
                // Movement
                if (gamepad) {
                    const axes = [0, 0, 0, 0];
                    for (let i = 0; i < gamepad.axes.length; i++) {
                        if (Math.abs(gamepad.axes[i]) > 0.3) { // large deadzone because my controllers are bad :(
                            axes[i] = gamepad.axes[i];
                        }
                    }
                    player.vx += axes[0] * PLAYER_SPEED * player.speed;
                    player.vy += axes[1] * PLAYER_SPEED * player.speed;

                    if (axes[2] !== 0 || axes[3] !== 0) {
                        const targetAngle = Math.atan2(axes[2], -axes[3]) * 180 / Math.PI;
                        const maxStep = player.turnSpeed;
                        let delta = ((targetAngle - player.angle + 540) % 360) - 180;
                        if (delta > maxStep) {
                            delta = maxStep;
                        } else if (delta < -maxStep) {
                            delta = -maxStep;
                        }
                        player.angle = (player.angle + delta + 360) % 360;
                    }

                    // Level up menu navigation
                    const buttonState: ButtonState = {
                        leftBumper: gamepad.buttons[4].pressed,
                        rightBumper: gamepad.buttons[5].pressed,
                        face: gamepad.buttons[0].pressed || gamepad.buttons[1].pressed || gamepad.buttons[2].pressed || gamepad.buttons[3].pressed,
                    };
                    if (player.levelUpMenuOpen) {
                        if (buttonState.leftBumper && !player.buttonState.leftBumper) {
                            // Left bumper
                            player.selectedLevelUp--;
                            if (player.selectedLevelUp < 0) {
                                player.selectedLevelUp = 2;
                            }
                        }
                        if (buttonState.rightBumper && !player.buttonState.rightBumper) {
                            // Right bumper
                            player.selectedLevelUp++;
                            if (player.selectedLevelUp > 2) {
                                player.selectedLevelUp = 0;
                            }
                        }
                        if (buttonState.face && !player.buttonState.face) {
                            // Any face button
                            levelUp(player, player.levelUpOptions[player.selectedLevelUp]);
                        }
                    }
                    player.buttonState = buttonState;
                }
                // Pick up XP
                gameStateRef.current.xps.forEach(xp => {
                    if (Math.sqrt((player.x - xp.x) ** 2 + (player.y - xp.y) ** 2) < SHIP_SIZE / 2) {
                        // Player picks up XP
                        gameStateRef.current.xps = gameStateRef.current.xps.filter(x => x.id !== xp.id);
                        player.xp++;
                        if (player.xp >= player.level * LEVEL_UP_RATE && !player.levelUpMenuOpen) {
                            openLevelUpMenu(player);
                        }
                    }
                });

                // Shooting
                const shootInterval = Math.floor(SHOOT_INTERVAL / player.fireRate);
                if (animationId % shootInterval === 0) {
                    for (let i = 0; i < player.bulletCount; i++) {
                        const angleDelta = (2 * i - player.bulletCount + 1) * BULLET_SPREAD;
                        gameStateRef.current.bullets.push({
                            id: `${nextBulletId++}`,
                            playerId: player.id,
                            x: player.x,
                            y: player.y,
                            angle: player.angle + angleDelta,
                            age: 0,
                        });
                    }
                }

                // Death
                if (player.hp <= 0) {
                    gameStateRef.current.players = gameStateRef.current.players.filter(p => p.id !== player.id);
                    gameStateRef.current.bullets = gameStateRef.current.bullets.filter(b => b.playerId !== player.id);
                    gameStateRef.current.stats[player.id].level = player.level;
                    gameStateRef.current.stats[player.id].timeAlive = animationId / 60;
                    if (gameStateRef.current.players.length === 0) {
                        // Game over
                        gameOver = true;
                    }
                }
                player.x += player.vx;
                if (player.x < 0) {
                    player.x = 0;
                } else if (player.x > WIDTH) {
                    player.x = WIDTH;
                }
                player.y += player.vy;
                if (player.y < 0) {
                    player.y = 0;
                } else if (player.y > HEIGHT) {
                    player.y = HEIGHT;
                }
                player.vx *= 0.9;
                player.vy *= 0.9;
            });
            if (gameOver) {
                animationId = requestAnimationFrame(step);
                return;
            }

            // Move bullets
            gameStateRef.current.bullets.forEach(bullet => {
                bullet.x += Math.sin(bullet.angle * Math.PI / 180) * BULLET_SPEED;
                bullet.y -= Math.cos(bullet.angle * Math.PI / 180) * BULLET_SPEED;
                bullet.age++;
                gameStateRef.current.enemies.forEach(enemy => {
                    if (Math.sqrt((bullet.x - enemy.x) ** 2 + (bullet.y - enemy.y) ** 2) < enemy.size / 2) {
                        // Enemy hit
                        const player = gameStateRef.current.players.find(p => p.id === bullet.playerId);
                        enemy.hp -= player!.strength;
                        if (enemy.hp <= 0) {
                            // Enemy dies
                            for (let i = 0; i < enemy.level; i++) {
                                gameStateRef.current.xps.push({
                                    id: `${nextXpId++}`,
                                    x: enemy.x + Math.random() * enemy.size - enemy.size / 2,
                                    y: enemy.y + Math.random() * enemy.size - enemy.size / 2,
                                });
                            }
                            gameStateRef.current.enemies = gameStateRef.current.enemies.filter(e => e.id !== enemy.id);
                            gameStateRef.current.stats[player!.id].kills++;
                            spawnEnemy(enemy.level + 1);
                        }
                        bullet.age = BULLET_LIFETIME * player!.range;
                    }
                });
                gameStateRef.current.players.forEach(player => {
                    if (Math.sqrt((bullet.x - player.x) ** 2 + (bullet.y - player.y) ** 2) < SHIP_SIZE / 2) {
                        const sourcePlayer = gameStateRef.current.players.find(p => p.id === bullet.playerId);
                        if (player.id !== sourcePlayer!.id) {
                            player.hp -= sourcePlayer!.strength;
                            bullet.age = BULLET_LIFETIME * sourcePlayer!.range;
                        }
                    }
                });
            });

            // Expire bullets
            gameStateRef.current.bullets = gameStateRef.current.bullets.filter(bullet => {
                const player = gameStateRef.current.players.find(p => p.id === bullet.playerId);
                return bullet.age < BULLET_LIFETIME * player!.range;
            });

            // Spawn enemies
            if (!startFlag) {
                startFlag = true;
                for (let i = 0; i < 20; i++) {
                    spawnEnemy(1);
                }
            }
            if (animationId % ENEMY_SPAWN_INTERVAL === 0) {
                spawnEnemy(Math.ceil(animationId / ENEMY_UPGRADE_INTERVAL));
            }
            // Move enemies
            gameStateRef.current.enemies.forEach(enemy => {
                let nearestPlayer = gameStateRef.current.players[0];
                let nearestDistance = Math.sqrt((nearestPlayer.x - enemy.x) ** 2 + (nearestPlayer.y - enemy.y) ** 2);
                gameStateRef.current.players.forEach(player => {
                    const distance = Math.sqrt((player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestPlayer = player;
                    }
                });
                const angle = Math.atan2(nearestPlayer.x - enemy.x, nearestPlayer.y - enemy.y) * 180 / Math.PI;
                enemy.x += Math.sin(angle * Math.PI / 180) * ENEMY_SPEED * enemy.speed;
                enemy.y += Math.cos(angle * Math.PI / 180) * ENEMY_SPEED * enemy.speed;
                // Damage player
                if (Math.sqrt((nearestPlayer.x - enemy.x) ** 2 + (nearestPlayer.y - enemy.y) ** 2) < (enemy.size / 2 + SHIP_SIZE / 2)) {
                    nearestPlayer.vx = Math.sin(angle * Math.PI / 180) * ENEMY_KNOCKBACK;
                    nearestPlayer.vy = Math.cos(angle * Math.PI / 180) * ENEMY_KNOCKBACK;
                    nearestPlayer.hp -= enemy.level;
                    gameStateRef.current.enemies = gameStateRef.current.enemies.filter(e => e.id !== enemy.id);
                }
            });

            // move xps to nearest player
            gameStateRef.current.xps.forEach(xp => {
                let nearestPlayer = gameStateRef.current.players[0];
                let nearestDistance = Math.sqrt((xp.x - gameStateRef.current.players[0].x) ** 2 + (xp.y - gameStateRef.current.players[0].y) ** 2);
                gameStateRef.current.players.forEach(player => {
                    const distance = Math.sqrt((xp.x - player.x) ** 2 + (xp.y - player.y) ** 2);
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestPlayer = player;
                    }
                });
                const angle = Math.atan2(nearestPlayer.x - xp.x, nearestPlayer.y - xp.y) * 180 / Math.PI;
                xp.x += Math.sin(angle * Math.PI / 180) * XP_SPEED * nearestPlayer.gravity / nearestDistance;
                xp.y += Math.cos(angle * Math.PI / 180) * XP_SPEED * nearestPlayer.gravity / nearestDistance;
            });
            // draw();
            animationId = requestAnimationFrame(step);
        };

        step();
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [BULLET_SIZE, ENEMY_SIZE, ENEMY_SPEED, HEIGHT, PLAYER_SPEED, SHIP_SIZE, WIDTH, XP_SIZE, startOffset]);
    return (
        <div style={{
            backgroundColor: '#333',
            width: '100%',
            height: '100%',
        }}>
            <canvas
                style={{ display: 'block' }}
                width={WIDTH}
                height={HEIGHT}
                ref={canvasRef}
            />
        </div>
    )
}