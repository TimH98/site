import Title from "../components/title";
import Post from "./post";
import PiratePost from "./posts/pirate";


const POSTS = [
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
        }}>
            <Title />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '600px',
                width: '90%',
                alignSelf: 'center',
            }}>
                {POSTS.map((post) => (
                    <Post key={post.title} title={post.title} content={post.content} />
                ))}
            </div>
        </div>
    )
}