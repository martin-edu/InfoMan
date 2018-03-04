var express = require('express');
var cors = require('cors');
var app = express();
//require ('./src/config/express')(app);
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

var conversation = require('./API/src/routes/conversation_api');
app.use('/conversation',conversation);

app.listen(port, function(err){
  console.log('running on server on port:'+ port);
});
