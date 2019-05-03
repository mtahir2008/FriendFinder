var friendsList = require("../data/friends.js");

module.exports = function (app) {

	app.get("/api/friends", function (req, res) {

		//display all friends JSON data
		res.json(friendsList);
	});
	app.post("/api/friends", function (req, res) {

		var newUser = req.body;
		//req.body 
		var maxScore = 1000;
		var bestFriend;
		for (var i = 0; i < friendsList.length; i++) {
			var sum = 0;
			var newBFriend = friendsList[i];
			for (var j = 0; j < newUser.scores.length; j++) {
				var diff = Math.abs(newUser.scores[j] - newBFriend.scores[j]);
				sum = sum + diff;

			}
			if (sum <= maxScore) {
				maxScore = sum;
				bestFriend = newBFriend;
			}
		}
		//Add yourself to the array so that someone else can find you. 
		friendsList.push(newUser);
		res.json({ status: 'OK', matchName: bestFriend.name, matchImage: bestFriend.photo });

	});
};
