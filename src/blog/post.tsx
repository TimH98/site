import { useState } from "react";
import grid from '../image/grid.jpg';

export type PostProps = {
    title: string
    content: React.ReactNode
    date?: string
    autoExpand?: boolean
}

export default function Post(props: PostProps) {
    const [isExpanded, setIsExpanded] = useState(props.autoExpand ?? false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            border: '2px solid #000',
            borderRadius: '0.5rem',
            width: '90%',
            backgroundImage: `url(${grid})`,
            backgroundSize: '500px',
        }}>
            <div style={{
                cursor: 'pointer',
                flexDirection: 'row',
                display: 'flex'
            }} onClick={handleExpand}>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }}>
                    {props.title}
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#666',
                    textAlign: 'right',
                    flex: 1,
                    minWidth: '5rem',
                }}>
                    {props.date}
                </div>
            </div>
            {isExpanded && (
                <div style={{
                    paddingTop: '0.5rem',
                }}>
                    {props.content}
                </div>
            )}
        </div>
    )
}