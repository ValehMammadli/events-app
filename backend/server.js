const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const { Webhook } = require('svix'); 
const bodyParser = require('body-parser');
const User = require('./models/UserModel.js');
const router = require('./routes/events.js'); 



  dotenv.config();

  // Connect mongoose to database
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => console.log(err.message));

  const app = express();

  app.use(cors());

  // Real code
  app.post(
    '/api/webhooks',
    bodyParser.raw({ type: 'application/json' }),
    async function (req, res) {
      try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const evt = wh.verify(payloadString, svixHeaders);
        const { id, ...attributes } = evt.data;
        // Handle the webhooks
        const eventType = evt.type;
        if (eventType === 'user.created') {
          console.log(`User ${id} was ${eventType}`);

          const firstName = attributes.first_name;
          const lastName = attributes.last_name;

          const user = new User({
            clerkUserId: id,
            firstName: firstName,
            lastName: lastName,
          });

          await user.save();
          console.log('User saved to database');
        }
        res.status(200).json({
          success: true,
          message: 'Webhook received',
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
  );
  app.use(bodyParser.json());
  app.use('/api/events',router); 

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });