/*
Refresher for how to setup below:
https://zellwk.com/blog/crud-express-mongodb/
https://www.npmjs.com/package/request
http://goqr.me/api/doc/create-qr-code/
https://github.com/justincastilla/hiding-secrets-in-node
https://cloudinary.com/documentation/node_integration#overview
https://github.com/bryantheastronaut/mernCommentBox
*/

// Modules used
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cloudinary = require('cloudinary');
const path = require('path');

// Required for css styling
app.use(express.static(path.join(__dirname, 'public')));

// Saving login keys/pws to env file for LOCAL USE
// require('dotenv').load();

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

// BodyParser is middleware to parse form data
app.use(bodyParser.urlencoded({extended: true}))

// Function for posting image to CDN or pulling from CDN if existing
app.post('/links', (req, res) => {

  let link_object;

  db.collection('links').find({ userfed_url: `${req.body['userfed_url']}` }).toArray((err, result) => {
    let found = result;

    if (err) console.log('error: ', err);

    if (found.length !== 0 && !err) {
      link_object = found[0];
      console.log("Found it! Returning object.");
      console.log('link object: ', link_object);
      // res.json(link_object);
      if (link_object) {
        res.render('index.ejs', {link: link_object});
      }
      // res.sendFile(__dirname + '/index.html')
    } else {
      console.log("Does not exist in DB. Creating object and saving to DB.");

      let goqr_req = `https://api.qrserver.com/v1/create-qr-code/?data=${req.body['userfed_url']}&size=100x100`;
      cloudinary.v2.uploader.upload(goqr_req, (error, result) => {

        let total_object = req.body;
        total_object['cloudinary_url'] = result.secure_url;

        if (!error) {
          // console.log('MongoDB_Upload:', total_object);

          db.collection('links').save(total_object, (err, result) => {
            if (err) {
              return console.log('MongoDB_Error:', err)
            } else {
              console.log('Saved to MongoDB without error!')

              link_object = result.ops[0];
              console.log('link object returned as json: ', link_object);
              // res.json(link_object);
              if (link_object) {
                res.render('index.ejs', {link: link_object});
              }
              // res.sendFile(__dirname + '/index.html')
            }
          })

        } else {
          console.log('Cloudinary_Error:', error);
        }
      })
    }
  })

  // res.redirect('/') //remove line post testing
})

// Logic to post to EJS view
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  db.collection('links').find().toArray((err, result) => {
    console.log(result[0]);
    if (err) return console.log(err);
    res.render('index.ejs', {link: result[0]})
  });
});

// Required for heroku dynamic port forwarding
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
