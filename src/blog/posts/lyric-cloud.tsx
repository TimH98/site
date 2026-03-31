

export default function LyricCloudPost() {
    const image = `${process.env.PUBLIC_URL}/lyric-clouds/All Star - Smash Mouth.png`;
    return (
        <div>
            I made a game where you name the song title given a word cloud of its lyrics!
            <br />
            <br />
            <a href="/#/lyric-cloud" style={{fontWeight: 'bold'}}>Read more here and try it out!</a>
            <br />
            <br />
            <img src={image} style={{width: '100%'}}/>
        </div>
    )
}