const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').load();

const dbuser = process.env.dbuser;
const dbpassword = process.env.dbpassword;


console.log(dbuser);
console.log(dbpassword);

MongoClient.connect(`mongodb://${dbuser}:${dbpassword}@ds129776.mlab.com:29776/qrlinks`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('Working Server!');
  });
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/links', (req, res) => {
  console.log('Posting link!');
  console.log(req.body);
  db.collection('links').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

// Building out API integration with GoQR.me & Cloudinary CDN hosting
const router = express.Router();

const cnuser = process.env.cnuser;
const cnpassword = process.env.cnpassword;

console.log(cnuser);
console.log(cnpassword);

// Use documentation to review possible object attributes and request setup:
// http://goqr.me/api/doc/create-qr-code/
// Must define and pass forward url from users to router get request.
// Verify how to provide link from inital get request to GoQR api then to DB for testing

router.get('/', (req, res, next) => {
  request({
    uri: 'http(s)://api.qrserver.com/v1/create-qr-code/?data=[URL-encoded-text]&size=[pixels]x[pixels]',
    data: urlencoded(url)
  });
});

module.exports = router;
