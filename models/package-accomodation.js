var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Package = require('./package');

var packageaccomodationSchema = new Schema({

    accomodation: [{
        options: [{
            hotelid: { type: ObjectId },
            day: { type: String },
            option: { type: String },
            comments: { type: String },
            roomtype: { type: String }
        }],
        optionName: { type: String }
    }],
    packageid: {
        type: ObjectId,
        ref: 'Package'
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


module.exports = mongoose.model('packageAccomodation', packageaccomodationSchema);