const jwt = require('jsonwebtoken');
require('dotenv').config();
const { secret, API_URL } = process.env;

function authJwt(req, res, next) {
  const unprotectedPaths = [
    { url: /\/public\/productUploads(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/public\/categoryImages(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/api\/v1\/category(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/api\/v1\/user\/login(.*)/, methods: ['POST'] },
    { url: /\/api\/v1\/user\/register(.*)/, methods: ['POST'] },
    { url: /\/api\/v1\/user\/register\/auth(.*)/, methods: ['PUT'] },
    { url: /\/api\/v1\/user\/register\/get(.*)/, methods: ['GET'] },
    { url: /\/api\/v1\/user\/register\/email(.*)/, methods: ['POST'] },
  ];

  // Check if the current path and method match an unprotected path
  const isUnprotected = unprotectedPaths.some(path => {
    if (typeof path === 'string') {
      return req.path === path && req.method === 'GET';
    } else if (path.url instanceof RegExp) {
      return path.url.test(req.path) && path.methods.includes(req.method);
    }
    return false;
  });

  if (isUnprotected) {
    return next();
  }

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
}

module.exports = authJwt;