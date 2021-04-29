// including all the libraries
const express=require("express");
const body_parser=require("body-parser");
const request=require("request");
const app=express();
const log_timestamp=require('log-timestamp');
app.set("view engine","ejs");
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
const dotenv = require('dotenv');
dotenv.config();

// starting server code
var port=process.env.PORT || 8080
app.listen(port,function(){
    console.log("The server have started");
})


// file rendering routes
// root get route
app.get("/",function(req,res){
    console.log("sucess: route requested to '/'")
    res.render("home");
})


// /post_title post route
app.post("/post_title", function(req,res){
    let title=req.body.movie_title;
    let url="http://www.omdbapi.com/?s=" + title + "&apikey=" +  process.env['API_KEY'];
    console.log("requested url: " + url);
    request(url,function(error,response,body){
        if (error)
        {
            console.error("error from /post_title route");
            res.send("we encountered error");
        }
        else if (response.statusCode!==200)
        {
            console.error("'not ok' response status code from route /post_title");
            res.send("we encountered some error response.statusCode " + response.statusCode);
        }
        else
        {
            console.log("sucess: route requested to /post_title");
            let data=JSON.parse(body);
            res.render("search_title",{data:data});
        }
    })
})

// /post_id post route
app.post("/post_id", function(req,res){
    let id=req.body.movie_id;
    let url="http://www.omdbapi.com/?i=" + id + "&apikey=" + process.env['API_KEY'];
    console.log("requested url: " + url);
    request(url,function(error,response,body){
        if (error)
        {
            console.error("error from /post_id route");
            res.send("we encountered error");
        }
        else if (response.statusCode!==200)
        {
            console.error("'not ok' response status code from route /post_title");
            res.send("we encountered some error response.statusCode " + response.statusCode);
        }
        else
        {
            console.log("sucess: route requested to /post_id");
            let data=JSON.parse(body);
            res.render("search_id",{data:data});
        }
    })
})
