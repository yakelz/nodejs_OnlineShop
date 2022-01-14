const express = require ('express');
const router = express.Router();

const userRouter = require('./userRouter');
const aboutRouter = require('./aboutRouter');
const adminRouter = require('./adminRouter');
const cartRouter = require('./cartRouter');
const catalogRouter = require('./catalogRouter');

router.use ('/about', aboutRouter);
router.use ('/user', userRouter);
router.use ('/admin', adminRouter)
router.use ('/cart', cartRouter)
router.use ('/', catalogRouter);


module.exports = router;