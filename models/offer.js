var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var offerSchema = new Schema({
    offerName: {
        type: String,
        require: true,
        trim: true
    },
    offerType: {
        type: String,
        require: true,
        trim: true
    },
    offerDescription: {
        type: String,
        trim: true
    },
    code: {
        type: String,
        require: true,
        trim: true
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

module.exports = mongoose.model('Offers', offerSchema);