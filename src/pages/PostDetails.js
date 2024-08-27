import { readData,deleteData } from "../functions/crud";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const collectionName = "posts";
            const data = await readData(collectionName, id); // Fetch the post by ID
            setPost(data); // Store the fetched post data
        };

        fetchPost();
    }, [id]);

    const handleDelete=()=>{
        const fetchPost = async () => {
            const collectionName = "posts";
            const data = await deleteData(collectionName, id); // Fetch the post by ID
            setPost(data); // Store the fetched post data
            navigate('/user-profile');
        };

        fetchPost();
    }
    return ( 
        <div className="post-details">
            {post && (
                <div className="post-preview" key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p> 
                </div>
            )}
            <button onClick={handleDelete}>Delete Post</button>
        </div>
     );
}
 
export default PostDetails;