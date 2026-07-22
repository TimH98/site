import Post from "../blog/post";
import Title from "../components/title";
import FourWordsPost from "../blog/posts/four-words";

export default function FourWordsAbout() {
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
                <Post title="FourWords" content={FourWordsPost()} autoExpand={true}/>
            </div>

        </div>
    )
}