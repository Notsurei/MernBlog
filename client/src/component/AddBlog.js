import React, { useState } from 'react';
import { Box, Typography, InputLabel, TextField, Button } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function AddBlog() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: '',
    description: '',
    image: '',
    user:''
  });

  const userId = localStorage.getItem('userId');

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/blogs/addBlog', {
        title: input.title,
        description: input.description,
        image: input.image,
        user: userId,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add your blog');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('added new blog');
    navigate('/myblogs');
  };

  const handleDescriptionKeyDown = (e) => {
    if(e.key === 'Enter' && e.shiftKey){
      e.preventDefault();
    }
  }

  return (
    <div style={{ marginTop: '10vh' }}>
      <Box border={3} borderColor={'gray'} borderRadius={4} p={2}>
        <Typography variant="h6" color="initial">
          Post your blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputLabel>Title</InputLabel>
          <TextField
            name="title"
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
            fullWidth
            required
            onKeyDown={handleDescriptionKeyDown}
          />
          <InputLabel>Content</InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={(e) => setInput({ ...input, description: e.target.value })}
            fullWidth
            multiline
            rows={50}
            required
            onKeyDown={handleDescriptionKeyDown}
          />
          <InputLabel>Image URL</InputLabel>
          <TextField
            name="imageURL"
            value={input.image}
            onChange={(e) => setInput({ ...input, image: e.target.value })}
            fullWidth
            required
            onKeyDown={handleDescriptionKeyDown}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Add Blog
          </Button>
        </form>
      </Box>
    </div>
  );
}