var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Continent = require('./continents');

var destinationSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: {
            unique: true,
            sparse: true
        },
        trim: true
    },
    quote: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    images: {
        type: Array,
        "default": []
    },
    map: {
        type: Array,
        "default": []
    },
    continentId: { type: ObjectId, ref: 'Continent' },
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


module.exports = mongoose.model('Destination', destinationSchema);