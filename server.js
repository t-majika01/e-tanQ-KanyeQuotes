require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.post("/kanye", function(req, res1){
    https.get(process.env.KANYE, function(res){
       res.on("data", function(data){
        const kanyeQuote = JSON.parse(data);
        res1.render("res", {kanyeQuoteRes: kanyeQuote.quote});
       });
    });
});

app.post("/more", function(req, res){
    res.redirect("/");
});


const PORT = process.env.PORT || 3001; 

app.listen(PORT, function(){
    console.log(`Server up and running at port ${PORT}`);
});