const express = require('express');
const router = express.Router();

// POST signin
router.post('/signin', function(req, res, next) {
  const username = req.body['username'];
  const password = req.body['password'];
  if ( username !== 'typo' || password !== 'something'){
    next(createError(401));
  }else{
    res.json({
      user: username,
      timestamp: Date.now()
    })
  }
});

module.exports = router;
