const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log('Working Server!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/links', (req, res) => {
  console.log('Posting link!');
  console.log(req.body);
})
