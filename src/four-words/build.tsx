import { ChangeEvent, useState } from "react";
import Card from "./card";
import all_words from "./words";
import Title from "../components/title";


function chooseWords() {
    // Randomly choose 20 words: 16 for the shown cards + 4 for the extra 5th card
    const words = all_words().split("\n").filter(w => w.length);
    return words.sort(() => Math.random() - 0.5).slice(0, 20);
}


export default function Build() {
    const [clues, setClues] = useState<string[]>(["", "", "", ""]);

    const onWordChange = (event: ChangeEvent<HTMLInputElement>, idx: number) => {
        const currClues = clues
        currClues[idx] = event.target.value
        setClues(currClues)
    }
    const words = chooseWords()

    const onShare = () => {
        const raw = clues.join(",") + "," + words.join(",")
        const enc = btoa(raw)
        const url = window.location.href.replace(/\/$/, "") + "/play?code=" + enc
        navigator.clipboard.writeText(url);
        alert("Copied share code to clipboard")
    }

    const cardTable = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Card words={words.slice(0, 4)} orientation={0} locked />
                        </td>
                        <td>
                            <Card words={words.slice(4, 8)} orientation={0} locked />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Card words={words.slice(8, 12)} orientation={0} locked />
                        </td>
                        <td>
                            <Card words={words.slice(12, 16)} orientation={0} locked />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
    const titleFontSize = window.innerHeight > 1.5 * window.innerWidth ? '3vw' : '3vh'

    const clueStyle = {
        background: "#0000",
        border: "2px solid #fff3",
        borderRadius: "2px",
        fontSize: titleFontSize,
        color: 'white',
        textAlign: 'center' as const,
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <Title />
            <table style={{
                backgroundColor: '#353',
                borderRadius: '10px',
                padding: '10px',
                fontSize: titleFontSize,
                color: "white",
                textAlign: "center"
            }}>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input onChange={(event) => {onWordChange(event, 0)}} style={{
                                ...clueStyle
                            }}/>
                        </td>
                        <td />
                    </tr>
                    <tr>
                        <td style={{textOrientation: "mixed", writingMode: "sideways-lr"}}>
                            <input onChange={(event) => {onWordChange(event, 1)}} style={{
                                ...clueStyle
                            }}/>
                        </td>
                        <td>{cardTable()}</td>
                        <td style={{textOrientation: "mixed", writingMode: "sideways-lr", transform: "scale(-1)"}}>
                            <input onChange={(event) => {onWordChange(event, 2)}} style={{
                                ...clueStyle
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td style={{transform: "rotate(180deg)"}}>
                            <input onChange={(event) => {onWordChange(event, 3)}} style={{
                                ...clueStyle
                            }}/>
                        </td>
                        <td />
                    </tr>
                </tbody>
            </table>
            <button onClick={onShare} style={{
                fontSize: '20pt',
                margin: '0.5rem 0.5rem 0.5rem 0',
                alignSelf: 'center',
                cursor: 'pointer',
                background: "white",
                borderRadius: "8pt"
            }}>Share Puzzle</button>
        </div>
    )
}