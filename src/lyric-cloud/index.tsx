import React, { ChangeEvent, useRef } from "react";
import { useEffect, useState } from "react";
import songData from "./titles.json";
import Title from "../components/title";
import Post from "../blog/post";
import clockImage from './image/clock.png';
import './font.css';

function Timer({started, timeLimit, onTimeout}: {started: boolean, timeLimit: number, onTimeout: () => void}) {
    const [time, setTime] = useState(timeLimit);
    useEffect(() => {
        if (!started) {
            setTime(timeLimit);
            return;
        }
        const interval = setInterval(() => {
            setTime(t => t - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [started, timeLimit]);
    
    useEffect(() => {
        if (time <= 0) {
            onTimeout();
        }
    }, [time, onTimeout]);

    return (
        <div style={{
            fontSize: '2rem',
            color: '#333',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem 0 0 0',
        }}>
            <img src={clockImage} style={{width: '150px'}} />
            <p style={{
                position: 'absolute',
                color: '#f00', 
                fontFamily: 'SevenSegment',
                fontSize: '36pt',
                lineHeight: '68pt',
                margin: '0',
                textAlign: 'center',
            }}>
                {String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}
            </p>
            <p style={{
                position: 'absolute',
                color: '#f004', 
                fontFamily: 'SevenSegment',
                fontSize: '36pt',
                lineHeight: '68pt',
                margin: '0',
                textAlign: 'center',
            }}>
                88:88
            </p>
        </div>
    )
}

function CloudImage({song, style}: {song: string, style?: React.CSSProperties}) {
    // const image = require(`./cloud/${song.replace("/", " ")}.png`);
    const image = `${process.env.PUBLIC_URL}/lyric-clouds/${song.replace("/", " ").replace("?", "_").replace("!", "_")}.png`;

    return (
        <img src={image} style={style}/>
    )
}

function Answers({songs, correct}: {songs: string[], correct: boolean[]}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {songs.map((song, i) => (
                <div key={song} style={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '16pt',
                    border: correct[i] ? '4px solid #0d3' : '4px solid #f00',
                    margin: '1rem 0 0 0',
                    background: "#000",
                    color: "#fff",
                }}>
                    <CloudImage song={song} style={{width: '100%', alignContent: 'center'}}/>
                    {song}
                </div>
            ))}
        </div>
    )
}

function About() {
    return (
        <>
            <p>You have 1 minute to name as many song titles as you can!</p>
            <ul>
                <li>You will be presented with a word cloud containing lyrics from a song</li>
                <li>Correctly enter the song's title to score a point and move to the next question</li>
                <li>You have unlimited skips! If you don't know one, move on quickly! <i>(Hint: You can use <b>Tab</b> to quickly select the Skip button)</i></li>
                <li>Each song in this quiz has spent at least 30 weeks on the Billboard Top 100</li>
                <li>If you find 1 minute too frantic, you can increase the time limit below</li>
            </ul>
        </>
    )
}

function chooseSongs(): string[] {
    // Random list of 100 songs from our dataset
    return Object.keys(songData).sort(() => Math.random() - 0.5).slice(0, 100);
}

const NUM_SONGS = 100;

export default function LyricCloud() {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [songIdx, setSongIdx] = useState(0);
    const [songs, setSongs] = useState<string[]>(chooseSongs());
    const [correct, setCorrect] = useState<boolean[]>([]);

    // Settings
    const [timeLimit, setTimeLimit] = useState(60);

    const inputRef = useRef(null);

    const onAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        const songName = songs[songIdx%NUM_SONGS];
        const titles: string[] = (songData as Record<string, string[]>)[songName] || [];
        // Check if the answer is correct
        if (titles.includes(answer.toLowerCase())) {
            setCorrect(prev => {
                const newCorrect = [...prev];
                newCorrect[songIdx%NUM_SONGS] = true;
                return newCorrect;
            });
            setSongIdx(idx => idx + 1);
            event.target.value = '';
        }
    }

    const onSkip = () => {
        setSongIdx(idx => idx + 1);
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).focus();
            (inputRef.current as HTMLInputElement).value = '';
        }
    }

    const onTimeout = () => {
        setStarted(false);
        setFinished(true);
    }

    return (
        <div style={{width: '100vw', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            {/* Pre-game */}
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '800px',
                maxWidth: '90%',
                visibility: !started && !finished ? 'visible' : 'collapse',
            }}>
                <Title />
                <Post title="Lyric Cloud Game" content={About()} autoExpand />
                <Post title="Settings" content={
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td style={{textAlign: 'right', padding: '0.5rem', fontWeight: 'bold'}}>Time Limit (seconds)</td>
                                <td style={{padding: '0.5rem'}}><input type="number" value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value))}></input></td>
                            </tr>
                        </tbody>
                    </table>} />
                <button onClick={() => {
                    setStarted(true);
                    let initCorrect: boolean[] = [];
                    songs.forEach(() => {
                        initCorrect.push(false);
                    });
                    setCorrect(initCorrect);
                }} style={{
                    fontSize: '16pt',
                }}>Start Game</button>
            </div>
            {/* Game */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'column',
                    visibility: started ? 'visible' : 'collapse',
                }}
            >
                <Timer started={started} timeLimit={timeLimit} onTimeout={onTimeout}/>
                <CloudImage song={songs[songIdx%NUM_SONGS]} style={{
                    background: '#000',
                    border: '2px solid #000',
                    borderRadius: '1rem',
                    padding: '1rem',
                    margin: '1rem',
                    maxWidth: '90vw',
                    maxHeight: '60vh',
                }}/>
                <span style={{display: 'flex', background: "#fff", borderRadius: '0.5rem'}}>
                    <input onChange={onAnswerChange} ref={inputRef} style={{
                        fontSize: '24pt',
                        margin: '0.5rem',
                        maxWidth: '70vw',
                    }}/>
                    <button onClick={onSkip} style={{
                        fontSize: '24pt',
                        margin: '0.5rem 0.5rem 0.5rem 0',
                        alignSelf: 'center',
                    }}>Skip</button>
                </span>
            </div>
            {/* Post-game */}
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '24pt',
                fontWeight: 'bold',
                maxWidth: '600px',
                width: '90%',
                visibility: finished ? 'visible' : 'collapse',
            }}>
                <Title />
                Your Score: {correct.filter(c => c).length}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <button onClick={() => {
                    setSongs(chooseSongs());
                    setFinished(false);
                    setStarted(true);
                    setSongIdx(0);
                    setCorrect(correct.map(() => false));
                }} style={{
                    margin: '0.5rem',
                    fontSize: '18pt',
                }}>Play Again</button>
                <button onClick={() => {
                    setSongs(chooseSongs());
                    setFinished(false);
                    setStarted(false);
                    setSongIdx(0);
                    setCorrect(correct.map(() => false));
                }} style={{
                    margin: '0.5rem 0.5rem 0.5rem 0',
                    fontSize: '18pt',
                }}>Change Settings</button>
                </div>
                <Post title="Answers" content={<Answers songs={songs.slice(0, songIdx+1)} correct={correct} />} />
            </div>
        </div>
    )
}