import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { COLORS } from "./colors"


export default function ColorGame() {
    let {
        displayColors,
        displayColorNames,
        colorMatch,
        shuffle,
        displayArrows,
        timeInterval,
        colors,
    } = useLocation().state as {
        displayColors: boolean,
        displayColorNames: boolean,
        colorMatch: boolean,
        shuffle: boolean,
        displayArrows: number,
        timeInterval: number,
        colors: string[]
    }
    const currentRef = useRef({current: "", currentText: ""})
    const [current, setCurrent] = useState("")
    const [currentText, setCurrentText] = useState("")
    const [currentArrow, setCurrentArrow] = useState("")

    const arrows: string = displayArrows === 1 ? "←→" : displayArrows === 2 ? "↑↓" : "↑↓←→"

    const changeColor = (current: string, currentText: string) => {
        const choices = colors.filter(c => c !== current)
        var idx;
        if (shuffle) {
            idx = Math.floor(Math.random() * choices.length);
        } else {
            idx = (choices.indexOf(current) + 1) % choices.length;
        }
        setCurrent(choices[idx])
        var idxT;
        if (colorMatch) {
            idxT = idx;
        } else {
            const choicesT = colors.filter(c => c !== currentText)
            idxT = Math.floor(Math.random() * choicesT.length);
        }
        setCurrentText(choices[idxT]);
        if (displayArrows) {
            const idxA = Math.floor(Math.random() * arrows.length);
            setCurrentArrow(arrows[idxA])
        }
        currentRef.current = {current: choices[idx], currentText: choices[idxT]}
    }

    useEffect(() => {
        changeColor(currentRef.current.current, currentRef.current.currentText)
        const interval = setInterval(() => {
            changeColor(currentRef.current.current, currentRef.current.currentText)
        }, timeInterval * 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div style={{
            background: displayColors ? COLORS[current]?.color : "#fff",
            color: displayColors ? COLORS[current]?.textColor : "#000",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {displayColorNames && <h1 style={{
                fontSize: "min(20vw, 20vh)"
            }}>{currentText}</h1>}
            {displayArrows > 0 && <h1 style={{
                fontSize: "min(20vw, 20vh)",
                marginBottom: 0
            }}>{currentArrow}</h1>}
        </div>
    )
}