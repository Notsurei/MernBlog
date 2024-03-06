const mongoose = require('mongoose');
const Blog = require('../models/blogs');
const User = require('../models/users');


const getAllBlog = async(req, res, next) => {
    let blogs = await Blog.find().populate('user');
    res.status(200).json(blogs);
}



const addBlog = async(req, res, next) => {
    const {title, description, image, user} = req.body;

    const findUser = await User.findById(user);

    if(!findUser){
        return res.status(404).json('no user found');
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        findUser.blog.push(blog);
        await findUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        return res.status(500).json('some error occured');
    }

    return res.status(200).json({blog});
}

const deleteBlog = async (req, res, next) => {
    let blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId).populate('user');
    
        if (!blog) {
          return res.status(404).json('Blog not found');
        }
 
        if (blog.user) {
          const userId = blog.user._id;
    
          const user = await User.findById(userId);
          user.blog.pull(blogId);
          await user.save();
        }
    
        await Blog.findByIdAndDelete(blogId);
    
        return res.status(200).json('Deleted Blog');
      } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
      }
}

const updateBlog = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, image } = req.body;
  
    const find = await Blog.findById(id);
  
    if (!find) {
      return res.status(404).json('Blog not found');
    }
  
    
    if (!description || !image) {
      return res.status(400).json('Description and image are required');
    }
  
    find.title = title;
    find.description = description;
    find.image = image;
  
    await find.save();
  
    return res.status(200).json(find);
  };

const getSingleBlog = async(req, res, next) => {
    const id = req.params.id;
    const find = await Blog.findById(id);

    if(!find){
        return res.status(404).json('no blog found');
    }

    return res.status(200).json(find);
}

const getByUserId = async(req, res, next) => {
    const UserId = req.params.id;
    const find = await User.findById(UserId).populate('blog');

    if(!find){
        return res.status(404).json({message: 'No blog found'});
    }

    return res.status(200).json({blog: find});
}

module.exports = {getAllBlog, addBlog, deleteBlog, updateBlog, getSingleBlog, getByUserId};