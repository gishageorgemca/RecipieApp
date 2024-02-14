const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Post = new Schema({
    title: { type: String },
    ing: { type: String },
    recipe: { type: String },
    image: { type: String },

}, {
    collection: 'posts'
});
module.exports = mongoose.model('post',
    Post);