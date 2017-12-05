const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Working Server!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/links', (req, res) => {
  console.log('Posting link!');
})
