// controllers/eventController.js
const Event = require('../models/EventModel.js');

async function createEvent(req, res) {
    try {
        // Validate the request body (Zod validation can be reused)
        const validatedData = req.body;

        // Prepare your Event data (consider security and additional fields)
        const eventData = {
            ...validatedData,
           // Assuming you have authentication and userId
        };

        // Create a new Event object
        const newEvent = new Event(eventData);

        // Save to the database
        const savedEvent = await newEvent.save();

        res.status(201).json({ message: 'Event created', event: savedEvent });
    } catch (error) {
        // Consider more specific error handling based on error types
        res.status(500).json({ message: 'Error creating event', error }); 
    }
}

module.exports = { createEvent }; 
