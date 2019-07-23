const express = require('express');
const router = express.Router();

//Home -> redirects to /books
router.get('/', function(req, res, next) {
res.redirect("/books")
});

module.exports = router;
