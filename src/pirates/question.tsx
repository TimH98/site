import './question.css';

export default function Question({text, onAnswer}: {text: string, onAnswer: (answer: number) => void}) {
    const isSpecial = text?.includes('St. Louis');
    const isMobile = window.innerWidth < 600;
    const BUTTON_STYLE = isMobile ? {
        padding: '0.5rem 1rem',
    } : {
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            margin: '0 4rem',
        }}>
            <div style={{
                fontSize: '16pt',
                fontWeight: 'bold',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                fontFamily: 'Cursive',
                textAlign: 'center',
                height: isSpecial ? '56px' : '84px',
            }}>{text}</div>
            {isSpecial ? (
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button className='scroll-button' onClick={() => onAnswer(1)} style={{
                                ...BUTTON_STYLE,
                                width: '100%',
                            }}>St. Louis</button>
                            </td>
                            <td>
                                <button className='scroll-button' onClick={() => onAnswer(1)} style={{
                                    ...BUTTON_STYLE,
                                    width: '100%',
                                }}>St. Paul</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className='scroll-button' onClick={() => onAnswer(2)} style={{
                                    ...BUTTON_STYLE,
                                    width: '100%',
                                }}>Both</button>
                            </td>
                            <td>
                                <button className='scroll-button' onClick={() => onAnswer(0)} style={{
                                    ...BUTTON_STYLE,
                                    width: '100%',
                                }}>Neither</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                }}>
                    <button className='scroll-button' onClick={() => onAnswer(1)} style={{
                        ...BUTTON_STYLE,
                    }}>Yes</button>
                    <button className='scroll-button' onClick={() => onAnswer(0)} style={{
                        ...BUTTON_STYLE,
                    }}>No</button>
                </div>
            )}
        </div>
    )
}