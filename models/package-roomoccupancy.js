var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('./user');
var Package = require('./package');

var packageroomoccupancySchema = new Schema({

    roomoccupancyprice: [{
        options: [{
            option: { type: String },
            priceperadult: { type: String },
            adultperroom: { type: String },
            todate: { type: String },
            fromdate: { type: String }
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


module.exports = mongoose.model('packageroomOccupancy', packageroomoccupancySchema);