const jwt = require('jsonwebtoken');
const {secretKey} = require('config')

module.exports = function (req, res, next) {
    //check only methods: post get delete etc.
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        // const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        const token = req.session.userToken;
        // console.log("[" + token + "]")
        if (!token) {
            // console.log('token ne proshel')
            return res.status(401).json({message: "Пользователь не авторизован"});
        }
        // console.log('after if')
        const decodedData = jwt.verify(token, secretKey);
        console.log(decodedData)
        // req.user = decodedData;
        req.session.user = decodedData;
        next();
    } catch (e) {
        // console.log("v catch")
        res.status(401).json({message: "Пользователь не авторизован"});
    }
};