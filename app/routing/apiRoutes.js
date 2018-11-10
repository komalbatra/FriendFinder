//File for handing API data display, incoming survey results and also contains logic to determine compatability 

//Dependencies
var path = require("path");
var friendsData = require ("../data/friends");

module.exports = function (app) {
    //Route to display JSON file  
    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    //Compatability logic
    app.post('/api/friends', function(req, res) {
        var difference = 40;
        var matchName = '';
        var matchPhoto = '';

    // Loop to go through the data in friends.js to find a match
        friendsData.forEach(function(friends) {
            // Variables for comparing matches
            var matchedScoresArray = [];
            var totalDifference = 40;

            // Function to assist in the addition reduce() below
            function add(total, num) {
                return total + num;
            }
            
            for (var i = 0; i < friends.scores.length; i++) {
                matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friends.scores[i])));
            }

            totalDifference = matchedScoresArray.reduce(add, 0);

            // If the above value is smaller than the previous difference...
            if (totalDifference < difference) {
                // Set it as the previous difference...
                difference = totalDifference;
                // And set these variables to the appropriate friend match
                matchName = friends.name;
                matchPhoto = friends.photo;
            }
    });
    // Once the cycle is complete, the match with the least difference will remain,
    // and that data will be sent as a json object back to the client
    res.json({
        name: matchName,
        photo: matchPhoto
    });

    // This adds the new users sent data object to friends.js
    friendsData.push(req.body);
});
};

