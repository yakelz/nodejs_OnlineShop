const jwt = require('jsonwebtoken');
const {secretKey} = require('config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Пользователь не авторизован"});
        }
        const decodedData = jwt.verify(token, secretKey);
        req.user = decodedData;
        next();
    } catch (e) {
        res.status(401).json({message: "Пользователь не авторизован"});
    }
};