import eraser from '../image/eraser-text.png';
import { useNavigate } from 'react-router-dom';

export default function Title() {
    const navigate = useNavigate();
    return (
        <img src={eraser} onClick={() => navigate('/')} style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            padding: '1rem 0',
            cursor: 'pointer',
        }}/>
    )
}