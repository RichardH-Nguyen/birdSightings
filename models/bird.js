var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var birdSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Bird name is required.'],
        unique: true,
        uniqueCaseInsensitive: true,
    validate: {
        validator: function(n){
            return n.length >=2;
        },
        message: '{VALUE} is not valid, bird name must be at least 2 letters'
    }

    },           // Bird species common name
    description: String,    // Simple description, "large brown owl"
    averageEggs: {type: Number,
        min: [1, 'Should at least be one egg.'],
        max: [50, 'Should not be more than 50 eggs'] },
    endangered: {type: Boolean, default: false},    // Is this bird endangered
    datesSeen: [    // Array of dates it has been seen.
        {
            type: Date,
            required: [true, 'A date is required to add a new sighting'],
            validate:{
                validator: function(date){
                    return date.getTime() <= Date.now();
                },
                message: 'Date must be a valid date, and date must be now or in the past.'
            },
        }
    ],
    nest: {
        location: String,
        materials: String},

    height: {type: Number,
        min: [1, 'Should at least be 1 cm tall'],
        max: [300, 'No more than 300 cm tall']}
});

var Bird = mongoose.model('Bird', birdSchema);
birdSchema.plugin(uniqueValidator);


module.exports = Bird;