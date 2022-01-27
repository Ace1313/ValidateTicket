const jwt = require('jsonwebtoken');

const { checkCredentials, getUserByUsername } = require('../model/operations');

async function login(req, res) {
   let result = { success: false };

   const credentials = req.body;

   const isAMatch = await checkCredentials(credentials);

   if (isAMatch) {
      const user = getUserByUsername(credentials.username);
      console.log(user);
      const token = jwt.sign({ id: user.id, role: user.role }, 'a1b1c1', {
         expiresIn: 600,
      });

      result.success = true;
      result.token = token;
   }
   res.json(result);
}

function getLoginStatus(req, res) {
   const token = req.headers.authorization.replace('Bearer ', '');
   const details = req.userDetails;
   res.status(200).json({
      success: true,
      message: 'Permission granted :)',
      role: details.role,
   });
}

exports.login = login;
exports.getLoginStatus = getLoginStatus;
