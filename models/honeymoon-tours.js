var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var honeymoonSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: {
            unique: true,
            sparse: true
        },
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

module.exports = mongoose.model('Honeymoontours', honeymoonSchema);