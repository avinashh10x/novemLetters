const mongoose = require('mongoose');

const certificateCounterSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Counter', certificateCounterSchema);