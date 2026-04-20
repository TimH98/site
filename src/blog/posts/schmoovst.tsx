export default function SchmoovstPost() {
    return (
        <div>
            Schmoovst is a local multiplayer twin-stick shooter about defeating enemies, leveling up your ship, and eventually taking down your opponents.
            <br />
            <br />
            <a href="/#/schmoovst" style={{fontWeight: 'bold'}}>Read more and start Schmoovsting!</a>
        </div>
    )
}

export function SchmoovstDevNotes() {
    return (
        <div>
            This was my first foray into HTML5. I had been well aware of the technology for a while, especially in the context of <a href="https://www.adobe.com/products/flashplayer/end-of-life-alternative.html">Flash's end of life in 2020</a>, but I never had a good reason to learn or use it.
            <br />
            <br />
            After getting absolutely sucked into <a href="https://store.steampowered.com/app/3405340/Megabonk/">Megabonk</a> for a few months, I wanted to create my own game inspired by it but with an emphasis on local multiplayer. I <i>could</i> go and learn a real game engine like <a href="https://godotengine.org/">Godot</a>, but I had no illusions about making a "real game", I just wanted to slap something together for my own enjoyment. So I learned just enough HTML5 to be dangerous and got hacking. The end result is, uh, not a codebase I'm especially proud of, but the gameplay loop is solid!
            <br />
            <br />
            Game-design-wise, most of it is ripped from Megabonk and Vampire Survivors - Enemies spawn around you, your weapon auto-fires, and you're mainly focusing on selecting upgrades. Since it's multiplayer, though, the game doesn't pause when a player levels up. Instead they have to choose on the fly while avoiding enemies, which is a fun new challenge but limits how complex the upgrades can be. I settled on 7 that are simple enough to describe in 1-2 words and gave each a distinct color to make them stand out at a glance.
            <br />
            <br />
            There are some aspects that I would improve if given more time. One is the lack of polish and "game-feel" - There are virtually no animations, and it doesn't feel especially satisfying to kill an enemy or level up. It also just feels terrible to play at the start. I mean the point of the game is that your ship gets more enjoyable to steer over time, but it gives a rough first impression. Oh, and there's no sound.
            <br />
            <br />
            <b>Credits:</b>
            <ul>
                <li>Ship, bullet, XP images from https://kenney.nl/assets</li>
                <li>Upgrade icons from https://game-icons.net</li>
            </ul>
        </div>
    )
}