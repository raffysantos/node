// Include http module,
var http = require('http'),
// And mysql module you've just installed.
   mysql = require("mysql");
     
// Create the connection.
// Data is default to new mysql installation and should be changed according to your configuration.
var connection = mysql.createConnection({
   user: "guest",
   password: "x3j11",
   database: "synerdev"
});
console.log('mysql connected'); 
// Create the http server.
var server = http.createServer(function (request, response) {
   // Attach listener on end event.
   request.on('end', function () {
      console.log('request ended, querying database...');
	  // Query the database.
      connection.query('SELECT * FROM specialization;', 
		  function (error, rows, fields) {
         console.log('query succeeded');
		 response.writeHead(200, {
            //'Content-Type': 'x-application/json'
			'Content-Type': 'text/plain'
         });
         // Send data as JSON string.
         // Rows variable holds the result of the query.
         response.end(JSON.stringify(rows));
      });
   });
      // IMPORTANT !!!!!
      request.resume();
// Listen on the 8080 port.
}).listen(8080);
// mysq port is 3306