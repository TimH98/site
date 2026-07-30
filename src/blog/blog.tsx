import Contact from "../components/contact";
import Title from "../components/title";
import Post, { PostProps } from "./post";
import PiratePost, { PirateDevNotes } from "./posts/pirate";
import SchmoovstPost, { SchmoovstDevNotes } from "./posts/schmoovst";
import EvoPost, { EvoDevNotes } from "./posts/evo";
import LyricCloudPost, { LyricCloudDevNotes } from "./posts/lyric-cloud";
import DevNotesPost, { DevNotesDevNotes } from "./posts/dev-notes";
import ColorCuePost, { ColorCueDevNotes } from "./posts/color-cue";
import ToymakerPost from "./posts/toymaker"
import FourWordsPost from "./posts/four-words";


const POSTS: PostProps[] = [
    {
        title: "FourWords",
        date: "Jul 30, 2026",
        content: <FourWordsPost />,
        tags: ["portfolio"],
    },
    {
        title: "Toymaker: AI Storyteller & Player for Blood on the Clocktower",
        date: "Jun 1, 2026",
        content: <ToymakerPost />,
        tags: ["portfolio"],
    },
    {
        title: "Color Cue Reaction Trainer",
        date: "Apr 30, 2026",
        content: <ColorCuePost />,
        devNotes: <ColorCueDevNotes />,
        tags: ["portfolio"],
    },
    {
        title: "Dev Notes",
        date: "Apr 20, 2026",
        content: <DevNotesPost />,
        devNotes: <DevNotesDevNotes />,
    },
    {
        title: "Lyric Clouds",
        date: "Mar 27, 2026",
        content: <LyricCloudPost />,
        devNotes: <LyricCloudDevNotes />,
        tags: ["portfolio"],
    },
    {
        title: "Evo - Natural Selection simulator",
        date: "Feb 19, 2026",
        content: <EvoPost />,
        devNotes: <EvoDevNotes />,
        tags: ["portfolio"],
    },
    {
        title: "Schmoovst",
        date: "Jan 19, 2026",
        content: <SchmoovstPost />,
        devNotes: <SchmoovstDevNotes />,
        tags: ["portfolio"],
    },
    {
        title: "The Lazy Pirate Quiz",
        date: "Dec 8, 2025",
        content: <PiratePost />,
        devNotes: <PirateDevNotes />,
        tags: ["portfolio"],
    }
]

export default function Blog({ filter }: { filter?: string }) {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <Title active={filter ?? "blog"} />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '800px',
                width: '90%',
                alignSelf: 'center',
                flexDirection: 'column',
                flex: 1,
            }}>
                {POSTS.filter((post) => !filter || post.tags?.includes(filter)).map((post) => (
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