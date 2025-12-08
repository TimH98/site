import { useState } from "react";
import Title from "../components/title";
import Question from "./question";
import _scroll from '../image/scroll.png';
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
    "Have you ever been to Greenland?",
    "Have you ever been to Denver?",
    "Have you ever buried treasure in St. Louis or St. Paul?",
    "Have you ever been to Moscow?",
    "Have you ever been to Tampa?",
    "Have you ever been to Boston in the fall?",
    "Do you ever hoist the mainstay?",
    "Do you ever swab the poop deck?",
    "Do you ever veer to starboard?",
    "Do you ever sail at all?",
    "Have you ever walked the gangplank?",
    "Have you ever owned a parrot?",
    "Have you ever been to Boston in the fall??",
    "Have you ever plucked a rooster?",
    "Are you any good at ping pong?",
    "Have you ever thrown your mashed potatoes up against the wall?",
    "Have you ever kissed a chipmunk?",
    "Have you ever gotten head lice?",
    "Have you ever been to Boston in the fall???",
    "Have you ever licked a spark plug?",
    "Have you ever sniffed a stinkbug?",
    "Have you ever painted daisies on a big red rubber ball?",
    "Have you ever bathed in yogurt?",
    "Do you look good in leggings?",
    "Have you ever been to Boston in the fall????",
]

export default function Pirates() {
    const [isIntro, setIsIntro] = useState(true);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleAnswer = (answer: number) => {
        setAnswers([...answers, answer]);
        setQuestionIndex(questionIndex + 1);
        if (questionIndex === QUESTIONS.length - 1) {
            navigate('/pirates/results', { state: { answers } });
        }
    }

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
            }}>
                <div style={{
                    textAlign: 'center', 
                    fontSize: '30pt', 
                    fontWeight: 'bold', 
                    paddingTop: '12%', 
                    fontFamily: 'Cursive',
                }}>The Lazy Pirate Quiz</div>
                {isIntro ? (
                    <>
                    <div style={{
                        textAlign: 'center', 
                        fontSize: '16pt',
                        fontWeight: 'bold',
                        fontFamily: 'Cursive',
                        margin: '0 4rem',
                    }}>Are you fit to join the Pirates who Don't Do Anything?</div>
                    <button className='scroll-button' style={{display: 'block', margin: 'auto', marginTop: '1rem'}} onClick={() => setIsIntro(false)}>Take the Quiz</button>
                    </>
                ) : (
                    <Question text={QUESTIONS[questionIndex]} onAnswer={handleAnswer} />
                )}
            </div>
        </div>
    )
}