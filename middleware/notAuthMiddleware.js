module.exports = function (req,res,next) {
    if (!req.session.isLogin) {
        return next();
    }
    res.redirect('/');
}