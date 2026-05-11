import Post from "../blog/post";
import Contact from "../components/contact";
import Title from "../components/title";

function AboutPost() {
    return (
        <div>
            Hi, I'm Tim! From the website name! I'm a full-stack software engineer based in Kansas City, MO. This site is both a portfolio of personal software projects and a place for me to dump anything I find interesting. I'm also looking for work, so if you know of any openings please <a href="mailto:timhaysonline@gmail.com">reach out</a>!
            <br />
            <div style={{ display: "flex", flexDirection: "row", margin: "1rem", justifyContent: "center", alignItems: "center" }}>
                <img src={`${process.env.PUBLIC_URL}/about/1.jpg`} style={{
                    width: "25%",
                    transform: "rotate(3deg)",
                    boxShadow: "2px 2px 2px #000",
                    border: "2px solid white",
                    zIndex: 3,
                }} alt="Me cheesin but my face is totally washed out by the sun" />
                <img src={`${process.env.PUBLIC_URL}/about/2.heic`} style={{
                    width: "25%",
                    transform: "rotate(-5deg)",
                    boxShadow: "2px 2px 2px #000",
                    border: "2px solid white",
                    zIndex: 2,
                }} alt="Me at a Red Bull Lego pop-up event in Chicago" />
                <img src={`${process.env.PUBLIC_URL}/about/3.heic`} style={{
                    width: "25%",
                    transform: "rotate(4deg)",
                    boxShadow: "2px 2px 2px #000",
                    border: "2px solid white",
                    zIndex: 1,
                }} alt="Me looking great with some sushi that was only okay" />
            </div>
            <br />
            Some other things I'm into:
            <h3>Formula 1</h3>
            🟧Go McLaren!🟧
            <h3>Bouldering</h3>
            I'd recommend going to a bouldering gym to anyone who's capable! Unlike rock climbing, there is no harness/belay so the climbs are much shorter, which is great if heights make you uneasy. There's also the puzzle element of mapping out how you'll tackle a challenge before you start it, and chatting with other climbers as you work out the problem together.
            <h3>Board Games</h3>
            Especially <a href="https://boardgamegeek.com/boardgame/240980/blood-on-the-clocktower">Blood on the Clocktower</a>! It's a social deduction game with enough depth that I could probably yap about it for hours. Some other favorites of mine are <a href="https://boardgamegeek.com/boardgame/368061/zoo-vadis">Zoo Vadis</a>, <a href="https://boardgamegeek.com/boardgame/36218/dominion">Dominion</a>, <a href="https://boardgamegeek.com/boardgame/63888/innovation">Innovation</a>, and <a href="https://boardgamegeek.com/boardgame/329839/so-clover">So Clover</a>.
            <h3>Video games</h3>
            I'll play just about any genre, though I usually stick to indie games. Some of my all-time favorites include <a href="https://store.steampowered.com/app/753640/Outer_Wilds/">Outer Wilds</a>, <a href="https://store.steampowered.com/app/646570/Slay_the_Spire/">Slay the Spire</a>, and <a href="https://store.steampowered.com/app/1147860/UFO_50/">UFO 50</a>.
        </div>
    )
}

export default function About() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Title />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '800px',
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'column',
            }}>
                <Post title="About" content={AboutPost()} autoExpand />
            </div>
            <Contact />
        </div>
    )
}