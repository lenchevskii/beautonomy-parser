require('module-alias/register')

const H = require('@general-helper')
const APP = require('express')()
const INSTAGRAM = require('passport-instagram')
const PASSPORT = require('passport')

APP.use(PASSPORT.initialize())
APP.use(PASSPORT.session())

PASSPORT.serializeUser((user, done) => done(null, user))
PASSPORT.deserializeUser((user, done) => done(null, user))

PASSPORT.use(
  new INSTAGRAM.Strategy({
    clientID: '802090330505718',
    clientSecret: '28ede611495e46acaa4b6b9e151d577c',
    callbackURL: 'http://localhost:3000/auth/instagram/client'
  },
    (accessToken, refreshToken, profile, done) =>
      H.trace({
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile._json
      })
  )
)

APP.get(
  '/auth/instagram',
  PASSPORT.authenticate('instagram')
)

APP.get(
  '/auth/instagram/callback',
  PASSPORT.authenticate('instagram', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
)

APP.get(
  '/auth/instagram/profile',
  (request, response, next) => request.isAuthenticated() ? next() : response.redirect('/'),
  (request, response) => response.render('profile', { user: request.user })
)

APP.get(
  '/auth/instagram/login',
  (request, response) => response.status(404).send('Something went wrong.')
)

APP.listen(3000, () => H.trace('AUTH is listening on PORT:', 3000))
