import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardComponent from "./card";
import Title from "../components/title";

type Card = {
    orientation: number,
    words: string[],
    locked?: boolean,
}

type CardLocation = {
    sideboard: boolean,
    idx: number
}

const shuffleCards = (cards: Card[]) => {
    var resp: (Card | null)[] = cards.sort(() => Math.random() - 0.5);
    for (var i=0; i<5; i++) {
        resp[i]!.orientation = Math.floor(Math.random() * 4);
    }
    return resp.concat([null]);
}

export default function Solve() {
    const navigate = useNavigate();
    const [params, _] = useSearchParams()
    const enc = params.get("code") || ""
    const dec = atob(enc).split(",")
    const clues = dec.slice(0, 4)
    const cards: Card[] = [
        {
            orientation: 0,
            words: dec.slice(4, 8)
        },
        {
            orientation: 0,
            words: dec.slice(8, 12)
        },
        {
            orientation: 0,
            words: dec.slice(12, 16)
        },
        {
            orientation: 0,
            words: dec.slice(16, 20)
        },
        {
            orientation: 0,
            words: dec.slice(20)
        },
    ]
    const [sideboardCards, setSideboardCards] = useState<(Card | null)[]>(shuffleCards(cards))
    const [placedCards, setPlacedCards] = useState<(Card | null)[]>([null, null, null, null])
    const [heldCard, setHeldCard] = useState<Card | null>(null)
    const [heldCardLocation, setHeldCardLocation] = useState<CardLocation | null>(null)
    const [touchPosition, setTouchPosition] = useState<{ x: number, y: number } | null>(null)
    const [tries, setTries] = useState(0)
    const [showResults, setShowResults] = useState(false)
    const [finished, setFinished] = useState(false)
    const [gaveUp, setGaveUp] = useState(false)

    const rotateCard = (sideboard: boolean, idx: number) => {
        var cardList = [...placedCards]
        var update = setPlacedCards
        if (sideboard) {
            cardList = [...sideboardCards]
            update = setSideboardCards
        }
        const card = cardList[idx]
        if (!card) return;
        const newCard: Card = {
            words: card.words,
            orientation: (card.orientation + 1) % 4
        }
        cardList[idx] = newCard
        update(cardList)
    }

    const pickupCard = (sideboard: boolean, idx: number, touchX?: number, touchY?: number) => {
        setHeldCardLocation({sideboard, idx})
        if (touchX !== undefined && touchY !== undefined) {
            setTouchPosition({ x: touchX, y: touchY })
        }
        if (sideboard) {
            const card = sideboardCards[idx]
            setHeldCard(card)
        } else {
            const card = placedCards[idx]
            setHeldCard(card)
        }
    }

    const dropCard = (sideboard: boolean, idx: number) => {
        // Swap currently held card with the designated card
        if (heldCardLocation === null) {
            return
        }
        var newCard: Card | null;
        var newSideboardCards = sideboardCards;
        var newPlacedCards = placedCards;
        // 1. set the card at the drop location to the held card
        if (sideboard) {
            newCard = sideboardCards[idx]
            newSideboardCards[idx] = heldCard
        } else {
            newCard = placedCards[idx]
            newPlacedCards[idx]  = heldCard
        }

        // 2. set the card at the heldCardLocation to the dropped-on card
        if (heldCardLocation.sideboard) {
            newSideboardCards[heldCardLocation.idx] = newCard
        } else {
            newPlacedCards[heldCardLocation.idx] = newCard
        }
        setHeldCard(null)
        setHeldCardLocation(null)
        setTouchPosition(null)
        setSideboardCards(newSideboardCards)
        setPlacedCards(newPlacedCards)
    }

    useEffect(() => {
        if (heldCardLocation === null) return;
        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            setTouchPosition({ x: touch.clientX, y: touch.clientY });
        };
        const onTouchEnd = (e: TouchEvent) => {
            const touch = e.changedTouches[0];
            if (!touch) return;
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const cardEl = el?.closest('[data-four-words-drop]') as HTMLElement | null;
            if (!cardEl) {
                setHeldCard(null);
                setHeldCardLocation(null);
                setTouchPosition(null);
                return;
            }
            const sideboard = cardEl.dataset.sideboard === 'true';
            const idx = parseInt(cardEl.dataset.idx || '0', 10);
            if (heldCardLocation.sideboard === sideboard && heldCardLocation.idx === idx) {
                setHeldCard(null);
                setHeldCardLocation(null);
                setTouchPosition(null);
            } else {
                dropCard(sideboard, idx);
            }
        };
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
        return () => {
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dropCard/rotateCard close over current state via heldCardLocation dep
    }, [heldCardLocation, heldCard, sideboardCards, placedCards]);

    const onSubmit = () => {
        const answer: Card[] = [
            {
                orientation: 0,
                words: dec.slice(4, 8)
            },
            {
                orientation: 0,
                words: dec.slice(8, 12)
            },
            {
                orientation: 0,
                words: dec.slice(12, 16)
            },
            {
                orientation: 0,
                words: dec.slice(16, 20)
            },
        ]
        var newPlacedCards: (Card | null)[] = []
        for (var i=0; i<4; i++) {
            var correct = true;
            if (placedCards[i]?.orientation !== 0) {
                correct = false;
            }
            for (var j=0; j<4; j++) {
                if (placedCards[i]?.words[j] !== answer[i].words[j]) {
                    correct = false;
                }
            }
            if (correct) {
                newPlacedCards[i] = {
                    orientation: placedCards[i]!.orientation,
                    words: placedCards[i]!.words,
                    locked: true
                }
            } else {
                newPlacedCards[i] = placedCards[i]
            }
        }
        setPlacedCards(newPlacedCards);
        setTries(tries + 1);
        if (newPlacedCards.every(c => c?.locked)) {
            setShowResults(true);
            setFinished(true);
        }
    }

    const onGiveUp = () => {
        const answer: Card[] = [
            {
                orientation: 0,
                words: dec.slice(4, 8),
                locked: true
            },
            {
                orientation: 0,
                words: dec.slice(8, 12),
                locked: true
            },
            {
                orientation: 0,
                words: dec.slice(12, 16),
                locked: true
            },
            {
                orientation: 0,
                words: dec.slice(16, 20),
                locked: true
            },
        ]
        setPlacedCards(answer);
        setSideboardCards([
            {
                orientation: 0,
                words: dec.slice(20)
            },
            null, null, null, null, null
        ]);
        setGaveUp(true);
        setFinished(true);
    }

    const rotatableCard = (sideboard: boolean, idx: number) => {
        var cardList = placedCards
        if (sideboard) {
            cardList = sideboardCards
        }
        return (
            <CardComponent
                words={cardList[idx]?.words ?? []}
                orientation={cardList[idx]?.orientation ?? 0}
                locked={cardList[idx]?.locked ?? false}
                sideboard={sideboard}
                idx={idx}
                onClick={() => rotateCard(sideboard, idx)}
                onDragStart={(touchX, touchY) => pickupCard(sideboard, idx, touchX, touchY)}
                onDrop={() => dropCard(sideboard, idx)}
            />
        )
    }

    const sideboard = () => {
        return (
            <table style={{
                flex: 20,
                paddingTop: '2vh',
            }}>
                <tbody>
                    <tr>
                        <td>
                            {rotatableCard(true, 0)}
                        </td>
                        <td>
                            {rotatableCard(true, 1)}
                        </td>
                        <td>
                            {rotatableCard(true, 2)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {rotatableCard(true, 3)}
                        </td>
                        <td>
                            {rotatableCard(true, 4)}
                        </td>
                        <td>
                            {rotatableCard(true, 5)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const cardTable = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            {rotatableCard(false, 0)}
                        </td>
                        <td>
                            {rotatableCard(false, 1)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {rotatableCard(false, 2)}
                        </td>
                        <td>
                            {rotatableCard(false, 3)}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const titleFontSize = window.innerHeight > 1.5 * window.innerWidth ? '3vw' : '3vh'

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            {sideboard()}

            <table style={{
                backgroundColor: '#353',
                borderRadius: '1vh',
                fontSize: titleFontSize,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                flex: 30,
            }}>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            {clues[0]}
                        </td>
                        <td />
                    </tr>
                    <tr>
                        <td style={{textOrientation: "mixed", writingMode: "sideways-lr"}}>
                            {clues[1]}
                        </td>
                        <td>{cardTable()}</td>
                        <td style={{textOrientation: "mixed", writingMode: "sideways-lr", transform: "scale(-1)"}}>
                            {clues[2]}
                        </td>
                    </tr>
                    <tr>
                        <td />
                        <td style={{transform: "rotate(180deg)"}}>
                            {clues[3]}
                        </td>
                        <td />
                    </tr>
                </tbody>
            </table>
            <div style={{display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {!finished && (
                    <button onClick={onSubmit} style={{
                        fontSize: titleFontSize,
                        margin: '0.5vh',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        background: "white",
                        borderRadius: "8pt"
                    }}>Submit</button>
                )}
                {tries > 1 && !finished && (
                    <button onClick={onGiveUp} style={{
                        fontSize: titleFontSize,
                        margin: '0.5vh',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        background: "white",
                        borderRadius: "8pt"
                    }}>Give Up</button>
                )}
                {finished && (
                    <button onClick={() => setShowResults(true)} style={{
                        fontSize: titleFontSize,
                        margin: '0.5vh',
                        alignSelf: 'center',
                        cursor: 'pointer',
                        background: "white",
                        borderRadius: "8pt"
                    }}>Results</button>
                )}
            </div>
            {heldCard && touchPosition && (
                <div style={{
                    position: 'fixed',
                    left: touchPosition.x,
                    top: touchPosition.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.5,
                    pointerEvents: 'none',
                    zIndex: 1000,
                }}>
                    <CardComponent
                        words={heldCard.words}
                        orientation={heldCard.orientation}
                    />
                </div>
            )}
            {showResults && (
                <div style={{
                    background: "#0005",
                    width: "100vw",
                    height: "100vh",
                    position: "absolute"
                }}>
                    <div style={{
                        width: "300px",
                        background: "white",
                        border: "12px solid #9c9",
                        borderRadius: "2vh",
                        padding: "4% 4% 4% 4%",
                        textAlign: "center",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}>
                        {gaveUp ? (
                            <>
                                <h1 style={{lineHeight: "0%"}}>Thanks for Playing!</h1>
                                <p>You gave up after {tries} {tries == 1 ? "try" : "tries"}.</p>
                            </>
                        ) : (
                            <>
                                <h1 style={{lineHeight: "0%"}}>Congratulations!</h1>
                                <p>You guessed correctly in {tries} {tries == 1 ? "try" : "tries"}!</p>
                            </>
                        )}
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2%",
                            width: "100%"
                        }}>
                            <button style={{
                                background: "#585",
                                color: "white",
                                borderRadius: "2vh",
                                border: "none",
                                lineHeight: "200%",
                                fontSize: "large",
                                padding: "0 4%",
                            }} onClick={() => navigate('/four-words/build')}>Make a new puzzle</button>
                            <button style={{
                                background: "#585",
                                color: "white",
                                borderRadius: "2vh",
                                border: "none",
                                lineHeight: "200%",
                                fontSize: "large",
                                padding: "0 4%",
                            }} onClick={() => setShowResults(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}