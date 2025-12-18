// Import required modules
const express = require('express'); // Express framework for handling HTTP requests in node.js.
const bodyParser = require('body-parser');  // body-parser that parses request bodies in JSON formats
const mysql = require('mysql2'); // MySQL2 client for Node.js is for connect with database provide database interaction
const cors = require('cors'); // For web security Used to maintain or relax cross-domain access restrictions.
const { v4: uuidv4 } = require('uuid');// Universally Unique Identifier Generate unique identifiers

port=3306;
// // Create an instance of express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));  // Parsing Form Data
app.use(bodyParser.json());  // Parsing JSON data
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for the frontend React app

// // Create a connection to the MySQL database
const db = mysql.createConnection({
host: "127.0.0.1", // Database host
user: "root",      // Database username
password: "123456", // Database password
database: "AMPSQL" // Name of the database
});

// Attempt to establish a connection to the MySQL database.
db.connect(function(err) {
    if (err)
        throw err;
    console.log("Connected to MySQL");
});

// // Define a route for the root URL '/'
// This callback function handles GET requests to the root URL.
// 'req' is the request object, containing all the information about the request made to the server.
// 'res' is the response object, used to send back the desired HTTP response to the client.
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");// Send a response in JSON format.
    });


// Login
app.post('/loginAccount', (req, res) => {
    const { username, password } = req.body;
    // The route handles GET requests to the "/search" endpoint.
const sql = `SELECT username, password FROM users WHERE username = ? AND password = ?`; // SQL query to search users by password
// The '?' is a placeholder for a parameter value that will be provided in the execution of this query.
db.query(sql, [username,password], (err, results) => { // Use a parameterized query to prevent SQL injection
    if (err) {
        // If an error occurs during the database query, log the error and return a 500 Internal Server Error response.
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
    if(results.length>0){
        res.json({ success: true, message: 'logged in successfully! welcome to Java_cafe!' });

    }else{
        res.status(401).json({success: false, message:'Whoops! Invalid email or password!' });
    }
    // Return the query results as JSON
    // Sends the results of the query back to the client as JSON.
});
});
//Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});