const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);

const config = require('../config.json');
const { hashPassword, comparePassword } = require('../utils/utils');

async function initiateDatabase() {
   const hashedPassword = await hashPassword(config.password);

   database
      .defaults({ users: [{ password: hashedPassword, username: 'ace' }], orders: [] })
      .write();
}

async function checkCredentials(credentials) {
   const user = database.get('users').find({ username: credentials.username }).value();

   if (user) {
      return await comparePassword(credentials.password, user.password);
   } else {
      return false;
   }
}

function getUserByUsername(username) {
   return database.get('users').find({ username: username }).value();
}

function getTicketId(id) {
   return database.get('orders').find({ id: id }).value();
}

function addOrderToUser(id, ticketNumber) {
   database
      .get('orders')
      .push({ eventId: id, ticketNumber: ticketNumber, validated: false })
      .write();
}

function validateTicket(ticketNumber) {
   return database
      .get('orders')
      .find({ ticketNumber: ticketNumber })
      .assign({ validated: true })
      .write();
}

function checkIfVerified(ticketNumber) {
   const { validated } = database.get('orders').find({ ticketNumber: ticketNumber }).value();
   return validated;
}

// function getUserById(id) {
//    return database.get('users').filter({role: role}).value()
// }

exports.addOrderToUser = addOrderToUser;
exports.initiateDatabase = initiateDatabase;
exports.checkCredentials = checkCredentials;
exports.getUserByUsername = getUserByUsername;
exports.getTicketId = getTicketId;
exports.validateTicket = validateTicket;
exports.checkIfVerified = checkIfVerified;
