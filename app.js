//jshint esversion:6

//to use express.js
const express = require("express");
//to load the details from page to app.js
const bodyParser = require("body-parser");
//to use ejs scriplet tags
const ejs = require("ejs");
//to connect to database
const mongoose = require("mongoose");

// Load the full build.
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//set to load this file at startup
app.set('view engine', 'ejs');

//to use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

//to access this folder and load the css file at startup
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://Nitin243:Nitin243@cluster0.ab7cf.mongodb.net/blogDb?retryWrites=true&w=majority/posts",
  {
    useNewUrlParser: true,
  }
);


//to connect through the local database
// mongoose.connect("mongodb://localhost:27017/blogDb", {useNewUrlParser: true});


//created a schema to store the details in database in this format
const postSchema = {
  title: String,
  body: String
};


//create the Post model to create a collection
const Post = mongoose.model("Post", postSchema);

// let posts = [];

//first method to run at startup and load all files
app.get("/", function(req, res) {

  Post.find({}, function(err, posts){

    //to load and render all files at startup
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  })
});

app.get("/about", function(req, res) {

  res.render("about", {
    about: aboutContent,
  });

});

app.get("/contact", function(req, res) {

  res.render("contact", {
    contact: contactContent
  });

});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  });
  // posts.push(post);
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  res.redirect("/");

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title : post.title,
      body : post.body
    });
  })
  // const requsetedTitle = _.lowerCase(req.params.postName);
  //
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.postTitle);
  //
  //   if(storedTitle === requsetedTitle){
  //
  //     res.render("post", {
  //       title : post.postTitle,
  //       body : post.postBody
  //     });
  //
  //   }
  // });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
