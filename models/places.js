var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Destination = require('./destination');
var Continent = require('./continents');


var placesSchema = new Schema({
    placename: {
        type: String,
        require: true,
        trim: true
    },
    continentId: { type: ObjectId, ref: 'Continent' },
    countryId: { type: ObjectId, ref: 'Destination' },
    description: {
        type: String,
        require: true,
    },
    map: {
        type: Array,
        "default": []
    },
    images: {
        type: Array,
        "default": []
    },
    user_id: { type: ObjectId, ref: 'User' },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Places', placesSchema);