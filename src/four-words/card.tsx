

export default function Card({
    words,
    orientation,
    locked,
    onClick,
    onDragStart,
    onDrop
}: {
    words: string[],
    orientation: number,
    locked?: boolean,
    onClick?: any,
    onDragStart?: any,
    onDrop?: any
}) {
    const cardSize = window.innerHeight > 1.5 * window.innerWidth ? '30vw' : '20vh';
    const cardFontSize = window.innerHeight > 1.5 * window.innerWidth ? '3vw' : '2vh';
    const textStyle = {
        position: 'absolute' as const,
        fontSize: cardFontSize,
        fontWeight: 'bold',
        color: "white",
        backgroundColor: "#585",
        borderRadius: '2vh',
        textAlign: 'center' as const,
        lineHeight: "200%",
        top: '2%',
        left: '50%',
        width: '65%',
        height: '20%',
        pointerEvents: 'none' as const,
        transformOrigin: '50% 240%',
    }
    if (!words.length) {
        return (
            <div style={{
                backgroundColor: '#242',
                borderRadius: '1vh',
                width: cardSize,
                height: cardSize,
                aspectRatio: 1,
                position: 'relative',
            }} onDrop={onDrop} onDragOver={(e) => e.preventDefault()} draggable="true">
            </div>
        )
    }
    for (var i=0; i<orientation; i++) {
        words = [words[3], words[0], words[1], words[2]]
    }
    return (
        <div
            style={{
                backgroundColor: locked ? '#bfb' : 'white',
                borderRadius: '1vh',
                width: cardSize,
                height: cardSize,
                aspectRatio: 1,
                position: 'relative',
                cursor: locked ? 'default' : 'grab',
            }}
            onClick={!locked ? onClick : undefined}
            onDragStart={!locked ? onDragStart : undefined}
            onDrop={!locked ? onDrop : undefined}
            onDragOver={(e) => e.preventDefault()}
            draggable={locked ? "false" : "true"}
        >
            <div style={{
                ...textStyle,
                transform: 'translateX(-50%)'
            }}>
                {words[0]}
            </div>
            <div style={{
                ...textStyle,
                transform: 'translateX(-50%) rotate(90deg)',
            }}>
                {words[1]}
            </div>
            <div style={{
                ...textStyle,
                transform: 'translateX(-50%) rotate(180deg)',
            }}>
                {words[2]}
            </div>
            <div style={{
                ...textStyle,
                transform: 'translateX(-50%) rotate(270deg)',
            }}>
                {words[3]}
            </div>
        </div>
    )
}