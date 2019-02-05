
var express = require('express');
var bodyParser = require('body-parser');
var app  = express();
var fs = require('fs');

  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/myaction', function(req, res) {
  var api_key = API_KEY;
  var domain = DOMAIN NAME;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  //Printing variables for debugging
  console.log(req.body.from);
  console.log(req.body.to);
  console.log(req.body.subject);

  var data = {
    from:req.body.from,
    to: req.body.to,
    text: req.body.subject
  };
  mailgun.messages().send(data, function (error, body) {
   if(error) {
      console.log(error);
    }
    console.log(body);
    res.write("Email sent succesfully")
  });

});

app.get('/', function(req, res) {
  fs.readFile('html/projectmail.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(err != null)
          console.log(err);
        else
          res.write(data);
        res.end();
      });
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
