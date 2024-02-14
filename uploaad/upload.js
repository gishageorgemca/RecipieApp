const express = require('express')
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: "uploads",
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})
const upload = multer({
    storage: storage
})

module.exports = upload;