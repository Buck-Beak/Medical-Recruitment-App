import { useState } from "react";
import { createData } from "../functions/crud";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const { user } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        const data={title,content,userId: user.uid,FirstName:user.firstName,LastName:user.lastName};
        e.preventDefault();
        const collectionName = "posts"; 
        createData(collectionName,data);
        navigate('/')
    }

    return ( 
        <div className="container">
        <nav><Link to="/entry-page">Home</Link></nav>
        <form className="create-post" onSubmit={handleSubmit}>
          <h5 className="header">Create a New Post</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={(e)=>setTitle(e.target.value)} />
            <label htmlFor="title">Post Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="text-area" onChange={(e)=>setContent(e.target.value)}></textarea>
            <label htmlFor="content">Post Content</label>
          </div>
          <div className="input-field">
            <button className="create-btn">Create</button>
          </div>
        </form>
      </div>
     );
}
 
export default CreatePost;