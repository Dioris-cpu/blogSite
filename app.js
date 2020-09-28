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

// INDEX ROUTE
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('ERROR!');
        }else{
            res.render('index', {blogs: blogs});

        }
    }) 
})

// NEW ROUTE
app.get('/blogs/new', function(req, res){
    res.render('new')
    
});

// CREATE ROUTE

app.post('/blogs', function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('new')
        }else{
            // redirect
            res.redirect('/blogs');

        }
    }) 
})

// SHOW ROUTE

app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs')
        }else{
            res.render('show', {blog: foundBlog});

        }
    })
})


app.listen(PORT, function () {
  console.log("server is running");
});
