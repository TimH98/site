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
    width: number
    height: number
}

export class World {
    config: Config
    pop: Creature[]
    plants: Plant[]

    public constructor(config: Config) {
        this.config = config
        this.pop = []
        this.plants = []
        for (var i=0; i<500; i++) {
            this.pop.push(new Creature(config))
            this.plants.push(new Plant(config))
        }
    }

    public addPlant() {
        this.plants.push(new Plant(this.config))
    }

    public removePlant(plant: Plant) {
        this.plants = this.plants.filter(p => p !== plant)
    }

    public removeCreature(creature: Creature) {
        this.pop = this.pop.filter(c => c !== creature)
    }
}