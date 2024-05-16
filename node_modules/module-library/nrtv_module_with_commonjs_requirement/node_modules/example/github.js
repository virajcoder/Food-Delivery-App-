//Load the http module
var https = require('https');

//Get the repos
function getRepos(username, callback) {

	var options = {
		host: 'api.github.com',
		path: '/users/' + username + '/repos',
		method: 'GET'
	};

	var request = https.request(options, function(response) {
		var body = '';
		response.on("data", function(chunk) {
			body += chunk.toString('utf8');
		});
		response.on("end", function(){
			console.log("Request has finished");
			var repos = [];
			var json = JSON.parse(body);
			json.forEach(function(repo){
				repos.push({
					name: repo.name,
					description: repo.description
				});
			});
			callback(repos);
		});
	
		response.on("error", function(error) {
			console.log("ERROR: " + error.message);
		});

	});

	request.on("error", function(error) {
		console.log("ERROR: " + error.message);
	});

	request.end();

}

module.exports.getRepos = getRepos;
