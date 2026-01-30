import { dist, randint, random } from "./helper"
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

    public constructor(config: Config) {
        this.size = randint(1, 5)
        this.moveRate = randint(0, 100)
        this.moveStrength = random(0, 50)
        this.breedEnergy = randint(this.size*this.size, this.size*this.size*100)
        this.childEnergy = randint(this.size*this.size, this.breedEnergy)

        this.x = random(0, config.width)
        this.y = random(0, config.height)
        this.vx = 0
        this.vy = 0
        this.energy = 50
        this.moveTimer = this.moveRate

        this.config = config
    }

    public step(world: World) {
        const target = this.chooseTarget(world)
        if (target) {
            this.goTowards(target.x, target.y, false)
        }
        // TODO finish
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
        this.moveTimer += this.moveRate
        this.energy -= this.moveEnergy()
    }

    private chooseTarget(world: World): Creature | Plant | undefined {
        // TODO?: Run from predators
        var closestDist: number = this.sight()
        // 1. If sufficient energy, go towards mate and early return
        if (this.energy >= this.breedEnergy) {
            var closestMate: Creature | undefined
            world.pop.filter(c => {
                c !== this && c.size >= this.size / 2 && c.size <= this.size * 2 && c.energy >= c.breedEnergy
            }).forEach(c => {
                const d = dist(this, c)
                if (d < closestDist) {
                    closestMate = c
                    closestDist = d
                }
            })
            if (closestMate != null) {
                return closestMate
            }
        }

        // 2. Go towards closest food
        var closestPlant: Plant | undefined
        var plantDist = this.sight()
        world.plants.forEach(p => {
            const d = dist(this, p)
            if (d < plantDist) {
                closestPlant = p
                plantDist = d
            }
        })

        var closestMeat: Creature | undefined
        var meatDist = this.sight()
        world.pop.filter(c => {
            c !== this && c.size < this.size / 2
        }).forEach(c => {
            const d = dist(this, c)
            if (d < meatDist) {
                closestMeat = c
                closestDist = d
            }
        })

        if (closestPlant && closestMeat) {
            if (plantDist < meatDist) {
                return closestPlant
            }
            return closestMeat
        }
        if (closestPlant) {
            return closestPlant
        }
        return closestMeat
    }

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
}