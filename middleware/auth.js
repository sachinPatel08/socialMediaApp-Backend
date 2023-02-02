var {session} = require('../models');
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.headers.token) {
        jwt.verify(req.headers.token, process.env.Token_Secret, async (error, userData) => {
            if(error) {
                if(error.expiredAt) {
                    session.destroy({where: {token: req.headers.token}})
                    return next(
                        res.status(403).json({
                            "message":"session expired1."
                        })
                    )
                }
                return next(
                    res.status(403).json({
                        "message":"auth faild."
                    })
                )
            }
            let tokenData = await session.findOne({
                attributes: ['token'],
                where: {
                    token: req.headers.token
                }
            })
            if(tokenData) {
                req.headers.userId = userData.userId;
                next();
            } else {
                res.status(403).json({
                    "message":"session expired2."
                })
            }
        })
    } else {
        res.status(403).json({
            "message":"session expired3."
        })
    }
}