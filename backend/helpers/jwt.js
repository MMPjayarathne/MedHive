const { expressjwt: expressjwt } = require('express-jwt');



function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/productUploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/public\/categoryImages(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/category(.*)/ , methods: ['GET', 'OPTIONS'] },

            //{url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/user/login`,
            `${api}/user/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt
