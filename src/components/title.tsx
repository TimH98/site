import { CSSProperties } from 'react';
import eraser from '../image/eraser-text.png';
import { useNavigate } from 'react-router-dom';

const STICKY_NOTE_STYLE: CSSProperties = {
    aspectRatio: '1/1',
    width: '25%',
    boxShadow: "2px 2px 2px #000",
    margin: '-20% 2% 1rem 2%',
    verticalAlign: 'bottom',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    cursor: 'pointer',
}

export default function Title() {
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={eraser} onClick={() => navigate('/#')} style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                padding: '1rem 0 0 0',
                cursor: 'pointer',
                filter: 'drop-shadow(2px 2px 2px #222)',
                zIndex: 1,
            }} alt="Tim's Workspace logo" />
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
            }}>
                <div onClick={() => navigate('/portfolio')} style={{
                    ...STICKY_NOTE_STYLE,
                    background: "#ff8",
                    transform: "rotate(-1deg)",
                }} >
                    <div style={{ flex: 1 }} />
                    Portfolio
                </div>
                <div onClick={() => navigate('/blog')} style={{
                    ...STICKY_NOTE_STYLE,
                    background: "#68d",
                    transform: "rotate(2deg)",
                }} >
                    <div style={{ flex: 1 }} />
                    Blog
                </div>
                <div onClick={() => navigate('/about')} style={{
                    ...STICKY_NOTE_STYLE,
                    background: "#d55",
                    transform: "rotate(-2deg)",
                }} >
                    <div style={{ flex: 1 }} />
                    About
                </div>
            </div>
        </div>
    )
}