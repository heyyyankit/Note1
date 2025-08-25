const {validateToken} = require('../services/authentication');
function checkForAuthenticationCookie(cookieName) {
    return function(req, res, next) {
        const token = req.cookies[cookieName];
        if (!token) {
            return next();
        }
        try {
            const user = validateToken(token);
            req.user = user;
            next();
        } catch (err) {
            next();
        }
}}
module.exports = { checkForAuthenticationCookie };