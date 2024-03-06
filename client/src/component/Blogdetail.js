import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, InputLabel } from '@mui/material';

export default function Blogdetail() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        const data = await res.data;
        setBlog(data);
        setInput({
          title: data.title,
          description: data.description,
          image: data.image,
        });
      } catch (error) {
        console.log(error);
        throw new Error('Cannot fetch this blog');
      }
    };

    fetchDetail();
  }, [id]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/api/blogs/updateBlog/${id}`, {
        title: input.title,
        description: input.description,
        image: input.image,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Cannot edit your blog');
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
    navigate('/myblogs')
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '10vh' }}>
      <Box border={3} borderColor={'gray'} borderRadius={4} p={2}>
        <Typography variant="h6" color="initial">
          Edit your blog
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
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </div>
  );
}