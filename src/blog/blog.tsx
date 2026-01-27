import Contact from "../components/contact";
import Title from "../components/title";
import Post from "./post";
import PiratePost from "./posts/pirate";
import SchmoovstPost from "./posts/schmoovst";


const POSTS = [
    {
        title: "Schmoovst",
        content: <SchmoovstPost />
    },
    {
        title: "The Lazy Pirate Quiz",
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
                    <Post key={post.title} title={post.title} content={post.content} />
                ))}
            </div>
            <Contact />
        </div>
    )
}