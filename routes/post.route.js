const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');
const multer = require('multer')
let postModel = require('../Models/post');
let upload = require('../uploaad/upload');
const bodyParser = require('body-parser');
app.use('/uploads', express.static("uploads"));

route.get('/', async(req, res) => {
    const allpost = await postModel.find();
    console.log(allpost);
    res.send(allpost);

});

//to add new newpost
route.post('/addPost', upload.single('image'), function(req, res) {
    let post = new postModel({
        title: req.body.title,
        ing: req.body.ing,
        recipe: req.body.recipe,

    })
    if (req.file) {
        post.image = req.file.path
    }
    post.save()
        .then(game => {
            res.status(200).json({ 'post': 'post added successfully' });
        })
        .catch(err => {
            res.status(400).send({ 'post': 'something went wrong' });


        });
});

//to get postdeatiles by postid
route.get('/singlepost/:id', async(req, res) => {
    let id = req.params.id;
    const eachpost = await postModel.findById(id);
    console.log(eachpost);
    res.send(eachpost);
});
//to update post
route.put('/updatepost/:id', upload.single('image'), async(req, res) => {
    try {
        let id = req.params.id;
        const post = {
            title: req.body.title,
            ing: req.body.ing,
            recipe: req.body.recipe,
            image: req.file.path,
            name: req.body.name,
            comments: req.file.comments
        }
        await postModel.findByIdAndUpdate(id, post);
        if (!post) {
            return next(new Error('unable to find postwith this id'));
        }
        const updatedpost = await postModel.findById(id);
        res.status(200).json(updatedpost);

    } catch (err) {
        res.status(400).send("unable to update employee");
    }
});



route.delete('/deletepost/:id', async(req, res) => {
    try {
        let id = req.params.id;
        const delpost = await postModel.findByIdAndDelete(id, req.body);
        if (!delpost) {
            return next(new Error('unable to find post with this id'));
        } else
            res.send("deleted successfully");
    } catch (err) {
        res.status(400).send("deletion failed");
    }
})

module.exports = route;