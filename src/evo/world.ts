import { Creature } from "./creature"
import { Plant } from "./plant"

export type Config = {
    runFromPredators: boolean
    plantEnergy: number
    minMeatEnergy: number
    sightBase: number
    sightLog: number
    sightLinear: number
    moveEnergyBase: number
    moveEnergyLog: number
    moveEnergyLinear: number
    moveEnergyQuadratic: number
    sizeBasedFriction: boolean
    fixedFriction: number
    scalingFriction: number
    cliffs: boolean
    plantFrequency: number
    plantLimit: number
    width: number
    height: number
}

export class World {
    config: Config
    pop: Creature[]
    plants: Plant[]
    nextID: number
    time: number

    public constructor(config: Config) {
        this.config = config
        this.pop = []
        this.plants = []
        this.nextID = 0
        this.time = 0
        for (var i=0; i<500; i++) {
            this.pop.push(new Creature(config, this.nextID))
            // this.plants.push(new Plant(config))
            this.nextID++
        }
    }

    public step() {
        this.pop.forEach(c => {
            c.step(this)
        })
        if (this.time % this.config.plantFrequency == 0) {
            this.addPlant()
        }
    }

    public addPlant() {
        if (this.config.plantLimit > 0 && this.plants.length > this.config.plantLimit) {
            this.plants.shift()
        }
        this.plants.push(new Plant(this.config))
    }

    public removePlant(plant: Plant) {
        this.plants = this.plants.filter(p => p !== plant)
    }

    public removeCreature(creature: Creature) {
        this.pop = this.pop.filter(c => c !== creature)
    }

    public getNextID() {
        return this.nextID++;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.config.width, this.config.height)
        this.plants.forEach(p => {
            p.draw(ctx)
        })
        this.pop.forEach(c => {
            c.draw(ctx)
        })
    }
}