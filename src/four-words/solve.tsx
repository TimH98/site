import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardComponent from "./card";

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

    const pickupCard = (sideboard: boolean, idx: number) => {
        setHeldCardLocation({sideboard, idx})
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
        setSideboardCards(newSideboardCards)
        setPlacedCards(newPlacedCards)
    }

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
                onClick={() => rotateCard(sideboard, idx)}
                onDragStart={() => pickupCard(sideboard, idx)}
                onDrop={() => dropCard(sideboard, idx)}
            />
        )
    }

    const sideboard = () => {
        return (
            <table style={{
                flex: 20,
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
            flexDirection: 'column'
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
            <button onClick={onSubmit} style={{
                fontSize: titleFontSize,
                margin: '0.5vh',
                alignSelf: 'center',
                cursor: 'pointer',
                flex: 1,
                background: "white",
                borderRadius: "8pt"
            }}>Submit</button>
        </div>
    )
}