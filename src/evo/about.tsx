import Post from "../blog/post";
import Title from "../components/title";
import EvoPost from "../blog/posts/evo";

export default function EvoAbout() {
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
                <Post title="Evo - Natural Selection simulator" content={EvoPost()} autoExpand={true}/>
            </div>

        </div>
    )
}