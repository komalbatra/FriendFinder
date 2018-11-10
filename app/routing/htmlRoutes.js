//FILE FOR ROUTING TO HTML pages

//Dependencies
var path = require("path");

module.exports = function (app) {
    //Displayes survey page
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/survey.html"))
    });

    //Catch-all route that displays home page
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + "/../public/home.html"))
    });
};