# QRCard: Development_README

- [QRCard: Live][Heroku]
- [QRCard: Github][Github]

[Heroku]: https://qrcard.com
[Github]: https://github.com/AkashSkySingh/QRCard
[QR API]: http://goqr.me/api/
[Cloudinary]: https://cloudinary.com/documentation/solution_overview

## Minimum Viable Product
QRCard is a virtual business card intended for social media profile sharing. Initial development will focus on the integration of a user's LinkedIn profile. The general idea is to provide user's a simple process of sharing social media sites on the fly during events and other functions. Initial testing of the QR code will be done on iOS and the application will only be available on the web.

- [ ] [Production README](../README.md)
- [ ] [Hosting on Heroku][heroku]
 - [ ] Domain Acquisition
 - [ ] Rerouting to DNS
- [X] Node.js & Express.js
  - [X] [QR Code API Integration][QR API]
  - [X] [Cloudinary API Integration][Cloudinary]
  - [X] Verification of CDN usage
  - [ ] Link duplication prevention
- [ ] Making a React.js frontend
  - [ ] Create routes
  - [ ] Create views
  - [ ] Style
- [ ] Testing verified
- [ ] Documentation


## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: wireframes
[components]: component-hierarchy.md
[sample-state]: sample-state.md
[api-endpoints]: api-endpoints.md
[schema]: schema.md

## Implementation Timeline

### Phase 1: Backend setup (1 Day, W1 M)

**Objective:** Functioning Express.js backend server and integrating MongoDB.

### Phase 2: Integrate APIs (2 Days, W1 W)

**Objective:** Integrate Cloudinary and GoQR API to backend server and verify URL checks.

### Phase 3: Frontend integration (1 Day, W1 Th)

**Objective:** Integrate React.js frontend to backend server and build components.

### Phase 4: Web Application Styling (1 Day, W1 F)

**Objective:** Style web application page and frontend.

### Phase 5: Testing (2 Day, W2 T)

**Objective:** Functional testing with mobile interfaces and begin expanding to other services. Create test cases for test environment.

### Phase 6: Clean-Up (1 Day, W2 W)

**Objective:** Clean-up repository and continue building bonus features.

## APIs
- [Cloudinary][Cloudinary]
- [QR Code][QR API]

### Bonus Objectives (TBD)
- [ ] Integrate LinkedIn profile search API
- [ ] React.Native mobile application
  - [ ] Create QR Code Scanner & Reader for iOS Platform
  - [ ] Create QR Code Scanner & Reader for Android Platform
- [ ] User personal page and profile sharing
  - [ ] Backend database model/class for Users
  - [ ] User Web Profile page for sharing saved QR Codes
  - [ ] Mobile Application User view for sharing saved QR Codes
