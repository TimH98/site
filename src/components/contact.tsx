import pen from '../image/pen.png';
import github from '../image/github.png'
import linkedin from '../image/linkedin.png'
import mail from '../image/mail.png'

export default function Contact() {
    return (
        <div style={{
            display: 'inline-block',
            position: 'relative'
        }}>
            <img src={pen} style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                padding: '1rem 0',
                filter: 'drop-shadow(4px 4px 3px #222)',
                zIndex: -1
            }}/>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                right: '15%',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                fontWeight: 'bold'
            }}>
                <div style={{
                    paddingRight: '12%'
                }}>Contact Me</div>
                <div style={{
                    height: '25%',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <img src={mail} style={{
                        cursor: 'pointer',
                        marginLeft: '10%'
                    }} onClick={() => {
                        window.location.href = 'mailto:timhaysonline@gmail.com'
                    }}/>
                    <img src={github} style={{
                        cursor: 'pointer',
                        marginLeft: '10%'
                    }} onClick={() => {
                        window.location.href = 'https://github.com/TimH98'
                    }}/>
                    <img src={linkedin} style={{
                        cursor: 'pointer',
                        marginLeft: '10%'
                    }} onClick={() => {
                        window.location.href = 'https://www.linkedin.com/in/tim-hays-002961157/'
                    }}/>
                </div>
            </div>
        </div>
    )
}