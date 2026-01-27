import Post from "../blog/post";
import Title from "../components/title";
import { useNavigate } from "react-router-dom";
import bulletCountImage from './image/upgrade_bulletcount.svg';
import fireRateImage from './image/upgrade_firerate.svg';
import gravityImage from './image/upgrade_gravity.svg';
import rangeImage from './image/upgrade_range.svg';
import speedImage from './image/upgrade_speed.svg';
import strengthImage from './image/upgrade_strength.svg';
import turnSpeedImage from './image/upgrade_turnspeed.svg';
import promoImage from './image/schmoovst_promo.png';
import './font.css';

function Logo() {
    return <span style={{
        fontFamily: 'LogoFont',
        fontSize: '3.5rem',
        lineHeight: '2.5rem',
        marginBottom: '1rem',
        color: '#fff',
        WebkitTextStroke: '4px #333',
    }}>Schmoovst</span>
}

const UPGRADE_ICON_SIZE = '24px';

function HowToPlay() {
    return (<div>
        <b>Schmoovst</b> is a competitive multiplayer twin-stick shooter about shooting, moving, and choosing.
        Schmoovsting! Kill enemies and collect XP to upgrade your ship until you're strong enough to take on your
        opponents.
        <br />
        <br />
        <img src={promoImage} alt="Schmoovst Promo" style={{width: '100%'}}/>
        <br />
        <h3>Controls</h3>
        <table style={{marginLeft: '1rem'}}>
            <tr>
                <td><b>Left stick</b></td>
                <td>Aim</td>
            </tr>
            <tr>
                <td><b>Right stick</b></td>
                <td>Move</td>
            </tr>
            <tr>
                <td><b>LB/RB</b></td>
                <td>Select an upgrade</td>
            </tr>
            <tr>
                <td><b>A/B/X/Y</b></td>
                <td>Get selected upgrade</td>
            </tr>
        </table>
        <h3>Upgrades</h3>
        <table style={{marginLeft: '1rem'}}>
            <tr>
                <td><img src={bulletCountImage} alt="Bullet Count" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Bullet Count</b></td>
                <td>Number of bullets shot at once</td>
            </tr>
            <tr>
                <td><img src={fireRateImage} alt="Fire Rate" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Fire Rate</b></td>
                <td>How frequently you shoot</td>
            </tr>
            <tr>
                <td><img src={gravityImage} alt="Gravity" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Gravity</b></td>
                <td>How strongly XP is pulled towards you</td>
            </tr>
            <tr>
                <td><img src={rangeImage} alt="Range" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Range</b></td>
                <td>How far your bullets travel</td>
            </tr>
            <tr>
                <td><img src={speedImage} alt="Move Speed" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Move Speed</b></td>
                <td>How fast your ship moves</td>
            </tr>
            <tr>
                <td><img src={strengthImage} alt="Strength" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Strength</b></td>
                <td>How much damage your bullets deal</td>
            </tr>
            <tr>
                <td><img src={turnSpeedImage} alt="Turn Speed" style={{width: UPGRADE_ICON_SIZE, height: UPGRADE_ICON_SIZE}}/></td>
                <td><b>Turn Speed</b></td>
                <td>How fast your ship turns when aiming</td>
            </tr>
        </table>
        <br />
        When you choose an upgrade, that upgrade becomes more likely to appear in future level-ups.
    </div>)
}

function StartGameButtons() {
    const navigate = useNavigate();
    return (
        <div>
            Note: A controller is required to schmoovst.
            <br/>
            <br/>
            <button style={{marginRight: '1rem'}} onClick={() => {
                navigate('/schmoovst/game', { state: { numPlayers: 1 } });
            }}>1 Player</button>
            <button style={{marginRight: '1rem'}} onClick={() => {
                navigate('/schmoovst/game', { state: { numPlayers: 2 } });
            }}>2 Players</button>
            <button style={{marginRight: '1rem'}} onClick={() => {
                navigate('/schmoovst/game', { state: { numPlayers: 3 } });
            }}>3 Players</button>
            <button style={{marginRight: '1rem'}} onClick={() => {
                navigate('/schmoovst/game', { state: { numPlayers: 4 } });
            }}>4 Players</button>
        </div>
    )
}

export default function Schmoovst() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title />
            <Logo />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '600px',
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'column',
            }}>
                <Post title="How to play" content={HowToPlay()}/>
                <Post title="Start Game" content={StartGameButtons()}/>
            </div>

        </div>
    )
}