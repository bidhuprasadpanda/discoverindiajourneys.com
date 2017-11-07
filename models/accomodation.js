var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Destination = require('./destination');
var Place = require('./places');


var accomodationSchema = new Schema({

    countryId: {
        type: ObjectId,
        ref: 'Destination',
        require: true
    },
    stateId: {
        type: ObjectId,
        ref: 'Place',
        require: true
    },
    hotelname: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String
    },
    roomtypes: {
        type: Array,
        trim: true
    },
    images: {
        type: Array
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


module.exports = mongoose.model('Accomodation', accomodationSchema);