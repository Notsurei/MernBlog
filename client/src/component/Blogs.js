import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Blog from "./Blog";
import { TextField } from "@mui/material";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    sendRequest()
      .then((data) => setBlogs(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterSearch = Array.isArray(blogs)
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
          placeholder="Enter writer or title"
          style={{ borderRadius: "10px", width: "300px" }}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 12 }}
      >
        {filterSearch.map((blog, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Blog
              id = {blog._id}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={blog.user.name}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}