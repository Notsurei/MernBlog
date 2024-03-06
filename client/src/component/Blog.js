import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Blog({
  title,
  imageURL,
  userName,
  showDeleteButton,
  id,
}) {
  const location = useLocation();
  const isMyblogPage = location.pathname === "/myblogs";
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };

  const handlereadBlog = () => {
    navigate(`/readblog/${id}`);
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:4000/api/blogs/${id}`);
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    alert('deleted your blog');
    window.location.reload();
  }
    

  return (
      <Card
        sx={{
          width: 400,
          margin: "auto",
          mt: 7,
          padding: 2,
          boxShadow: "10px 10px 5px #ccc",
          ":hover": {
            boxShadow: "10px 10px 30px #ccc",
          },
        }}
      >
        <CardHeader onClick={handlereadBlog}
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          sx={{":hover":{cursor:'pointer'}}}
          title={title}
        />
        <CardMedia
          onClick={handlereadBlog}
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
          sx={{":hover":{cursor:'pointer'}}}
        />
        {showDeleteButton && isMyblogPage && (
          <Box>
            <Button variant="text" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="text" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Card>
  );
}