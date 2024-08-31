import PostList from "./PostList";
import { Link, useNavigate } from "react-router-dom";
import { readData } from "../functions/crud";
import { useState,useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
//import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/fire";

const UserProfile = () => {
    const [about,setAbout]=useState('');
    const { user } = UserAuth();
    //const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const collectionName = "user-profile-details";
            const q = query(collection(db, collectionName), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
        
            if (!querySnapshot.empty) {
                const data = querySnapshot.docs[0].data(); // Get the first document's data
                setAbout(data.About || ""); // Set 'about' field if it exists
            } else {
                console.log("No matching documents found");
            }
        };
        fetchPost();
    });
    return ( 
        <div className="user-profile">
             {about && (
                <div className="about">
                   <h1>About</h1>
                    <p>{about}</p> 
                </div>
            )}
            <PostList/>
        </div>
     );
}
 
export default UserProfile;