const express = require('express');
const app = express();
const fs = require('fs');
const { user } = require('./middleware/auth');
const authRouter = require('./routes/auth');

const {
   initiateDatabase,
   addOrderToUser,
   getTicketId,
   validateTicket,
   checkIfVerified,
} = require('./model/operations');
const { nanoid } = require('nanoid');

app.use('/admin', express.static('../frontend/admin'));
app.use(express.static('../frontend'));
app.use(express.json());

app.use('/admin/api/auth', authRouter);

app.get('/api/event/ticket', (req, res) => {
   const event = fs.createReadStream('data/menu.json');
   event.pipe(res);
});

app.get('/api/ticket', (req, res) => {
   const event = fs.createReadStream('model/database.json');
   event.pipe(res);
   getTicketId(event);
});

app.post('/api/ticket/order', (req, res) => {
   const orderId = req.body.id;
   ticketNumber = nanoid();

   addOrderToUser(orderId, ticketNumber);

   let result = {
      success: true,
      ticketNumber: ticketNumber,
      eventId: orderId,
   };

   res.json(result);
});

app.post('/api/validate', user, (req, res) => {
   const { ticketNumber } = req.body;
   let result = { success: false };

   if (checkIfVerified(ticketNumber)) {
      return res.json({ success: false, message: 'Ticket already verified' });
   }

   if (validateTicket(ticketNumber)) {
      result.success = true;
      result.message = 'Ticket is validated';
   }

   res.json(result);
});

app.listen(8000, () => {
   console.log('Server started');
   initiateDatabase();
});
