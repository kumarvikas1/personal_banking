var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  UserDetails = require('./api/models/User'),
  TransactionDetails = require('./api/models/Transaction'),
  AccountDetails = require('./api/models/Account'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors');


app.use(express.static(__dirname + '/public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/personal_banking'); 

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/TransactionRoutes');
routes(app);
routes1 = require('./api/routes/UserRoutes');
routes1(app);
routes2 = require('./api/routes/AccountRoutes');
routes2(app);
app.listen(port);


console.log('RESTful API server started on: ' + port);