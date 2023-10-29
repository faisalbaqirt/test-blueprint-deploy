// jwt
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db/db')
const auth = require('../config/auth')

const option = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: auth.jwt.secretKey
}

const verify = (payload, done) => {
    db('users').where({
        id: payload.id
    }).first().then((user)=>{
        if(!user){
            return done(null, false, {
                message: 'User Not Found'
            })
        }

        return done(null, user)
    }).catch((err)=> {
        return done(err, null)
    })
}

passport.use(new JwtStrategy(option, verify))

module.exports =  passport