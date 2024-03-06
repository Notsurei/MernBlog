import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Blog from './Blog';
import { Link, useNavigate } from "react-router-dom";


export default function Welcome() {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();


  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/blogs");
      if (res && res.data) {
        const data = res.data;
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if(storedLoggedIn !== 'false'){
      navigate('/blogs');
    }

    sendRequest()
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));
  });

  

  return (
    <div>
      <Grid sx={{textDecoration:'none'}} container spacing={2} component={Link} to="/auth">
        {blogs &&
          blogs.map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Blog
                title={blog.title}
                description={blog.description}
                imageURL={blog.imageURL}
                userName={blog.user.name}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}