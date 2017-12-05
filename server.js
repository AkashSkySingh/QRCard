const express = require('express');
const app = express();

app.listen(3000, function() {
  console.log('Working Server!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
