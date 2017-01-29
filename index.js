'use strict';

var express = require('express');
var path = require('path');
var multer = require('multer');

var app = express();
var port = process.env.PORT || 3000;

var diskStorage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./uploads');
    },
    filename: function (req,file,cb) {
        console.log(file);
        cb(null,file.originalname);
    }
});

var fileUpload = multer({storage: diskStorage}).single('newfile');

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', function(req,res) {
    fileUpload(req,res, function(err) {
        if (err) { console.log('Error: ' + err); return; }

        console.log(req.file);

        var fileSize = { size: req.file.size };
//        res.end('file uploaded. size is: ' + req.file.size);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(fileSize));

        console.log('file uploaded');
    });
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});
