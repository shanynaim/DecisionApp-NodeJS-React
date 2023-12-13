const { auth } = require("express-openid-connect");
require("dotenv").config();

const authConfig = {
  authRequired: true,
  auth0Logout: true, // Auth0 will handle the logout, including clearing the session and performing any necessary cleanup.
  secret: process.env.AUTH0_CLIENT_SECRET, //from auth0
  baseURL: "http://localhost:4050/",
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: "https://dev-lyojpo6vu545blai.us.auth0.com", //the base URL of the identity provider (Auth0 in this case). It specifies the issuer of the tokens and is used to validate the tokens during authentication.
};

const authenticationMiddleware = auth(authConfig);
module.exports = { authenticationMiddleware };
