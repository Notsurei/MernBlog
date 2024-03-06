const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogschema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type :String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,ref: "User",
        required: true
    }
},
{
    timestamps: true
})

const blog = mongoose.model('Blog', blogschema);
module.exports = blog;