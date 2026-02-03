import { clamp, dist, randGauss, randInt, random } from "./helper"
import { Plant } from "./plant"
import { Config, World } from "./world"


export class Creature {
    public x: number
    public y: number
    public vx: number
    public vy: number
    public energy: number
    public moveTimer: number

    public size: number
    public moveRate: number
    public moveStrength: number
    public breedEnergy: number
    public childEnergy: number

    private config: Config
    private id: number

    public constructor(config: Config, id: number, p1?: Creature, p2?: Creature) {
        this.config = config
        this.id = id
        if (!p1 || !p2) {
            this.size = randInt(1, 10)
            this.moveRate = randInt(0, 100)
            this.moveStrength = random(0, 10)
            this.breedEnergy = randInt(this.size*this.size, this.size*this.size*100)
            this.childEnergy = randInt(this.size*this.size, this.breedEnergy)

            if (config.cliffs) {
                this.x = random(config.width / 10, 9 * config.width / 10)
                this.y = random(config.height / 10, 9 * config.height / 10)
            } else {
                this.x = random(0, config.width)
                this.y = random(0, config.height)
            }
            this.vx = 0
            this.vy = 0
            this.energy = this.breedEnergy - 1
            this.moveTimer = this.moveRate
            return
        }
        // Initialize based on parents' traits
        this.moveRate = randInt(p1.moveRate, p2.moveRate) + randGauss(0, 20)
        this.moveTimer = 1;
        this.moveStrength = Math.max(0.1, 
            random(p1.moveStrength, p2.moveStrength) + randGauss(0, 0.2)
        )
        this.size = Math.max(1, 
            randInt(p1.size, p2.size) + randInt(-2, 2)
        )
        this.breedEnergy = Math.max(this.size, 
            Math.floor(
                random(p1.breedEnergy, p2.breedEnergy) + randGauss(0, 20)
            )
        )
        this.childEnergy = clamp(
            Math.floor(random(p1.childEnergy, p2.childEnergy) + randGauss(0, 10)),
            this.size,
            this.breedEnergy
        )
        this.x = p1.x
        this.y = p1.y
        this.energy = p1.childEnergy + p2.childEnergy
        this.vx = 0
        this.vy = 0
    }

    public step(world: World) {
        this.moveTimer -= 1;
        const [target, invert] = this.interactAndChooseTarget(world)
        if (target) {
            this.goTowards(target.x, target.y, invert)
        }
        this.x += this.vx
        this.y += this.vy
        this.checkBounds(world)

        if (this.config.sizeBasedFriction) {
            this.vx *= (1 - 1/(this.config.movementEase*this.size))
            this.vy *= (1 - 1/(this.config.movementEase*this.size))
        } else {
            this.vx *= (1 - 1/this.config.movementEase)
            this.vy *= (1 - 1/this.config.movementEase)
        }

        if (this.energy <= 0) {
            world.removeCreature(this)
        }
        return world
    }

    private goTowards(tx: number, ty: number, invert: boolean) {
        if (this.moveTimer > 0) {
            return
        }
        var dir: number = Math.atan((ty-this.y)/(tx-this.x));
        if (tx < this.x) {
            dir += Math.PI
        }
        if (invert) {
            dir += Math.PI
        }
        this.vx += Math.cos(dir) * this.moveStrength;
        this.vy += Math.sin(dir) * this.moveStrength;
        this.moveTimer = this.moveRate
        this.energy -= this.moveEnergy()
    }

    private interactAndChooseTarget(world: World): [Creature | Plant | undefined, boolean] {
        /* Interacts (eats/breeds) with other entities, and selects what direction to go in */
        // 1. Find nearest predator. If they're closer than any other priority, run away
        var closestPredator: Creature | undefined
        var predDist = this.sight()
        if (this.config.runFromPredators) {
            world.pop.filter(c => {
                return c !== this && this.sizeCompare(c) > 0
            }).forEach(c => {
                const d = dist(this, c)
                if (d < predDist) {
                    closestPredator = c
                    predDist = d
                }
            })
        }
        // 2. If sufficient energy, go towards mate and early return
        if (this.energy >= this.breedEnergy + this.moveEnergy()) {
            var closestMate: Creature | undefined
            var mateDist = predDist
            world.pop.filter(c => {
                return c !== this && this.sizeCompare(c) == 0 && c.energy >= c.breedEnergy
            }).forEach(c => {
                const d = dist(this, c)
                if (d < mateDist) {
                    closestMate = c
                    mateDist = d
                }
            })
            if (closestMate) {
                if (mateDist < this.size + closestMate.size) {
                    const child = new Creature(this.config, world.getNextID(), this, closestMate)
                    this.energy -= this.childEnergy
                    closestMate.energy -= closestMate.childEnergy
                    world.pop.push(child)
                }
                return [closestMate, false]
            }
        }

        // 3. Go towards closest food. Only consider options that are closer than the nearst pred
        var closestPlant: Plant | undefined
        var plantDist = predDist
        world.plants.forEach(p => {
            const d = dist(this, p)
            if (d < plantDist) {
                closestPlant = p
                plantDist = d
            }
        })
        if (closestPlant && plantDist < this.size + 2) {
            this.energy += this.config.plantEnergy
            world.removePlant(closestPlant)
        }

        var closestMeat: Creature | undefined
        var meatDist = predDist
        world.pop.filter(c => {
            return c !== this && this.sizeCompare(c) == -1
        }).forEach(c => {
            const d = dist(this, c)
            if (d < meatDist) {
                closestMeat = c
                meatDist = d
            }
        })
        if (closestMeat && meatDist < this.size + closestMeat.size) {
            this.energy += closestMeat.energy
            world.removeCreature(closestMeat)
        }

        if (closestPlant && closestMeat) {
            if (plantDist < meatDist) {
                return [closestPlant, false]
            }
            return [closestMeat, false]
        }
        if (closestPlant) {
            return [closestPlant, false]
        }
        if (closestMeat) {
            return [closestMeat, false]
        }
        return [closestPredator, true]
    }

    private checkBounds(world: World) {
        if (this.config.cliffs) {
            if (
                this.x <= 0 ||
                this.y <= 0 ||
                this.x >= this.config.width ||
                this.y >= this.config.height
            ) {
                world.removeCreature(this)
            }
            return
        }
        this.x = clamp(this.x, this.size, this.config.width - this.size)
        this.y = clamp(this.y, this.size, this.config.height - this.size)

        if (this.x == this.size) {
            this.vx = Math.max(this.vx, 0)
        } else if (this.x == this.config.width - this.size) {
            this.vx = Math.min(this.vx, 0)
        }
        if (this.y == this.size) {
            this.vy = Math.max(this.vy, 0)
        } else if (this.y == this.config.height - this.size) {
            this.vy = Math.min(this.vy, 0)
        }
    }

    /* Helpers */

    private sight(): number {
        return this.config.sightBase +
            this.size * this.config.sightLinear +
            Math.log(this.size) * this.config.sightLog
    }

    private moveEnergy() {
        const cfg = this.config
        return this.moveStrength * (
            cfg.moveEnergyBase +
            Math.log(this.size) * cfg.moveEnergyLog +
            this.size * cfg.moveEnergyLinear +
            this.size * this.size * cfg.moveEnergyQuadratic
        )
    }

    public sizeCompare(c: Creature) {
        /* Returns:
            -1 if c is significantly smaller
            1  if c is significantly larger
            0  if c is roughly the same size
        */
       if (this.size > c.size * 2) {
        return -1
       }
       if (c.size > this.size * 2) {
        return 1
       }
       return 0
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        if (this.energy >= this.breedEnergy) {
            ctx.fillStyle = "#f00"
        } else {
            ctx.fillStyle = "#00f"
        }
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.fill()
        ctx.stroke()
    }
}