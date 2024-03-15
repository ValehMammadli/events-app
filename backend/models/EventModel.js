// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    details: { type: String },
    hostedBy: { type: String }, 
    image: { type: String },
    date: { type: Date, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // We'll add the User model later
});

module.exports = mongoose.model('Event', eventSchema);
