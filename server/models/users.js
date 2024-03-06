const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6, 
    },
    blog:[{
        type: mongoose.Types.ObjectId, ref:"Blog",
        required: true
    }],
    resetToken: String,
    expiredToken: String,
    
},
{
    timestamps: true,
});

const user = mongoose.model('User', userSchema);
module.exports = user;