const express = require('express');
const router = express.Router();

// Validate Keycloak token
router.route('/keycloak/validate-token').post(async (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token']; 
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