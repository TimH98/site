import { useLocation } from "react-router-dom";
import Title from "../components/title";
import _scroll from '../image/scroll.png';
import truePirate from '../image/truepirate.png';
import thinIce from '../image/thinice.png';
import chores from '../image/chores.png';
import lies from '../image/lies.jpeg';

const RESULTS = [
    {
        message: "You are a pirate who doesn't do anything! You'll fit right in!",
        image: truePirate,
    },
    {
        message: "You are a pirate who does a little bit of stuff! You're on thin ice, but you can join the crew!",
        image: thinIce,
    },
    {
        message: "You are a pirate who does a lot of stuff! The crew could use a pirate like you to do all the work!",
        image: chores,
    },
    {
        message: "I can't believe you would lie on my quiz! That's swashbuckling behavior! Welcome to the crew!",
        image: lies,
    }
]

export default function Results() {
    const { answers } = useLocation().state as { answers: number[] }
    
    const total = answers.reduce((acc, answer) => acc + answer, 0);
    const score = Math.round((total / 25) * 100);
    const result = total <= 1 ? RESULTS[0]
        : total <= 12 ? RESULTS[1]
        : total <= 24 ? RESULTS[2]
        : RESULTS[3]
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title />
            <div style={{
                width: '600px',
                maxWidth: '100%',
                aspectRatio: '600 / 474',
                backgroundImage: `url(${_scroll})`,
                backgroundSize: 'contain',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                margin: '0 2rem',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    textAlign: 'center', 
                    fontSize: '30pt', 
                    fontWeight: 'bold', 
                    paddingTop: '12%', 
                    fontFamily: 'Cursive',
                }}>The Lazy Pirate Quiz</div>
                <div style={{
                    textAlign: 'center', 
                    fontSize: '20pt', 
                    fontWeight: 'bold', 
                    fontFamily: 'Cursive',
                }}>You scored {score}%</div>
                <div style={{
                    textAlign: 'center', 
                    fontSize: '14pt', 
                    fontWeight: 'bold', 
                    fontFamily: 'Cursive',
                    margin: '0 4rem',
                }}>{result.message}</div>
                <img src={result.image} alt="result" style={{
                    width: '80%',
                    maxWidth: '80%',
                    maxHeight: '50%',
                    objectFit: 'contain',
                    margin: 'auto',
                    display: 'block',
                }} />
            </div>
        </div>
    )
}

export {}