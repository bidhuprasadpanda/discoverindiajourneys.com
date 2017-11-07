var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var subscriberSchema = new Schema({

    email: {
        type: String,
        require: true,
        index: {
            unique: true,
            sparse: true
        },
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Subscriber', subscriberSchema);