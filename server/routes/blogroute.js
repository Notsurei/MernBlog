const express = require('express');
const { getAllBlog, addBlog, deleteBlog, updateBlog, getSingleBlog, getByUserId} = require('../controllers/blogcontroler');


const blogrouter = express.Router();

blogrouter.get('/', getAllBlog);
blogrouter.get('/:id', getSingleBlog);
blogrouter.get('/getByUserId/:id', getByUserId);
blogrouter.post('/AddBlog', addBlog);
blogrouter.delete('/:id', deleteBlog);
blogrouter.put('/updateBlog/:id', updateBlog);



module.exports = blogrouter;