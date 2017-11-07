var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Country = require('./destination');
var Place = require('./places');
var Continent = require('./continents');



var packageSchema = new Schema({
    continentId: {
        type: ObjectId,
        ref: 'Continent'
    },
    countryId: [{ type: ObjectId, ref: 'Country' }],
    packagename: {
        type: String,
        require: true,
        trim: true
    },
    categories: {
        type: Array,
        "default": []
    },
    packagetype: {
        type: String,
        require: true,
    },
    packagedescription: {
        type: String,
        require: true,
    },
    itinerary: { type: Array, "default": [] },
    images: {
        type: Array,
        "default": []
    },
    packageinclude: {
        type: String,
        trim: true
    },
    packageexclude: {
        type: String,
        trim: true
    },
    childrenpolicy: {
        type: String,
        trim: true
    },
    cancelpolicy: {
        type: String,
        trim: true
    },
    terms: {
        type: String,
        trim: true
    },
    published: { type: Boolean, default: false },
    promote: { type: Boolean, default: false },
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


module.exports = mongoose.model('Package', packageSchema);