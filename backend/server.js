import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import cors from 'cors';
  import { Webhook } from 'svix';
  import bodyParser from 'body-parser';
  import User from './models/UserModel.js';

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

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });