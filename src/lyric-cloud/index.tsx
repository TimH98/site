import React, { ChangeEvent, useRef } from "react";
import { useEffect, useState } from "react";
import songData from "./song-data.json";
import Title from "../components/title";
import Post from "../blog/post";
import clockImage from './image/clock.png';
import grid from '../image/grid.jpg';
import './font.css';

const NUM_SONGS = 100;

function chooseSongs(): string[] {
    // Random list of 100 songs from our dataset
    return Object.keys(songData).sort(() => Math.random() - 0.5).slice(0, 100);
}

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

function PopularYears({song}: {song: string}) {
    const years: number[] = (songData as Record<string, {"titles": string[], "years": number[]}>)[song]["years"] || [];
    return (
        <div style={{
            backgroundColor: '#fff',
            alignContent: 'center',
            border: '4px solid #ddd',
            borderRadius: '0.5rem',
            margin: '1rem 1rem 0 1rem',
            padding: '0 1rem',
            fontSize: '16pt',
            fontWeight: 'bold',
        }}>
            Popular in {years.join(", ")}
        </div>
    )
} 

function HeaderRow({started, timeLimit, onTimeout, song}: {
    started: boolean,
    timeLimit: number,
    onTimeout: () => void,
    song: string
}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '100vw',
        }}>
            <Timer started={started} timeLimit={timeLimit} onTimeout={onTimeout}/>
            <PopularYears song={song}/>
        </div>
    )
}

function CloudImage({song, style}: {song: string, style?: React.CSSProperties}) {
    const image = `${process.env.PUBLIC_URL}/lyric-clouds/${song.replace("/", "_").replace("?", "_").replace("!", "_")}.png`;

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
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    background: "#fff"
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
            <p>How many songs can you name in 60 seconds?</p>
            <ul>
                <li>Each round you're shown a word cloud built from a song's lyrics - Enter the song's title to score a point and move to the next question</li>
                <li>If you're stuck, you can skip a song and move on to the next one</li>
                <li>Every song in this quiz has spent at least 30 weeks on the Billboard Hot 100. Some are recent hits, others are classics.</li>
                <li>If you find 1 minute too frantic, you can adjust the time limit below</li>
            </ul>
        </>
    )
}

function PreGame(
    {
        songs,
        timeLimit,
        setStarted,
        setCorrect,
        setTimeLimit
    }: {
        songs: string[],
        timeLimit: number,
        setStarted: (started: boolean) => void,
        setCorrect: (correct: boolean[]) => void,
        setTimeLimit: (timeLimit: number) => void,
    }
) {
    return (
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '800px',
                maxWidth: '90%',
            }}>
                <Title />
                <Post title="Lyric Clouds" content={About()} autoExpand />
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
    )
}

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
        const titles: string[] = (songData as Record<string, {"titles": string[], "years": number[]}>)[songName]["titles"] || [];
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
            {!started && !finished && <PreGame songs={songs} timeLimit={timeLimit} setStarted={setStarted} setCorrect={setCorrect} setTimeLimit={setTimeLimit}/>}
            {/* Game */}
            {started && <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    flexDirection: 'column',
                }}
            >
                <HeaderRow started={started} timeLimit={timeLimit} onTimeout={onTimeout} song={songs[songIdx%NUM_SONGS]}/>
                <CloudImage song={songs[songIdx%NUM_SONGS]} style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    border: '4px solid #ddd',
                    padding: '1rem',
                    margin: '1rem',
                    maxWidth: '90vw',
                    maxHeight: '60vh',
                }}/>
                <span style={{
                    display: 'flex',
                    background: "#fff",
                    borderRadius: '0.5rem',
                    border: '4px solid #ddd'
                }}>
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
            </div>}
            {/* Post-game */}
            {finished && <div style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '24pt',
                fontWeight: 'bold',
                maxWidth: '600px',
                width: '90%',
            }}>
                <Title />
                <div style={{
                    border: '2px solid #000',
                    borderRadius: '0.5rem',
                    backgroundImage: `url(${grid})`,
                    backgroundSize: '500px',
                    textAlign: 'center',
                    padding: '1rem',
                    margin: '1rem',
                    width: '90%',
                    maxWidth: '800px',
                    alignItems: 'center',
                }}>
                    Your Score: {correct.filter(c => c).length}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <button onClick={() => {
                            setSongs(chooseSongs());
                            setFinished(false);
                            setStarted(true);
                            setSongIdx(0);
                            setCorrect(correct.map(() => false));
                        }} style={{
                            margin: '0.5rem',
                            fontSize: '14pt',
                        }}>Play Again</button>
                        <button onClick={() => {
                            setSongs(chooseSongs());
                            setFinished(false);
                            setStarted(false);
                            setSongIdx(0);
                            setCorrect(correct.map(() => false));
                        }} style={{
                            margin: '0.5rem 0.5rem 0.5rem 0',
                            fontSize: '14pt',
                        }}>Change Settings</button>
                    </div>
                </div>
                <Post title="Answers ↓" content={<Answers songs={songs.slice(0, songIdx+1)} correct={correct} />}/>
            </div>}
        </div>
    )
}