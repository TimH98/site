import { Creature } from "./creature"
import { Plant } from "./plant"


export function random(min: number, max: number) {
    return Math.random() * (max - min) + min
}

// returns an int in the range [min, max)
export function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

export function dist(e1: Creature | Plant, e2: Creature | Plant): number {
    return Math.sqrt(
        (e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y)
    )
}