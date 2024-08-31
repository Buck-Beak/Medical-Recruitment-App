import { readAllData} from "../functions/crud";
import { useEffect,useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const EntryPage = () => {
    const [posts, setPosts] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            const collectionName = "posts";
            const data = await readAllData(collectionName);
            const userPosts = data.filter(post => post.userId !== user.uid);
            setPosts(userPosts); // Store all posts data
        };

        fetchPosts();
    }, [user]);
    
    return ( 
        <div className="entry-page">
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <Link to={`/user-profile/${post.userId}`}>Go to Profile</Link>
                    <h2>{post.title}</h2> 
                    <p>{post.content}</p>
                    <p>Author Name:{post.FirstName} {post.LastName}</p>
                </div>
            ))}
        </div>
     );
}
 
export default EntryPage;