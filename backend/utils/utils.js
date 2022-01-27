const bcrypt = require('bcrypt');

async function hashPassword(password) {
   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
}

async function comparePassword(password, hash) {
   const isMatch = await bcrypt.compare(password, hash);
   return isMatch;
}

function validateBody(body) {
   if (body.hasOwnProperty('username') && body.hasOwnProperty('password')) {
      return true;
   } else {
      return false;
   }
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.validateBody = validateBody;
