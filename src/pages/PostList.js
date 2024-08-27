import { Link } from "react-router-dom";
import { readAllData } from "../functions/crud";
import { useEffect,useState } from "react";
import { UserAuth } from "../context/AuthContext";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        const fetchPosts = async () => {
        const collectionName = "posts";
        const data = await readAllData(collectionName);
        const userPosts = data.filter(post => post.userId === user.uid);
        setPosts(userPosts); // Store all posts data
        };

        fetchPosts();
    }, [user]);
    return ( 
        <div className="post-list">
            <h2>Your Posts</h2>
            <ul>
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link> 
                </div>
            ))}
            </ul>
        </div>
     );
}
 
export default PostList;