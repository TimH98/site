import { random } from "./helper"
import { Config } from "./world"


export class Plant {
    public x: number
    public y: number

    public constructor(config: Config) {
        if (config.cliffs) {
            this.x = random(config.width / 10, 9 * config.width / 10)
            this.y = random(config.height / 10, 9 * config.height / 10)
        } else {
            this.x = random(0, config.width)
            this.y = random(0, config.height)
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = "#0f0"
        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1
        ctx.rect(this.x-2, this.y-2, 4, 4)
        ctx.fill()
        ctx.stroke()
    }
}