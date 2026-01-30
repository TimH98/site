// static class gl {

import { useEffect, useRef, useState } from "react"
import { Config, World } from "./world"


export default function Evo() {
    const [config, setConfig] = useState({
        runFromPredators: true,
        plantEnergy: 100,
        minMeatEnergy: 0,
        sightBase: 50,
        sightLog: 0,
        sightLinear: 0,
        moveEnergyBase: 0,
        moveEnergyLog: 0,
        moveEnergyLinear: 1,
        moveEnergyQuadratic: 0,
        sizeBasedFriction: false,
        fixedFriction: 0.8,
        scalingFriction: 2,
        cliffs: false,
        plantFrequency: 10,
        plantLimit: -1,
        width: window.innerWidth,
        height: window.innerHeight,
    } as Config)
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationId: number;

        const world = new World(config)
        const step = () => {
            world.step();
            if (canvas) {
                world.draw(ctx);
            }
            animationId = requestAnimationFrame(step);
        }
        step();
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [])
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <canvas
                style={{display: 'block'}}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={canvasRef}
            />
        </div>
    )
}