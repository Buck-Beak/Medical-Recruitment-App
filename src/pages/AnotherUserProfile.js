import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/fire";
import { useNavigate } from "react-router-dom";
import { readAllData } from "../functions/crud";
//import feedback from "./Feedback";

const AnotherUserProfile = () => {
    const {id} = useParams();
    const [about,setAbout] = useState('');
    const [first,setFirst] = useState('');
    const [last,setLast] = useState('');
    const [posts,setPosts] = useState([]);
    const [hiring,setHiring] = useState('');
    const [FeedbackComponent, setFeedbackComponent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            console.log(id);
            const collectionName = "user-profile-details";
            const q = query(collection(db, collectionName), where("userId", "==", id));
            const querySnapshot = await getDocs(q);
        
            if (!querySnapshot.empty) {
                const data = querySnapshot.docs[0].data(); // Get the first document's data
                setAbout(data.About || ""); // Set 'about' field if it exists
                setFirst(data.FirstName || "");
                setLast(data.LastName || "");
                setHiring(data.Hiring || "");
                if (data.Hiring) {
                    const Feedback = await import("./Feedback");
                    setFeedbackComponent(() => Feedback.default);
                  }
            } else {
                console.log("No matching documents found");
            }
            
            const collectionPostName = "posts";
            const data = await readAllData(collectionPostName);
            const userPosts = data.filter(post => post.userId === id);
            setPosts(userPosts); // Store all posts data
        };
        fetchPost();

        
            
    });
    const handleClick=()=>{
        navigate("/apply",{ state: { recruiterId: id } });
    }

    return ( 
        <div className="another-user">
            <h1>{first} {last}</h1>
            <p>{about}</p>
            <button onClick={handleClick}>Apply</button>
            <ul>
            {FeedbackComponent && <FeedbackComponent recruiterId={id} />}
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <Link to={`/post/${post.id}`}>{post.title}</Link> 
                </div>
            ))}
            </ul>
            
        </div>
     );
}
 
export default AnotherUserProfile;