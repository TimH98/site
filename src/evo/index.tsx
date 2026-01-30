// static class gl {

import { useState } from "react"

type Config = {
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


export default function Evo() {
    const [config, setConfig] = useState({
        runFromPredators: false,
        plantEnergy: 25,
        minMeatEnergy: 50,
        sightBase: 0,
        sightLog: 0,
        sightLinear: 10,
        moveEnergyBase: 0,
        moveEnergyLog: 0,
        moveEnergyLinear: 0,
        moveEnergyQuadratic: 1,
        sizeBasedFriction: true,
        fixedFriction: 0.8,
        scalingFriction: 2,
        cliffs: false,
        plantFrequency: 1,
        width: window.innerWidth,
        height: window.innerHeight,
    })


}