export default function ToymakerPost() {
    return (
        <div>
            <b><a href="https://github.com/TimH98/toymaker">Check out Toymaker on GitHub</a></b>
            <br />
            <br />
            Toymaker is a system for fully automating a game of Blood on the Clocktower, allowing you to either watch LLMs play the game or participate as a single player.
            <br />
            <br />
            <a href="https://bloodontheclocktower.com/">Blood on the Clocktower</a> is a social deduction game in the same vein as Werewolf - Most players are on the Good team and win by finding and executing the Demon. The Demon, along with a few other players, are on the Evil team and work to keep the Demon alive and their identity hidden while killing off members of the Town. There are some aspects that, in my opinion, make this game more interesting than Werewolf to implement programmatically:
            <ul>
                <li>Each player has a unique role</li>
            </ul>
            This means that even if you use the same LLM for all players, they each come into the game with a unique perspective. Compare with Werewolf, where most players are vanilla townsfolk and are thus perfectly symmetric.
            <ul>
                <li>The game's moderator has to make judgement calls.</li>
            </ul>
            In Werewolf, the moderator only exists to facilitate player choices. In Blood on the Clocktower, the moderator (called the Storyteller) is more involved. For example, if a player with an info-gathering role is poisoned, they may receive false information, but the Storyteller decides <i>what</i> that false information is. Usually this is whatever is maximally misleading, like being falsely told that good players are Minions or that the Demon is actually good.
            <br />
            <br />
            Toymaker supports several OpenAI, Gemini, and local models. Adding support for new models is straightforward; see the <a href="https://github.com/TimH98/toymaker/blob/master/README.md">README</a> for details.
        </div>
    )
}

export function ToymakerDevNotes() {
    return (
        <div>
        </div>
    )
}