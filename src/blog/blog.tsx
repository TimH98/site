import Contact from "../components/contact";
import Title from "../components/title";
import Post, { PostProps } from "./post";
import PiratePost, { PirateDevNotes } from "./posts/pirate";
import SchmoovstPost, { SchmoovstDevNotes } from "./posts/schmoovst";
import EvoPost, { EvoDevNotes } from "./posts/evo";
import LyricCloudPost, { LyricCloudDevNotes } from "./posts/lyric-cloud";
import DevNotesPost, { DevNotesDevNotes } from "./posts/dev-notes";
import ColorCuePost, { ColorCueDevNotes } from "./posts/color-cue";


const POSTS: PostProps[] = [
    {
        title: "Color Cue Reaction Trainer",
        date: "Apr 30, 2026",
        content: <ColorCuePost />,
        devNotes: <ColorCueDevNotes />
    },
    {
        title: "Dev Notes",
        date: "Apr 20, 2026",
        content: <DevNotesPost />,
        devNotes: <DevNotesDevNotes />
    },
    {
        title: "Lyric Clouds",
        date: "Mar 27, 2026",
        content: <LyricCloudPost />,
        devNotes: <LyricCloudDevNotes />
    },
    {
        title: "Evo - Natural Selection simulator",
        date: "Feb 19, 2026",
        content: <EvoPost />,
        devNotes: <EvoDevNotes />
    },
    {
        title: "Schmoovst",
        date: "Jan 19, 2026",
        content: <SchmoovstPost />,
        devNotes: <SchmoovstDevNotes />
    },
    {
        title: "The Lazy Pirate Quiz",
        date: "Dec 8, 2025",
        content: <PiratePost />,
        devNotes: <PirateDevNotes />
    }
]

export default function Blog() {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <Title />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '800px',
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'column',
                flex: 1,
            }}>
                {POSTS.map((post) => (
                    <Post
                        key={post.title}
                        {...post}
                    />
                ))}
            </div>
            <Contact />
        </div>
    )
}