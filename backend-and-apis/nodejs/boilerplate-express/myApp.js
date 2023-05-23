let bodyParser = require('body-parser');
let express = require('express');
let app = express();
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app
  .route('/name')
  .get((req, res) => {
    let { first, last } = req.query;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    let { first, last } = req.body;
    res.json({ name: `${first} ${last}` });
  });

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get('/json', (req, res) => {
  let response;
  if (process.env.MESSAGE_STYLE === 'uppercase')
    response = { message: 'HELLO JSON' };
  else {
    response = { message: 'Hello json' };
  }
  res.json(response);
});

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.get('/', (req, res) => {
  let indexPath = __dirname + '/views/index.html';
  res.sendFile(indexPath);
});

module.exports = app;
