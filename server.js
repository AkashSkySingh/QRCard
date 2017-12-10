/*
Refresher for how to setup below:
https://zellwk.com/blog/crud-express-mongodb/
https://www.npmjs.com/package/request
http://goqr.me/api/doc/create-qr-code/
https://github.com/justincastilla/hiding-secrets-in-node
https://cloudinary.com/documentation/node_integration#overview
*/

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const cloudinary = require('cloudinary');

// Saving login keys/pws to env file for use
require('dotenv').load();

const dbuser = process.env.dbuser;
const dbpassword = process.env.dbpassword;
const cnname=process.env.cnname;
const cnuser = process.env.cnuser;
const cnpassword = process.env.cnpassword;

console.log('Cloud_Name:', cnname);
console.log('Cloud_Key:', cnuser);
console.log('Cloud_Secret:', cnpassword);
console.log('MongoDB_User:', dbuser);
console.log('MongoDB_Password:', dbpassword);

// Establishing connection with MongoDB connection
MongoClient.connect(`mongodb://${dbuser}:${dbpassword}@ds129776.mlab.com:29776/qrlinks`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('Logged in to MongoDB!');
  });
})

// Configure cloudinary api
cloudinary.config({
  cloud_name: cnname,
  api_key: cnuser,
  api_secret: cnpassword
})

// Request serving index.html file to frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// BodyParser is middleware to parse form data
app.use(bodyParser.urlencoded({extended: true}))

/*
Request which does the following, in order:
- Retrieves user provided link (userfed_url) on index page
- Passes userfed_url into GoQR API link for QR generation link (goqr_req)
- Passes goqr_req to Cloudinary Upload NPM package and pass back an object with image information on QR Code image (cloud_result)
- Combines cloud_result with index form body to upload to MongoDB (total_object)
*/
app.post('/links', (req, res) => {
  console.log('Posting link!');
  console.log('User_Link:', req.body['userfed_url']);

  let goqr_req = `https://api.qrserver.com/v1/create-qr-code/?data=${req.body['userfed_url']}&size=100x100`;

  console.log('GoQR_API_Link:', goqr_req);

  cloudinary.uploader.upload(goqr_req, (cloud_result) => {
    console.log('cloudinary_result:', cloud_result);

    let total_object = req.body;
    total_object['cloudinary_data'] = cloud_result;

    console.log('MongoDB_Upload:', total_object);

    db.collection('links').save(total_object, (err, result) => {
      if (err) {
        return console.log(err)
      } else {
        console.log('Saved to MongoDB without error!')
      }
    })

  })

  res.redirect('/') //remove line post testing
})
