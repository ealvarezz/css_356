var express = require('express');
var router = express.Router();




router.get('/hw1.yml', function(req, res, next) {
    var file = 'files/hw1.yml';
    res.download(file); 
});

router.get('/eliza', function(req, res, next) {

// Trying to add the cookie here as well to see if any of the two work
res.cookie('cookieName','edqfdr3f', { domain: '130.245.168.122', path: '/eliza',httpOnly: false, secure: false });
res.render('eliza');
});
// router.get('/eliza', function(req, res, next) {
//   res.render('eliza');
// });




module.exports = router;
