// static class gl {

import { useEffect, useRef, useState } from "react"
import { Config, World } from "./world"
import Settings from "./settings";

export default function Evo() {
    const [config, setConfig] = useState({
        plantFrequency: 1,
        plantLimit: -1,
        plantEnergy: 100,
        sightBase: 50,
        sightLog: 0,
        sightLinear: 0,
        moveEnergyBase: 0,
        moveEnergyLog: 0,
        moveEnergyLinear: 0,
        moveEnergyQuadratic: 1,
        movementEase: 10,
        sizeBasedFriction: false,
        runFromPredators: true,
        cliffs: false,
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
    }, [config])
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <Settings config={config} onSave={cfg => {setConfig(cfg)}} />
            <canvas
                style={{display: 'block'}}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={canvasRef}
            />
        </div>
    )
}