const jwt = require("jsonwebtoken");
const config = require("../config/config");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
    }
    try {
        const payload = jwt.verify(token, config.secretKey);
        req.userId = payload.id;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
}

module.exports = auth;
