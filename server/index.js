const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/UserRoutes');
const blogrouter = require('./routes/blogroute');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/users', router);
app.use('/api/blogs', blogrouter);

dotenv.config();





let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

mongoose.connect("mongodb+srv://khoivo:khoi123@users.pw38zrn.mongodb.net/users?retryWrites=true&w=majority").then(() => {
    console.log('database connected');
}).catch((error) => {
    console.log(error);
})