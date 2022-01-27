const jwt = require('jsonwebtoken');
const conf = require('../config.json');

// async function setToken(data) {
//    const token = await jwt.sign(data, conf.username, { expiresIn: 600 });
//    return token;
// }

function user(req, res, next) {
   try {
      const token = req.headers.authorization.replace('Bearer ', '');
      console.log(token);
      const tokenVerified = jwt.verify(token, 'a1b1c1');
      req.userDetails = { role: tokenVerified.role };
      next();
   } catch (error) {
      res.status(401).json({ success: false, message: 'Permission denied❌' });
   }
}

exports.user = user;
// exports.setToken = setToken;
