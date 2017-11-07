var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.ObjectId;
var User = require('./user');

var userSchema = new Schema({
    username: {
        type: String,
        require: true,
        index: {
            unique: true,
            sparse: true
        },
        trim: true
    },
    email: {
        type: String,
        require: true,
        index: {
            unique: true,
            sparse: true
        },
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    workinghours: { type: String, require: true, trim: true },
    mobile: { type: String, trim: true },
    address: { type: String },
    city: { type: String, trim: true },
    zipcode: { type: Number, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    user_id: { type: ObjectId, ref: 'User' },
    roles: {
        type: String,
        enum: ['USER', 'ADMIN', 'SUPERADMIN']
    },
    status: { type: Boolean, require: true },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports.createUser = function(newProvider, callback) {
    bcrypt.genSalt(5, function(err, salt) {
        //The 1st argument is the number of rounds to use when generating a salt.
        bcrypt.hash(newProvider.password, salt, function(err, hash) {
            newProvider.password = hash;
            newProvider.save(callback);
        });
    });
}
module.exports = mongoose.model('User', userSchema);