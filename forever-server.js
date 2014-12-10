// one parent can have multiple child processes but each child can have only one parent!

var forever = require('forever-monitor');

var child = new(forever.Monitor)('server.js', {
    silent: true,
    sourceDir: 'c:/printServer'
});

child.on('exit', function() {});
//The server process is not dependent on the the git pull
child.start();


//The problem with this script is the fact that the script will not run but in the start of the computer when it will not have internet connection!
//So I need to execute the process when there is internet connection. Probably using a cron or something else
var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { 

	sys.puts(stdout);
	
	if (error == null) { // The error might be for example that the user has no internet connection.
		//Here I restart the server.js child process because the git pull was just called.
		child.restart();
    }
	
}

var options = {cwd:"C:\\printServer"};

exec("git status && git reset --hard && git pull", options, puts);