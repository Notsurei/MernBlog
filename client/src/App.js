import Header from "./component/Header";
import React from "react";
import {Routes, Route} from 'react-router-dom'
import Auth from "./component/Auth";
import Blogs from "./component/Blogs";
import UserBlogs from "./component/UserBlogs";
import AddBlog from "./component/AddBlog";
import Blogdetail from "./component/Blogdetail";
import {useSelector} from 'react-redux'
import ForgotPassword from "./component/Forgotpassword";
import Resetpassword from "./component/Resetpassword";
import Error from "./component/Error";
import Welcome from "./component/Welcome";
import Content from "./component/Content";


function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          <Route path ="/" element ={<Welcome/>}/>
          <Route path="/auth" element = {<Auth/>}/>
          <Route path="/auth/forgotpassword" element = {<ForgotPassword/>}/>
          <Route path="/blogs" element = {<Blogs/>}/>
          <Route path="/myblogs" element = {<UserBlogs/>}/>
          <Route path="/myblogs/:id" element = {<Blogdetail/>}/>
          <Route path="/blog/add" element = {<AddBlog/>}/>
          <Route path="/auth/resetpassword" element = {<Resetpassword/>}/>
          <Route path="/readblog/:id" element = {<Content/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </main>
    </React.Fragment>

  );
}

export default App;