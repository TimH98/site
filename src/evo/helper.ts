import { Creature } from "./creature"
import { Plant } from "./plant"


export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

// returns an int in the range [min, max] inclusive
export function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (1 + max - min) + min)
}

export function randGauss(mean: number, stddev: number): number {
    // Via https://stackoverflow.com/a/36481059
    const u = 1 - Math.random()
    const v = Math.random()
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stddev + mean
}

export function dist(e1: Creature | Plant, e2: Creature | Plant): number {
    return Math.sqrt(
        (e1.x - e2.x) * (e1.x - e2.x) + (e1.y - e2.y) * (e1.y - e2.y)
    )
}

export function clamp(val: number, min: number, max: number): number {
    if (val < min) {
        return min
    } else if (val > max) {
        return max
    }
    return val
}