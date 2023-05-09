const express = require('express');
const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
  res.json({
        message: "API connection established.",
        status: "success"
      })
      .status(200);

});

module.exports = router;