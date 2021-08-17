require('module-alias/register')

const H = require('@general-helper')
const APP = require('express')()
const INSTAGRAM = require('node-instagram')

const instagram = new INSTAGRAM.default({
  clientId: '502916150800104',
  clientSecret: 'f60e7ba092107e2672b90a4909d0fd21',
  // accessToken: 'EAALZAfzU6QfYBANfEvposnFre4ZAe4cQJN0TVLKHSZAqZCqY8rnCLZASCcIkREIvZCZAbgBEZCn4uSru6KJlvFyQtCMPhSx29flzzXldwjjUfuVfvMUMnZBxt4tFBtZCv93DVXi6cu4pxNURKXgigwpFZBg43k6R8jr6ZChNWLipStviuZBZCs2dWWP59iamnco4TMDDiSiZAlphgYHX5QnYrPvR09IUPzaFAORj2ZBHSEbGsZBieMtUCfJPVQwcZCjYCledMlBgcZD'
})

const redirectUri = 'http://localhost:3000/auth/instagram/callback';

// First redirect user to instagram oauth
APP.get('/auth/instagram', (req, res) =>
  res.redirect(
    instagram.getAuthorizationUrl(
      H.trace(redirectUri),
      {
        scope: ['basic', 'likes'],
      }
    )
  )
)

// Handle auth code and get access_token for user
APP.get('/auth/instagram/callback', async (req, res) => {
  try {
    // The code from the request, here req.query.code for express
    const code = H.trace(req.query.code)
    const data = await instagram.authorizeUser(code, redirectUri);
    // data.access_token contain the user access_token
    res.json(H.trace(data));
  } catch (err) {
    res.json(err);
  }
})

APP.get('auth/instagram/deauth')

APP.get('auth/instagram/remove')

APP.listen(3000, () => H.trace('APP is listening on PORT:', 3000))

// Get information about the owner of the access_token.
// const data = await instagram.get('users/self');
// console.log(data);