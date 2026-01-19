import { useState } from "react";
import grid from '../image/grid.jpg';

export default function Post({ title, content }: { title: string, content: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            border: '4px solid #000',
            borderRadius: '2rem',
            width: '90%',
            backgroundImage: `url(${grid})`,
            backgroundSize: '500px',
        }}>
            <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
            }} onClick={handleExpand}>{title}</div>
            {isExpanded && (
                <div style={{
                    paddingTop: '0.5rem',
                }}>
                    {content}
                </div>
            )}
        </div>
    )
}