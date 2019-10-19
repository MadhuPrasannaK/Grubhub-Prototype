import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username
                    }
                }).then(user => {
                    if(user!=null) {
                        console.log('Username already taken');
                        return done(null, false, { message: 'username already taken'});
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            User.create({username, password: hashedPassword}).then(user => {
                                console.log('User created');
                                return done(null, user);
                            });
                        });
                    } 
                });
            } catch (err) {
                done(err);
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try{
                User.findOne({
                    where: {
                        username: username
                    }
                }).then(user => {
                    if(user === null) {
                        return done(null, false, { message: 'bad username'});
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if(response!= true) {
                                console.log('Passwords do not match');
                                return done(null, false, {message: 'Passwords do not match'});
                            }
                            console.log('User found and authenticated');
                            return done(null, user);
                        });
                    }
                });
            } catch(err) {
                done(err);
            }
        }
    )
);

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use(
    'jwt',
    new JWTStrategy(options, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    username: jwt_payload.id
                }
            }).then(user => {
                if(user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch(err) {
            done(err);
        }
    })
)