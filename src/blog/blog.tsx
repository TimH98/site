import Contact from "../components/contact";
import Title from "../components/title";
import Post, { PostProps } from "./post";
import PiratePost from "./posts/pirate";
import SchmoovstPost from "./posts/schmoovst";


const POSTS: PostProps[] = [
    {
        title: "Schmoovst",
        date: "Jan 19, 2026",
        content: <SchmoovstPost />
    },
    {
        title: "The Lazy Pirate Quiz",
        date: "Dec 8, 2025",
        content: <PiratePost />,
    }
]

export default function Blog() {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Title />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '600px',
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