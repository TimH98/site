import Title from "../components/title";
import { useNavigate } from "react-router-dom";


export default function Shooter() {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title />
            <button onClick={() => {
                navigate('/shooter/game', { state: { numPlayers: 1 } });
            }}>1 Player</button>
            <button onClick={() => {
                navigate('/shooter/game', { state: { numPlayers: 2 } });
            }}>2 Players</button>
            <button onClick={() => {
                navigate('/shooter/game', { state: { numPlayers: 3 } });
            }}>3 Players</button>
            <button onClick={() => {
                navigate('/shooter/game', { state: { numPlayers: 4 } });
            }}>4 Players</button>
        </div>
    )
}