import { useEffect, useRef, useState } from "react";
import ColorCueSetup from "./setup";
import ColorCueGame from "./game";
import { ColorCueSettings } from "./settings";

export default function ColorCue() {
    const [running, setRunning] = useState(false);
    const [overlayHeight, setOverlayHeight] = useState(0);
    const [settings, setSettings] = useState<ColorCueSettings>({
        displayColors: true,
        displayColorNames: true,
        colorMatch: true,
        shuffle: true,
        displayArrows: 0,
        randomTimeInterval: false,
        minTimeInterval: 3.0,
        maxTimeInterval: 3.0,
        colors: ["Red", "Green", "Blue", "Yellow"],
    });
    const intervalRef: any = useRef(null);

    const mouseDown = () => {
        if (!running) return;
        intervalRef.current = setInterval(() => {
            setOverlayHeight(prev => {
                if (prev >= 100) {
                    setRunning(false);
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev + (20 / 1000 * 100)
            });
        }, 20);
    }

    const mouseUp = () => {
        setOverlayHeight(0);
        clearInterval(intervalRef.current);
    }

    useEffect(() => () => clearInterval(intervalRef.current), []);

    return (
        <div
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseLeave={mouseUp}
            onTouchStart={mouseDown}
            onTouchEnd={mouseUp}
        >
            {running ? (
                <ColorCueGame settings={settings} />
            ) : (
                <ColorCueSetup settings={settings} updateSettings={setSettings} onStart={() => setRunning(true)} />
            )}
            <div style={{
                display: "block",
                position: "absolute",
                height: overlayHeight + "%",
                width: "100%",
                top: 100 - overlayHeight + "%",
                background: "#00000033",
                zIndex: 2,
                pointerEvents: "none",
            }} />
        </div>
    )
}