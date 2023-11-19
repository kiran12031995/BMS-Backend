const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const categoryRoute = require('./routes/category');
const multer = require('multer');

dotenv.config();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{

}).then(console.log('Connected to mongo DB')).catch((err)=>{
    console.log(err);
})

const storage = multer.diskStorage({
    // indicate the destination //
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(rew,file,cb)=>{
        cb(null,"Hello.jpeg");
    }
});

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);

app.listen(4000,()=>{
    console.log('Backend is running on port 4000');
})
