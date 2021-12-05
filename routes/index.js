const express = require ('express');
const router = express.Router(); 
const userRouter = require('./userRouter');
const aboutRouter = require('./aboutRouter');
const catalogRouter = require('./catalogRouter');

router.use ('/about', aboutRouter);
router.use ('/user', userRouter);
router.use ('/', catalogRouter);


module.exports = router;