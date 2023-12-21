# Auth Demo App - Frontend
All-inclusive feature reach Authentication service. Frontend part is based on Next.js and Redux

## Motivation
When considering complex authentication scenarios, one might initially think of using solutions like Keycloak or cloud-based services such as Auth0. However, this app demonstrates that this might not be necessary. It offers a comprehensive authentication solution based on Node.js and Express.js, without relying on additional modules like Passport.js or Object-Relational Mapping (ORM) tools.

## Blog 
The article with [explanation of the advanced features ](https://medium.com/@vialus/all-inclusive-and-bulletproof-authentication-with-node-js-and-express-js-a-hardcore-style-243f65f16542)

## Demo
You can see this app in action at [www.authdemoapp.com](https://www.authdemoapp.com/)

## Backend code
Backend part of the app can be found [here](https://github.com/slava-lu/auth-app-backend)

## Basic Features
1. Create a new user
2. Login with email and password
3. 'Remember me' feature to stay logged in
4. Logout from the current session
5. Delete your own account
6. OAuth via Facebook or Google
7. Email verification
8. Access based on the email verification status
9. Change the current password
10. Reset the forgotten password
11. As admin request a user to change the password
12. As admin block a user
13. As admin request a user to re-login


## Advanced Features
1. Send the link to restore the deleted account
2. Link local account with OAuth accounts
3. Prevent some user roles to use OAuth
4. Logout from OAuth providers
5. 2FA including 2FA with OAuth
6. Extending JWT for active users
7. Auto logout with timeout counter
8. Advanced role based access control
9. One login only
10. Logout from all devices
11. Login as another user
12. Require password check for the critical actions
13. Sync auth status across browser tab

## Getting started

### OAuth setup
* Each OAuth provider has its own way to obtain the `client id` and the `client secret`. But usually the process is straightforward.
Please refer to the documentation of respective provider. After obtaining the`client id` put it in `src/config/consts.js`
in respective constants (`FACEBOOK_CLIENT_ID`, `GOOGLE_CLIENT_ID`, `LINKEDIN_CLIENT_ID`)

### Starting the app

* Install dependencies with `npm i`
* run `npm run dev` to start the app.

## Issue Reporting
If you have found a bug, please report it in this repository's [issues](https://github.com/slava-lu/auth-app-frontend/issues) section.

## License
This project is licensed under the GPL license. See the [LICENSE file](./LICENSE.txt) for more info.