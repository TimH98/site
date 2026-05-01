

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
            <img src={image} style={{width: '100%'}} alt="Example word cloud for All Star by Smash Mouth" />
        </div>
    )
}

export function LyricCloudDevNotes() {
    return (
        <div>
            This one was a journey! It started when I took a quiz of a similar format on <a href="https://www.sporcle.com/">Sporcle</a> and thought, <i>it would be cool to have an infinite version of this!</i>
            <h3>Deciding on a song list</h3>
            I wasn't that concerned with how exactly I chose what songs to include in the quiz. I found a <a href="https://www.kaggle.com/datasets/dhruvildave/billboard-the-hot-100-songs">Billboard Hot 100</a> dataset that seemed good enough for my needs. I noticed it had a column for how many weeks a song spent on the list, and figured that sounds like a good proxy for popularity. I played around with different thresholds and found that {">"}=30 weeks gave us a list of ~1000 songs, enough to feel significant.
            <h3>Finding lyrics</h3>
            I searched and searched for an API I could use to fetch lyrics given a song title, but in the end I decided a web scrape would have to work. I made a Selenium script to search a song lyric site for each song and pull the lyric text out of the page. The results were ~80-90% good, but sometimes the search would give weird results or the lyrics on the page weren't in the format I expected. Time to call in the robot.
            <br />
            <br />
            This project was actually how I learned that Claude can make web apps right in your chat session! I gave it my faulty lyric data, asked it to look for suspect entries, and it surprised me by spitting out a lyric browser that tagged which lyrics fit certain suspicious criteria like unusual length, presence of links, or words that sound like advertisements. From there I could see what my scraper was doing wrong, patch it, and eventually get a low enough number of suspicious entries that I could manually fill in the rest.
            <h3>Making the word clouds</h3>
            From here, it was smooth sailing. I found a <a href="https://amueller.github.io/word_cloud/">Python package to create word clouds</a> and let it rip on my dataset. From there it was just a matter of making a UI.
            <h3>Designing the Game</h3>
            I wanted this to be multiplayer-friendly; that meant putting the user on a fairly short timer. I think one minute might be harsh but I'd rather go too short than too long. The game did need <i>some</i> kind of hint, though, since anyone that tried it struggled to score more than 2. I wanted to include the song's release year, but there was no release year data in the Billboard dataset I was working with, and I could NOT be bothered to make another scraper. 
            <br />
            <br />
            I thought I was stuck until I realized the dataset included which weeks each song was on the list! So, instead of displaying release year, I could show what years each song was on the Hot 100. Honestly that's even more helpful - you can differentiate songs that were popular for a short time vs timeless ones like All I Want For Christmas Is You which made the Hot 100 for a staggering 16 years.
        </div>
    )
}