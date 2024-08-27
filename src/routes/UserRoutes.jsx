import React from 'react'
import UserDashboard from '../pages/UserDashboard';
import { Route, Routes } from "react-router-dom";
import CreatePost from '../pages/CreatePost';
import UserProfile from '../pages/UserProfile';
import PostDetails from '../pages/PostDetails';
import EntryPage from '../pages/EntryPage';

export default function UserRoutes() {
  return (
    <div>
      <UserDashboard />
      <Routes>
        <Route path="/create-post" element={<CreatePost />}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/post/:id" element={<PostDetails/>}/>
        <Route path="/entry-page" element={<EntryPage/>}/>
      </Routes>
    </div>
  )
}
