const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

const auth = (redirectUnauthenticated = true) => {
    return async function (req, res, next) {
        try {
            const token = req.cookies[config.development.cookie] || '';
            const data = await jwt.verifyToken(token)
            const user = await models.user.findById(data.id)
            req.user = user
            next();
        } catch (err) {
            if (!redirectUnauthenticated) {
                next();
                return;
            }

            next(err);
        }
    };
}

module.exports = auth;