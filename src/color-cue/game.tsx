import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { COLORS } from "./colors"


export default function ColorCue() {
    let {
        displayColors,
        displayColorNames,
        colorMatch,
        shuffle,
        displayArrows,
        minTimeInterval,
        maxTimeInterval,
        colors,
    } = useLocation().state as {
        displayColors: boolean,
        displayColorNames: boolean,
        colorMatch: boolean,
        shuffle: boolean,
        displayArrows: number,
        minTimeInterval: number,
        maxTimeInterval: number,
        colors: string[]
    }
    const currentRef = useRef({ idx: -1 })
    const [current, setCurrent] = useState("")
    const [currentText, setCurrentText] = useState("")
    const [currentArrow, setCurrentArrow] = useState("")

    const arrows: string = displayArrows === 1 ? "←→" : displayArrows === 2 ? "↑↓" : "↑↓←→"

    useEffect(() => {
        const changeColor = (currentIdx: number) => {
            var idx;
            if (shuffle) {
                idx = Math.floor(Math.random() * colors.length);
            } else {
                idx = (currentIdx + 1) % colors.length;
            }
            setCurrent(colors[idx])
            var idxT;
            if (colorMatch) {
                idxT = idx;
            } else {
                idxT = Math.floor(Math.random() * colors.length);
            }
            setCurrentText(colors[idxT]);
            if (displayArrows) {
                const idxA = Math.floor(Math.random() * arrows.length);
                setCurrentArrow(arrows[idxA])
            }
            currentRef.current = { idx }
        }

        const timeoutRef = { id: 0 as any };
        const loop = () => {
            changeColor(currentRef.current.idx)
            const timeInterval = Math.random() * (maxTimeInterval - minTimeInterval) + minTimeInterval
            var audio = document.createElement("audio");
            audio.src = require("./beep.mp3");
            audio.loop = false;
            audio.play()
            timeoutRef.id = setTimeout(loop, timeInterval * 1000)
        }
        timeoutRef.id = setTimeout(loop, 0)
        return () => clearTimeout(timeoutRef.id)
    }, [
        arrows,
        colorMatch,
        colors,
        displayArrows,
        shuffle,
        minTimeInterval,
        maxTimeInterval
    ])

    return (
        <div style={{
            background: displayColors ? COLORS[current]?.color : "#fff",
            color: displayColors ? COLORS[current]?.textColor : "#000",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{ flexGrow: 1 }} />
            {displayColorNames && <h1 style={{
                fontSize: "min(20vw, 20vh)",
                margin: "1rem",
            }}>{currentText}</h1>}
            {displayArrows > 0 && <h1 style={{
                fontSize: "min(20vw, 20vh)",
                margin: "1rem",
            }}>{currentArrow}</h1>}
            <div style={{ flexGrow: 1 }} />
        </div>
    )
}