import PostList from "./PostList";
import { Link } from "react-router-dom";
const UserProfile = () => {
    return ( 
        <div className="user-profile">
            <nav><Link to="/entry-page">Home</Link></nav>
            <PostList/>
        </div>
     );
}
 
export default UserProfile;