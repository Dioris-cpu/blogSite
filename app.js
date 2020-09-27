const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const express = require("express");

app = express();

// APP CONFIG

mongoose.connect("mongodb://localhost/blogsite", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES


app.get('/', function(req, res){
    res.redirect('/blogs');
    
})

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('ERROR!');
        }else{
            res.render('index', {blogs: blogs});

        }
    })
    
})

app.listen(PORT, function () {
  console.log("server is running");
});
