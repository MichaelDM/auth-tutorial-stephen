const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      router = require('./router'),
      cors = require('cors'),
      app = express();
      // nodemon (in package.json) restarts the server everytime it sees changes in directory

//DB setup
mongoose.connect('mongodb://localhost:auth/auth'); //connect to mongodb database

// App Setup
app.use(morgan('combined')); //just a loging framework for http requests
app.use(bodyParser.json({ type: '*/*'})); //parse incoming requests into JSON (transform into JSON)
app.use(cors()); //allowing sites from a different origin (like my front-end) to access all routes of my server
//all the above are middleware. Any incoming request to our server is going to pass into them
router(app);

// Server Setup
const port = process.env.PORT || 3090,
      server = http.createServer(app); //allows to work with http request
server.listen(port, function() {
  console.log('api-server listening on port 3090');
});
