import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/blogs/getByUserId/${userId}`
        );
        if (res && res.data && res.data.blog) {
          const data = res.data.blog.blog;
          setBlogs(data);
        }
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch your blogs");
      }
    };

    fetchBlogs().catch((error) => console.log(error));
  }, [userId]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const location = useLocation();
  const isMyblogPage = location.pathname === '/myblogs';

  return (
    <div>
      <div
        style={{
          marginTop: "9vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter title"
          style={{ borderRadius: "10px", width: "300px" }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <Grid container spacing={3}>
        {filteredBlogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Blog
              id={blog._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.userName}
              showDeleteButton={isMyblogPage} 
            />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          margin: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          component={Link}
          to="/blog/add"
          variant="contained"
          sx={{
            margin: 1,
            borderRadius: 10,
            width: "150px",
          }}
          color="primary"
        >
          Add blog
        </Button>
      </div>
    </div>
  );
}