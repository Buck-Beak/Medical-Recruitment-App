import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { createData } from "../functions/crud";
import { useNavigate } from "react-router-dom";

const UserProfileDetails = () => {
    const [about,setAbout] = useState('');
    const { user } = UserAuth();
    const navigate = useNavigate();
    

    const handleSubmit=(e)=>{
        const data={userId: user.uid,FirstName:user.firstName,LastName:user.lastName,About:about,Hiring:user.hiring};
        e.preventDefault();
        const collectionName="user-profile-details";
        createData(collectionName,data);
        navigate('/');
    }
    return ( 
        <div className="user-profile-details">
            <form className="create-user" onSubmit={handleSubmit}>
                <h5 className="header">Enter the details</h5>
                <div className="input-field">
                    <textarea id='title' onChange={(e)=>setAbout(e.target.value)}/>
                    <label htmlFor="About">About</label>
                </div>
                <button>Submit</button>
            </form>

        </div>
     );
}

 
export default UserProfileDetails;