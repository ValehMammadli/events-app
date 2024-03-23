const Event = require('../models/EventModel.js');

async function createEvent(req, res) {
    try {
        console.log(req.body);
      // 1. Destructure and Perform Basic Validation
      const { events: { title, description, location, imageUrl, startDateTime, endDateTime, categoryId } } = req.body;
  
      if (!title || !imageUrl || !startDateTime || !endDateTime) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // 2. Prepare Event Data (Assuming authentication)
      const eventData = {
        title,
        description,
        location,
        imageUrl,
        startDateTime,
        endDateTime,
        categoryId,
        // Assuming you have authentication in place
      };
  
      // 3. Create and Save
      const newEvent = await Event.create(eventData);
  
      // 4. Success Response
      res.status(201).json({ message: 'Event created', event: newEvent }); 
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  module.exports = { createEvent }; 
