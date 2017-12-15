/*
Refresher for how to setup below:
https://zellwk.com/blog/crud-express-mongodb/
https://www.npmjs.com/package/request
http://goqr.me/api/doc/create-qr-code/
https://github.com/justincastilla/hiding-secrets-in-node
https://cloudinary.com/documentation/node_integration#overview
https://github.com/bryantheastronaut/mernCommentBox
*/

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cloudinary = require('cloudinary');

// Saving login keys/pws to env file for use
require('dotenv').load();

const dbuser = process.env.dbuser;
const dbpassword = process.env.dbpassword;
const cnname=process.env.cnname;
const cnkey = process.env.cnkey;
const cnsecret = process.env.cnsecret;

// Establishing connection with MongoDB connection
MongoClient.connect(`mongodb://${dbuser}:${dbpassword}@ds139446.mlab.com:39446/qrcard-dev`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('Logged in to MongoDB!');
  });
})

// Configure cloudinary api
cloudinary.config({
  cloud_name: cnname,
  api_key: cnkey,
  api_secret: cnsecret
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
  // console.log('User_Link:', req.body['userfed_url']); //User provided link

  // if link aleady exists in db; find from db and return
  // else if it does not exist, create api call for qr code and save to db
  // parse cloudinary data;


  // console.log('GoQR_API_Link:', goqr_req); //GoQR Request
  // let found = [];

  let link_object;

  db.collection('links').find({ userfed_url: `${req.body['userfed_url']}` }).toArray((err, result) => {
    let found = result;

    if (err) console.log('error: ', err);

    if (found.length !== 0 && !err) {
      link_object = found;
      console.log("Found it! Returning object.");
      console.log('link object: ', link_object);
      res.json(link_object);
      // console.log(req.body["userfed_url"]);
      // console.log(result[0].userfed_url);
    } else {
      console.log("Does not exist in DB. Creating object and saving to DB.");

      let goqr_req = `https://api.qrserver.com/v1/create-qr-code/?data=${req.body['userfed_url']}&size=100x100`;
      cloudinary.v2.uploader.upload(goqr_req, (error, result) => {
        // console.log('Cloudinary_Result:', result); //Cloudinary
        // console.log('Cloudinary Secure Url:', result.secure_url); //Cloudinary
        // console.log('Body: ', req.body)

        let total_object = req.body;
        total_object['cloudinary_url'] = result.secure_url;

        if (!error) {
          // console.log('MongoDB_Upload:', total_object);

          db.collection('links').save(total_object, (err, result) => {
            if (err) {
              return console.log('MongoDB_Error:', err)
            } else {
              console.log('Saved to MongoDB without error!')
              // console.log(res.ops);   // db object to return
              link_object = result.ops;
              console.log('link object returned as json: ', link_object);
              res.json(link_object);
            }
          })

        } else {
          console.log('Cloudinary_Error:', error);
        }
      })
    }
  })

  // res.json(link_object); // move up
  // res.redirect('/') //remove line post testing
})

/*
Request to get all database elements and in qr code image duplicate prevention

Requires view template for frontend (rather than ejs integration, just build via react.js)
*/
app.get('/links', (req, res) => {
  db.collection('links').find().toArray((err, results) => {
    console.log(results);
  });

  res.redirect('/')
});
