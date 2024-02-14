const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//mongodb database url

let mongoDatabase = "mongodb://0.0.0.0:27017/blogapp";
//created express server
const app = express();
mongoose.Promise = global.Promise;
//connect mongodb databse
mongoose.connect(mongoDatabase, { useNewurlParser: true })
    .then(() => { console.log('database is connected') },
        err => { console.log('there is problem while connecting database' + err) });
//all the express routes
const postRoutes = require('./routes/post.route');
let upload = require('./uploaad/upload')
    //convert incoming data to json format
app.use(express.json())
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
//enable cors
app.use(cors({ origin: 'http://localhost:4200' }));


const port = 4009;
//rout configuration
app.use('/posts', postRoutes);

const server = app.listen(port, function() {
    console.log("server listening on port:" + port);
});