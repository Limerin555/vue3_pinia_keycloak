const express = require('express');
const router = express.Router();

// Validate Keycloak token
router.route('/keycloak/validate-token').post(async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const splitBearer = bearerToken.split(" ");
    const accessToken = splitBearer[1]; 
    console.log(accessToken);

    // Write code to validate token here

    res.json({
      message: "Write your own backend code to validate the access token."
    }).status(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;