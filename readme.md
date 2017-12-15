# QRCard: Production_README

[QRCard live][heroku]

[Heroku]: https://qrcard.com
[Github]: https://github.com/AkashSkySingh/QRCard
[QR API]: http://goqr.me/api/
[Cloudinary]: https://cloudinary.com/documentation/solution_overview

QRCard was a test application to design and implement core features for a production scale application. The premise of QRCard is provide a user a method to generate a QR Code in a simple web application. The application's intended use is for networking, allowing individuals to share a personal social media pages on the fly without having to deal with the hassle of swapping contact information (i.e. LinkedIn, Twitter, or more).

![image of Root page](/docs/images/root.png)

The page is simple in its structure. Overall, the user provides a link into  the form input and submits said link. The page refreshes to showcase the provided link in a QR Code, allowing the user to share that code with others. Items like a link corresponding to the QR code and general tips are provided.

## Features & Implementation

### Integrated Backend
The backend is foundation for QRCard. A MongoDB database is provided urls through a form on the frontend, which is passed to the [GoQR API][QR API] that provides an image saved on the [Cloudinary CDN][Cloudinary]. From this point forward, the link is saved with secure URL of the saved QR Code on Cloudinary. This object is then passed to the frontend for population. Alternatively, to save on CDN and database space, any link is validated against the database to first see if the link has been generated in the past. If the link has been used, the corresponding JSON object is passed to the frontend, otherwise a new one is generated.

#### Sample MongoDB Object
```js
{
  _id: 5a337aa23018e137205f001f,
  userfed_url: 'http://www.akashpreetsingh.com',
  cloudinary_url: 'https://res.cloudinary.com/qrcard/image/upload/v1513323164/tfglnd3vibylfyfs1wr1.png'
}
```

### Simple Frontend
Using ELS, the JSON MongoDB object is parsed to the frontend. A QR image is provided from Cloudinary for the user. Currently, the last link generated on QRCard is shown upon reaching the index page. The frontend is made with HTML5 and CSS, using media tags to differentiate between various technological hardwares for better user experience. Other general items, such as fonts, are provided by Google Fonts.  All related stylesheets, and future public assets, are saved under the public folder using PATH module.

#### Sample Use of Path for Public assets
```js
app.use(express.static(path.join(__dirname, 'public')));
```

#### Sample Media CSS
``` css
@media all {
  html, body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: 320px;
    background-color: #f6f6e8;
    color: #404040;
  }

  h1, h3, h4 {
    font-family: 'Raleway', sans-serif;
  }
```

#### Sample QR Code
![image of Generated QR Code](/docs/images/sampleqr.png)



## Future Directions for the Project
Overall, QRCard was a test project for understanding various components and pieces of the different technologies used in the application in conjunction with each other. As such, the project will be revamped for additional features and scopes of various other integral parts as described below to provide a greater service to users on a production scale.

### Users & Profiles
Because of the core premise to allow users a simple format to network and share links, the application will have a user compotent allowing visitors to save links and social media profiles to their page, effectively owning said links for personal use and sharing.

### QR Scanner
To provide users a one-stop application front, QRCard will be integrated with a QR Scanner API allowing users to use the same application to view QR Codes as well as generate them. This will simplify the ordeal between iOS and Android users and any hardware issues.

### React (Responsive Web Application & React Native Mobile Application)
Overall, the combination of an integrated backend with various APIs will join together with React applications (i.e. web and mobile) to better provide a service to users. These applications will be the frontend for sharing QR codes and a front for user interaction.
