var mongoose = require('mongoose');

var birdSchema = new mongoose.Schema({
    name: String,           // Bird species common name
    description: String,    // Simple description, "large brown owl"
    averageEggs: Number,
    endangered: Boolean,    // Is this bird endangered
    datesSeen: [Date]       // Array of dates it has been seen.
});

var Bird = mongoose.model('Bird', birdSchema);


module.exports = Bird;