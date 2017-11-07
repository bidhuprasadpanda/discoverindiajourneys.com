var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');

var inquirySchema = new Schema({

    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    emailID: {
        type: String,
        require: true,
        trim: true
    },
    packageCreatorID: {
        type: ObjectId
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    countryName: {
        type: String,
        trim: true
    },
    inquiryRemark: {
        type: String,
        trim: true
    },
    inquiryType: {
        type: String,
        trim: true
    },
    fromPage: {
        type: String
    },
    promoCode: {
        type: String,
        trim: true
    },
    fromDate: {
        type: String,
        trim: true
    },
    toDate: {
        type: String,
        trim: true
    },
    packageName: {
        type: String,
        trim: true
    },
    inquiryDate: {
        type: String,
        trim: true
    },
    totalRooms: {
        type: String,
        trim: true
    },
    accomodationDetails: {
        type: Array,
        default: []
    },
    hotelModificationRequest: {
        type: String,
        trim: true
    },
    packageDurationModificationRequest: {
        type: String,
        trim: true
    },
    extraServiceRequest: {
        type: String,
        trim: true
    },
    inquiryStatus: {
        type: String,
        trim: true
    },
    bookingId: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Inquiry', inquirySchema);