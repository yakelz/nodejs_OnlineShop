exports.register_get = function(req,res) {
    // res.send ('register page' + '<br>' +
    // 'method:' + req.method)
    res.render ('../views/user/register')
};
exports.register_post = function(req,res) {
    res.send ('register page' + '<br>' +
    'method:' + req.method)
};

exports.login_get = function(req,res) {
    // res.send ('login page' + '<br>' +
    // 'method:' + req.method)
    res.render ('../views/user/auth')
};
exports.login_post = function(req,res) {
    res.send ('login page' + '<br>' +
    'method:' + req.method)
};

exports.logout_get = function(req,res) {
    res.send ('logout page' + '<br>' +
    'method:' + req.method)
};

exports.logout_post = function(req,res) {
    res.send ('logout page' + '<br>' +
    'method:' + req.method)
};
