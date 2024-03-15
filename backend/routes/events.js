// api/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/EventModel.js');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ... other routes ...

// Create new event
router.post('/', async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an event
router.put('/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an event
router.delete('/:eventId', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.eventId);
        res.status(204).json(); // 204 No content
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;
