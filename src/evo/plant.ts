import { random } from "./helper"
import { Config } from "./world"


export class Plant {
    public x: number
    public y: number

    public constructor(config: Config) {
        this.x = random(0, config.width)
        this.y = random(0, config.height)
    }
}