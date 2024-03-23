// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
      type: String, 
      required: true, 
     // Derived from Zod
  },
  description: { 
      type: String,  
      required: true, // Match front-end validation
    
  },
  location: { 
      type: String, 
      required: true, // Match front-end validation
     
  },
  imageUrl: { 
      type: String, 
  }, 
  startDateTime: { 
      type: Date, 
      required: true,  
  },
  endDateTime: { 
      type: Date, 
      required: true, 
  },
  categoryId: { 
      type: String,
  },
   // ... (organizer field when ready)
});

module.exports = mongoose.model('Event', eventSchema);
