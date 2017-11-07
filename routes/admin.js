var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
/*var csrfProtection = csrf();
router.use(csrfProtection);*/
LocalStrategy = require('passport-local').Strategy;
var app = express();
//var mongoose = require('mongoose');
var mongo = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var validator = require('express-validator');
var User = require('../models/user');
var Provider = require('../models/providers');
var Destination = require('../models/destination');
var Continent = require('../models/continents');
var Category = require('../models/category');
var Accomodation = require('../models/accomodation');
var Package = require('../models/package');
var PackageAccomodation = require('../models/package-accomodation');
var packageroomOccupancy = require('../models/package-roomoccupancy');
var Places = require('../models/places');
var Subscribers = require('../models/subscribers');
var config = require('../config');
var admin = require('../controllers/admin');
var Aggregate = require('../models/aggregate');
var Inquiries = require('../models/inquiry');
var Offer = require('../models/offer');
var Corporatetours = require('../models/corporate-tours');
var Honeymoontours = require('../models/honeymoon-tours');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var async = require("async");
var bcrypt = require('bcrypt-nodejs');


//var url = 'mongodb://localhost:27017/dreamdestinationz';


router.get('/logout', isLoggedIn, admin.logout);


router.use('/', isLoggedIn, function(req, res, next) {
    next();
});
/* GET home page. */

router.get('/', isAdmin, function(req, res, next) {

    if (req.user.roles == "ADMIN") {
        Corporatetours.find(function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/admin-dashboard', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Corporatetours.find(function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/dashboard', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else {
        redirect('home/index');
    }
});

//Get Honeymoon Tours List
router.get('/admin_home/honeymoon-tours', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Honeymoontours.find(function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/honeymoon-tours', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Honeymoontours.find(function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/honeymoon-tours', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    }
});

//Get Honeymoon Tours
router.get('/admin_home/honeymoon-tours-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        res.render('admin/admin_home/honeymoon-tours-new', { title: 'Dream Destinationz Admin', layout: '../admin/layouts/adminlayout' });
    } else if (req.user.roles == "SUPERADMIN") {
        res.render('admin/admin_home/honeymoon-tours-new', { title: 'Dream Destinationz Admin', layout: '../admin/layouts/adminlayout' });
    }
});


//Get Corporate New Tours
router.get('/admin_home/corporate-tour-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        res.render('admin/admin_home/corporatetour-new', { title: 'Dream Destinationz Admin', layout: '../admin/layouts/adminlayout' });
    } else if (req.user.roles == "SUPERADMIN") {
        res.render('admin/admin_home/corporatetour-new', { title: 'Dream Destinationz Admin', layout: '../admin/layouts/adminlayout' });
    }
});

// Get Corporate tours List

router.get('/admin', isAdmin, function(req, res, next) {
    if (req.user.roles == "SUPERADMIN") {
        Corporatetours.find(function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/dashboard', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else if (req.user.roles == "ADMIN") {
        Corporatetours.find({ "user_id": req.user.id }, function(err, tours) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/dashboard', {
                items: tours,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    }
})

//Menu Setup
router.get('/admin_home/menu/:id', isAdmin, function(req, res, next) {

    User.find({ _id: req.params.id }, function(err, userdetails) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(userdetails);
            /*console.warn(userdetails);*/
        }
    });
});


//package Edit Route
router.get('/admin_home/packages-new/:packageId', isAdmin, function(req, res, next) {
    res.render('admin/admin_home/packages-new', { layout: '../admin/layouts/adminlayout' });

});

//Offer page Get

router.get('/admin_home/offers', isAdmin, function(req, res, next) {
    if (req.user.roles == "SUPERADMIN") {
        Offer.find(function(err, offer) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/offers', {
                items: offer,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else if (req.user.roles == "ADMIN") {
        Offer.find({ "user_id": req.user.id }, function(err, offer) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/offers', {
                items: offer,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    }

});



//Get Offer List

router.get('/admin_home/offertype', isAdmin, function(req, res, next) {

    if (req.user.roles == "SUPERADMIN") {
        Offer.find(function(err, offer) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(offer);
            }
        });
    } else if (req.user.roles == "ADMIN") {
        Offer.find({ "user_id": req.user.id }, function(err, offer) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(offer);
            }
        });
    }
});

//New Honeymoon Tour post

router.post('/admin_home/honeymoon-tours-new', isAdmin, function(req, res, next) {
    console.warn(req.body);
    var tourname = req.body.tourname;
    var images = req.body.images;

    req.checkBody('tourname', 'Tour Name Required.').notEmpty();
    req.checkBody('images', 'Upload Images Of This Country').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        errors.forEach(function(error) {
            message.push(error.msg);
        });

        res.render('admin/admin_home/honeymoon-tours-new', { title: 'New Honeymoon Tour', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        Honeymoontours.findOne({ name: req.body.tourname }, function(err, tour) {
            if (tour) {
                res.render('admin/admin_home/honeymoon-tours-new', { title: 'Honeymoon Tours', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }

            var newTours = new Honeymoontours({
                name: req.body.tourname,
                images: req.body.images,
                user_id: req.user.id
            });

            newTours.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Honeymoon Tour already exist!' };
                        return res.status(500).render('admin/admin_home/honeymoon-tours-new', { title: 'Honeymoon Tour', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }
                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                res.redirect('/admin/admin_home/honymoon-tours');
            });
        });
    }

});

//New Corporate Tour post

router.post('/admin_home/corporate-tour-new', isAdmin, function(req, res, next) {


    var tourname = req.body.tourname;
    var images = req.body.images;

    req.checkBody('tourname', 'Tour Name Required.').notEmpty();
    req.checkBody('images', 'Upload Images Of This Country').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/corporatetour-new', { title: 'New Corporate Tour', layout: '../admin/layouts/adminlayout', errors: messages });
        /* console.warn(messages);*/
    } else {
        Corporatetours.findOne({ name: req.body.tourname }, function(err, tour) {
            if (tour) {
                res.render('admin/admin_home/corporatetour-new', { title: 'Corporate Tours', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }

            var newTours = new Corporatetours({
                name: req.body.tourname,
                images: req.body.images,
                user_id: req.user.id
            });

            newTours.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Corporate Tour already exist!' };
                        return res.status(500).render('admin/admin_home/corporatetour-new', { title: 'Corporate Tour', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }
                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                res.redirect('/admin');
            });
        });
    }

});

//New-Offer page Get

router.get('/admin_home/new-offers', isAdmin, function(req, res, next) {
    res.render('admin/admin_home/new-offers', { layout: '../admin/layouts/adminlayout' });
});


//New-Offer page Post

router.post('/admin_home/new-offers', isAdmin, function(req, res, next) {


    var offername = req.body.offername;
    var offertype = req.body.offertype;
    var offerdescription = req.body.offerdescription;
    var offercode = req.body.offercode;
    var images = req.body.images;

    req.checkBody('offername', 'Offer name required.').notEmpty();
    req.checkBody('offertype', 'Select offer type.').notEmpty();
    req.checkBody('offerdescription', 'Offer Description Required.').notEmpty();
    req.checkBody('offercode', 'Offer Code Required.').notEmpty();
    req.checkBody('images', 'Upload Images Of This Country').notEmpty();

    var errors = req.validationErrors();
    /*console.warn(req.body);*/
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/new-offers', { title: 'New Offer', layout: '../admin/layouts/adminlayout', errors: messages });
        /* console.warn(messages);*/
    } else {

        Offer.findOne({ offername: req.body.offername }, function(err, offer) {
            if (offer) {
                res.render('admin/admin_home/new-offers', { title: 'New Offer', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }
            var newOffer = new Offer({
                offerName: req.body.offername,
                offerType: req.body.offertype,
                offerDescription: req.body.offerdescription,
                code: req.body.offercode,
                images: req.body.images,
                user_id: req.user.id
            });
            newOffer.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Destination already exist!' };
                        return res.status(500).render('admin/admin_home/offers', { title: 'Offers', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                /* res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: err });*/
                res.redirect('/admin/admin_home/offers');
            });

        });

    }

});

//Package Router

//router.get('/admin_home/packages', isAdmin, admin.middlewarepackages);
router.get('/admin_home/packages', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Package.aggregate([
            { "$match": { "user_id": objectId(req.user.id) } },
            {
                "$lookup": {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "mix_package"
                },
            },
            {
                "$unwind": {
                    path: "$mix_package",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                "$lookup": {
                    from: "destinations",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "mixDestination"
                }
            },
            {
                "$unwind": {
                    path: "$mixDestination",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                "$lookup": {
                    from: "continents",
                    localField: "continentId",
                    foreignField: "_id",
                    as: "mixContinent"
                }
            },
            {
                "$unwind": {
                    path: "$mixContinent",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).then(function(result) {
            /*console.warn(JSON.stringify(result));*/

            res.render('admin/admin_home/packages', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },
                layout: '../admin/layouts/adminlayout'
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Package.aggregate([{
                "$lookup": {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "mix_package"
                },
            },
            {
                "$unwind": {
                    path: "$mix_package",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                "$lookup": {
                    from: "destinations",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "mixDestination"
                }
            },
            {
                "$unwind": {
                    path: "$mixDestination",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                "$lookup": {
                    from: "continents",
                    localField: "continentId",
                    foreignField: "_id",
                    as: "mixContinent"
                }
            },
            {
                "$unwind": {
                    path: "$mixContinent",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).then(function(result) {
            /*console.warn(JSON.stringify(result));*/

            res.render('admin/admin_home/packages', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },
                layout: '../admin/layouts/adminlayout'
            });
        });
    }
});

//Router Get Continents
router.get('/admin_home/continents', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Continent.find({ user_id: req.user.id }, function(err, allcontinents) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                res.render('admin/admin_home/continents', {
                    items: allcontinents,
                    helpers: {
                        json: function(context) { return JSON.stringify(context); },
                        breaklines: function(text) {
                            text = hbs.Utils.escapeExpression(text);
                            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                            return new hbs.SafeString(text);
                        }
                    },
                    layout: '../admin/layouts/adminlayout'
                });
            }

        });
    } else if (req.user.roles == "SUPERADMIN") {
        Continent.find(function(err, allcontinents) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                res.render('admin/admin_home/continents', {
                    items: allcontinents,
                    helpers: {
                        json: function(context) { return JSON.stringify(context); },
                        breaklines: function(text) {
                            text = hbs.Utils.escapeExpression(text);
                            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                            return new hbs.SafeString(text);
                        }
                    },
                    layout: '../admin/layouts/adminlayout'
                });
            }

        });
    }
});

//Post New Continents
router.post('/admin_home/continents-new', isAdmin, function(req, res, next) {

    /*console.warn(req.body);*/

    var continentname = req.body.continentname;
    var quote = req.body.quote;
    var about = req.body.description;
    var images = req.body.images;

    req.checkBody('continentname', 'Continent Name Field Require').notEmpty();
    req.checkBody('quote', 'Continent Quote Field Require').notEmpty();
    req.checkBody('description', 'About Continent Field Require').notEmpty();
    req.checkBody('images', 'Upload Images Of This Continent').notEmpty();

    var errors = req.validationErrors();
    /*console.warn(req.body);*/
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/continents-new', { title: 'Continent', layout: '../admin/layouts/adminlayout', errors: messages })
            /* console.warn(messages);*/
    } else {

        Continent.findOne({ name: req.body.continentname }, function(err, continent) {
            if (continent) {
                res.render('admin/admin_home/continents-new', { title: 'Continent', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }
            var newContinent = new Continent({
                name: req.body.continentname,
                quote: req.body.quote,
                about: req.body.description,
                images: req.body.images,
                user_id: req.user.id
            });
            newContinent.save(function(err, result) {

                if (err) {
                    if (err.continentname === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'continent already exist!' };
                        return res.status(500).render('admin/admin_home/continents', { title: 'Continent', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                /* res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: err });*/
                res.redirect('/admin/admin_home/continents');
            });

        });

    }
});


//Router Get Places
router.get('/admin_home/places', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Places.aggregate([

            { "$match": { "user_id": objectId(req.user.id) } },
            {
                "$lookup": {
                    from: "destinations",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "places"
                }
            }
        ]).then(function(result) {

            res.render('admin/admin_home/places', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },

                layout: '../admin/layouts/adminlayout'
            });

        });
    } else if (req.user.roles == "SUPERADMIN") {
        Places.aggregate([{
            "$lookup": {
                from: "destinations",
                localField: "countryId",
                foreignField: "_id",
                as: "places"
            }
        }]).then(function(result) {

            res.render('admin/admin_home/places', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },

                layout: '../admin/layouts/adminlayout'
            });

        });
    }

});

//Continent List GET

router.get('/admin_home/continent-list', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Continent.find({ user_id: req.user.id }, function(err, allcontinets) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allcontinets);
            }
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Continent.find(function(err, allcontinents) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allcontinents);
            }
        })
    }
})


//router.get('/admin_home/packages', isAdmin, admin.middlewarepackages);
router.get('/admin_home/places-list', isAdmin, function(req, res, next) {

    if (req.user.roles == "ADMIN") {
        Places.find({ user_id: req.user.id }, function(err, allplaces) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allplaces);
            }

        });
    } else if (req.user.roles == "SUPERADMIN") {
        Places.find(function(err, allplaces) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allplaces);
            }

        });
    }

});


//Router Get NewContinents
router.get('/admin_home/continents-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Continent.find({ user_id: req.user.id }, function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/continents-new', {
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Continent.find(function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/continents-new', {
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });
        });
    }

});

//Get Please enter correct captcha value List
router.get('/admin_home/destination-list', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Destination.find({ user_id: req.user.id }, function(err, allCountry) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allCountry);
            }

        });
    } else if (req.user.roles == "SUPERADMIN") {
        Destination.find(function(err, allCountry) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allCountry);
            }
        });
    }

});

//Get Categories List

router.get('/admin_home/categories-list', function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Category.find({ user_id: req.user.id }, function(err, allCategory) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allCategory);
            }

        })
    } else if (req.user.roles == "SUPERADMIN") {
        Category.find(function(err, allCategory) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                return res.json(allCategory);
            }

        })
    }
});

//Router Get New Places
router.get('/admin_home/places-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Destination.find({ user_id: req.user.id }, function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find({ user_id: req.user.id }, function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                destination.categories = category;

                res.render('admin/admin_home/places-new', {
                    destinations: destination,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Destination.find(function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find(function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                destination.categories = category;

                res.render('admin/admin_home/places-new', {
                    destinations: destination,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    }

});

//Get Subscribers
router.get('/admin_home/subscribers', isAdmin, function(req, res, next) {
    if (req.user.roles == "SUPERADMIN") {
        Subscribers.find(function(err, subscriber) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/subscribers', { items: subscriber, layout: '../admin/layouts/adminlayout' });
        });
    }

});

//Get Inquiries
router.get('/admin_home/inquiries', isAdmin, function(req, res, next) {
    if (req.user.roles == "SUPERADMIN") {
        Inquiries.find(function(err, inquiries) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/inquiries', {
                items: inquiries,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    } else if (req.user.roles == "ADMIN") {
        Inquiries.find({ "packageCreatorID": req.user.id }, function(err, inquiries) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/inquiries', {
                items: inquiries,
                layout: '../admin/layouts/adminlayout',
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                }
            });
        });
    }

});

// Delete Corporate Tours

router.delete('/admin_home/corporatetour/delete/:id', function(req, res) {
    Corporatetours.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    });
})

//Delete Offer

router.delete('/admin_home/offer/delete/:id', function(req, res) {
    Offer.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })


});


//Delete Places

router.delete('/admin_home/places/delete/:id', function(req, res) {
    Places.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })


});

//Delete Continents

router.delete('/admin_home/continent/delete/:id', function(req, res) {
    Continent.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        assert.equal(null, err);
        console.warn("Item Deleted");
        return res.json(result);
    })
});

//Delete Package
router.delete('/admin_home/packages/delete/:id', function(req, res) {

    Package.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })

    PackageAccomodation.remove({ "packageid": objectId(req.params.id) }, function(err, result) {
        assert.equal(null, err);
        console.warn('Package Accomodation Deleted');

    })

    packageroomOccupancy.remove({ "packageid": objectId(req.params.id) }, function(err, result) {
        assert.equal(null, err);
        console.warn('Package Occupancy Deleted');

    })


});


//New Package Routes

router.get('/admin_home/packages-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Continent.find({ user_id: req.user.id }, function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find({ user_id: req.user.id }, function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                continent.categories = category;

                res.render('admin/admin_home/packages-new', {
                    continents: continent,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    }
    if (req.user.roles == "SUPERADMIN") {
        Continent.find(function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find(function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                continent.categories = category;

                res.render('admin/admin_home/packages-new', {
                    continents: continent,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    }
});

/*router.get('/admin_home/accomodation', isAdmin, admin.middlewareaccomodation);*/

//router.get('/admin_home/accomodation-new', isAdmin, admin.middlewarenewaccomodation);
// Get Provider
router.get('/admin_home/providers', isAdmin, function(req, res, next) {
    if (req.user.roles == "SUPERADMIN") {
        /*console.warn(req.user);*/
        User.find(function(err, providers) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/providers', { /*csrfToken: req.csrfToken(),*/ items: providers, layout: '../admin/layouts/adminlayout' });
        })
    }
});
//Delete Provider
router.delete('/admin_home/providers/delete/:id', function(req, res) {

    console.warn("Delete User Inside");

    User.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })


});


// Get Destination
router.get('/admin_home/destination', isAdmin, function(req, res, next) {
    /*console.warn(req.destinations.name);*/
    if (req.user.roles == "ADMIN") {

        Destination.aggregate([

            { "$match": { "user_id": objectId(req.user.id) } },
            {
                "$lookup": {
                    from: "continents",
                    localField: "continentId",
                    foreignField: "_id",
                    as: "mixdestinations"
                }
            }
        ]).then(function(result) {

            res.render('admin/admin_home/destination', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },

                layout: '../admin/layouts/adminlayout'
            });

        });

    } else if (req.user.roles == "SUPERADMIN") {

        Destination.aggregate([{
            "$lookup": {
                from: "continents",
                localField: "continentId",
                foreignField: "_id",
                as: "mixdestinations"
            }
        }]).then(function(result) {

            res.render('admin/admin_home/destination', {
                items: result,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    }
                },

                layout: '../admin/layouts/adminlayout'
            });

        });
    }
});

//Get Categories
router.get('/admin_home/categories', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Category.find({ user_id: req.user.id }, function(err, category) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/categories', { items: category, layout: '../admin/layouts/adminlayout' });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Category.find(function(err, category) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/categories', { items: category, layout: '../admin/layouts/adminlayout' });
        });
    }
});

// Get Categories For New-Accomodation Page
router.get('/admin_home/accomodation-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Destination.find({ user_id: req.user.id }, function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            }

            res.render('admin/admin_home/accomodation-new', {
                title: "New Accomodation",
                items: destination,
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });

        });
    } else if (req.user.roles == "SUPERADMIN") {
        Destination.find(function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            }

            res.render('admin/admin_home/accomodation-new', {
                title: "New Accomodation",
                items: destination,
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });

        });
    }
});

// Get Categories For New-Accomodation update Page
router.get('/admin_home/accomodation-new/:id', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Accomodation.findOne({ user_id: req.user.id, "_id": objectId(req.params.id) }, function(err, accomodation) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find({ user_id: req.user.id }, function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                accomodation.categories = category;
                res.render('admin/admin_home/accomodation-new', {
                    accomodation: accomodation,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Accomodation.findOne({ "_id": objectId(req.params.id) }, function(err, accomodation) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            Category.find({ user_id: req.user.id }, function(err, category) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                accomodation.categories = category;
                res.render('admin/admin_home/accomodation-new', {
                    accomodation: accomodation,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    }
});

//Get places For Helper-new Update Page
router.get('/admin_home/places-new/:id', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Places.findOne({ user_id: req.user.id, "_id": objectId(req.params.id) }, function(err, places) {
            if (err) {
                {
                    { place.longitude }
                }
                assert.equal(null, err);
                return;
            }
            Destination.find({ user_id: req.user.id }, function(err, destination) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                places.place = destination;
                res.render('admin/admin_home/places-new', {
                    places: places,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Places.findOne({ "_id": objectId(req.params.id) }, function(err, places) {
            if (err) {
                {
                    { place.longitude }
                }
                assert.equal(null, err);
                return;
            }
            Destination.find({ user_id: req.user.id }, function(err, destination) {
                if (err) {
                    assert.equal(null, err);
                    return;
                }
                places.place = destination;
                res.render('admin/admin_home/places-new', {
                    places: places,
                    helpers: { json: function(context) { return JSON.stringify(context); } },

                    layout: '../admin/layouts/adminlayout'
                });
            });
        });
    }

});



// Get Categories For Accomodation Page
router.get('/admin_home/accomodation', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Accomodation.aggregate([
            { "$match": { "user_id": objectId(req.user.id) } },
            {
                "$lookup": {
                    from: "destinations",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "mixWithDestination"
                }

            },
            {
                "$unwind": {
                    path: "$mixWithDestination",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]).then(function(accomodation) {
            res.render('admin/admin_home/accomodation', {
                accomodations: accomodation,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    },
                    list: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '</li><li>');
                        text = "<ul><li>" + text + "</li></ul>";
                        return new hbs.SafeString(text);
                    },
                    chain: function() {
                        var helpers = [],
                            value;
                        $.each(arguments, function(i, arg) {
                            if (hbs.helpers[arg]) {
                                helpers.push(hbs.helpers[arg]);
                            } else {
                                value = arg;
                                $.each(helpers, function(j, helper) {
                                    value = helper(value, arguments[i + 1]);
                                });
                                return false;
                            }
                        });
                        return value;
                    },
                    counter: function(index) {
                        return index + 1;
                    }
                },
                layout: '../admin/layouts/adminlayout'
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Accomodation.aggregate([{
                "$lookup": {
                    from: "destinations",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "mixWithDestination"
                }

            },
            {
                "$unwind": {
                    path: "$mixWithDestination",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]).then(function(accomodation) {
            res.render('admin/admin_home/accomodation', {
                accomodations: accomodation,
                helpers: {
                    json: function(context) { return JSON.stringify(context); },
                    breaklines: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    },
                    list: function(text) {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '</li><li>');
                        text = "<ul><li>" + text + "</li></ul>";
                        return new hbs.SafeString(text);
                    },
                    chain: function() {
                        var helpers = [],
                            value;
                        $.each(arguments, function(i, arg) {
                            if (hbs.helpers[arg]) {
                                helpers.push(hbs.helpers[arg]);
                            } else {
                                value = arg;
                                $.each(helpers, function(j, helper) {
                                    value = helper(value, arguments[i + 1]);
                                });
                                return false;
                            }
                        });
                        return value;
                    },
                    counter: function(index) {
                        return index + 1;
                    }
                },
                layout: '../admin/layouts/adminlayout'
            });
        });
    }
});

//Get Accomodation list

router.get('/admin_home/accomodation-list', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Accomodation.find({ user_id: req.user.id }, function(err, accomodation) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                //console.warn(accomodation);
                return res.json(accomodation);
            }

        });
    }
    if (req.user.roles == "SUPERADMIN") {
        Accomodation.find(function(err, accomodation) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                //console.warn(accomodation);
                return res.json(accomodation);
            }

        });
    }
});

//Get Country And City List
router.get('/admin_home/country-list', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Destination.find({ user_id: req.user.id }, function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                //console.warn(accomodation);
                return res.json(destination);
            }

        });
    }
    if (req.user.roles == "SUPERADMIN") {
        Destination.find(function(err, destination) {
            if (err) {
                assert.equal(null, err);
                return;
            } else {
                //console.warn(accomodation);
                return res.json(destination);
            }

        });
    }
});

//Delete Subscribers

router.delete('/admin_home/subscriber/delete/:id', function(req, res) {
    Subscribers.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })

});

// Delete Categories

router.delete('/admin_home/categories/delete/:id', function(req, res) {
    Category.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    })

});

//Delete Accomodation
router.delete('/admin_home/accomodation/delete/:id', function(req, res) {
    Accomodation.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    });

});

//Delete Inquiries
router.delete('/admin_home/inquiries/delete/:id', function(req, res) {
    Inquiries.remove({ "_id": objectId(req.params.id) }, function(err, result) {

        assert.equal(null, err);
        console.warn('Item Deleted');
        return res.json(result);
    });
});

//Update Package Status

router.put('/admin_home/packagestatus/update/:id', function(req, res, next) {
    /*console.warn(req.body);*/

    var updateStatus = {
        published: req.body.status,
        updated_at: Date.now()
    };

    Package.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updateStatus }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
        return res.json(result);
    });

});

//Update Promotion Package Status

router.put('/admin_home/packagepromotestatus/update/:id', function(req, res, next) {
    /*console.warn(req.body);*/

    var updateStatus = {
        promote: req.body.status,
        updated_at: Date.now()
    };

    Package.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updateStatus }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
        return res.json(result);
    });

});

//Update inquiry
router.put('/admin_home/inquiries/update/:id', function(req, res, next) {
    var updatedinquiry = {
        inquiryStatus: req.body.inquirystatus,
        updated_at: Date.now()
    };

    var id = req.body.id;
    Inquiries.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updatedinquiry }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
    });
    return res.json(updatedinquiry);

});
//Update Categories

router.put('/admin_home/categories/update/:id', function(req, res, next) {
    var updatedcategory = {
        name: req.body.name,
        updated_at: Date.now()
    };

    var id = req.body.id;
    Category.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updatedcategory }, function(err, result) {
        assert.equal(null, err);
        console.log('Item updated');
    });
    return res.json(updatedcategory);

});

//Update Accomodation

router.put('/admin_home/accomodation-new/update/:id', function(req, res, next) {
    /*console.warn(req.body);*/
    var updatedaccomodation = {
        countryId: req.body.countryId,
        stateId: req.body.stateId,
        hotelname: req.body.hotelname,
        description: req.body.description,
        category: req.body.starcategory,
        roomtypes: req.body.roomtypes,
        images: req.body.images,
        updated_at: Date.now()
    };

    var id = req.body.id;

    Accomodation.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: updatedaccomodation }, function(err, result) {
        assert.equal(null, err);

    });

    return res.json(updatedaccomodation);
});


//Delete Destinations 

router.delete('/admin_home/destination/delete/:id', function(req, res) {
    Destination.remove({ "_id": objectId(req.params.id) }, function(err, result) {
        /*console.warn(result);*/
        assert.equal(null, err);
        /*console.log('Item Deleted');*/
        return res.json(result);
    })

});

//Update destination
router.put('/admin_home/destination/update/:id', function(req, res, next) {

    console.warn(req.body);

    var destination = {
        name: req.body.name,
        continentId: req.body.continentid,
        quote: req.body.quote,
        about: req.body.about,
        images: req.body.images,
        updated_at: Date.now()
    };


    Destination.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: destination }, function(err, result) {
        assert.equal(null, err);

    });

    return res.json(destination);

});

//Update Corporate Tour

router.put('/admin_home/corporatetour/update/:id', function(req, res, next) {

    console.warn(req.body);
    var corporatetour = {
        name: req.body.name,
        images: req.body.images,
        updated_at: Date.now()
    }

    Corporatetours.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: corporatetour }, function(err, result) {
        assert.equal(null, err);
        return res.json(result);
    });

});

//Update Continent

router.put('/admin_home/continent/update/:id', function(req, res, next) {

    var continent = {
        name: req.body.name,
        quote: req.body.quote,
        about: req.body.description,
        images: req.body.images,
        updated_at: Date.now()
    }

    Continent.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: continent }, function(err, result) {
        assert.equal(null, err);
    });
    return res.json(continent);
});

//Update offer

router.put('/admin_home/offer/update/:id', function(req, res, next) {
    var offer = {
        offerName: req.body.offername,
        offerType: req.body.offertype,
        offerDescription: req.body.offerdescription,
        code: req.body.offercode,
        images: req.body.images,
        updated_at: Date.now()
    };
    Offer.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: offer }, function(err, result) {
        assert.equal(null, err);

    });
    return res.json(offer);

});

//Update Package
router.put('/admin_home/packagesupdate/:id', function(req, res, next) {
    var packageobject = {
        continentId: req.body.continent,
        countryId: req.body.country,
        packagename: req.body.packagename,
        categories: req.body.packagecategories,
        packagedescription: req.body.packagedescription,
        itinerary: req.body.itinerary,
        images: req.body.images,
        packageinclude: req.body.includes,
        packageexclude: req.body.excludes,
        childrenpolicy: req.body.childrenpolicy,
        cancelpolicy: req.body.cancellationpolicy,
        terms: req.body.termsconditions,
        updated_at: Date.now()
    };

    Package.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: packageobject }, function(err, result) {
        assert.equal(null, err);
        return res.json(result);
    });

});


//Update Places
router.put('/admin_home/places/update/:id', function(req, res, next) {
    /*console.warn(req.body);
    console.warn(req.params.id);*/

    var placeMapLatitude = req.body.latitudePlace;
    var placeMapLongitude = req.body.longitudePlace;

    var mapArray = {
        latitude: placeMapLatitude,
        longitude: placeMapLongitude
    };

    var place = {
        placename: req.body.name,
        countryId: req.body.countryId,
        description: req.body.descriptionPlace,
        howtogetthere: req.body.howToGetPlace,
        whentogo: req.body.whentogoPlace,
        highlights: req.body.highlightsPlace,
        map: mapArray,
        images: req.body.images,
        updated_at: Date.now()
    };


    Places.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: place }, function(err, result) {
        assert.equal(null, err);

    });
    return res.json(place);
});
//Update provider
router.put('/admin_home/provider/update/:id', function(req, res, next) {
    var provider = {
        username: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        roles: req.body.roles,
        status: req.body.status,
        workinghours: req.body.workinghours,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        country: req.body.country,
        updated_at: Date.now()
    };

    User.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: provider }, function(err, result) {
        assert.equal(null, err);
        return res.json(result);
    });


});
//Update Provider Password
router.put('/admin_home/provider/updatepassword/:id', function(req, res, next) {
    /*console.warn(req.body.password, "Password");*/
    var newPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
    var providerpassword = {
        password: newPassword
    };
    console.warn(providerpassword);
    User.findOneAndUpdate({ '_id': objectId(req.params.id) }, { $set: providerpassword }, function(err, result) {
        assert.equal(null, err);
        return res.json(result);
    });


})

//Create New Places
router.post('/admin_home/places-new', isAdmin, function(req, res, next) {
    //MAP Object Creation
    var placeMapLatitude = req.body.latitude;
    var placeMapLongitude = req.body.longitude;
    /*console.warn(req.body.countryid);*/
    var mapobj = {
        latitude: placeMapLatitude,
        longitude: placeMapLongitude
    };

    req.checkBody('placename', 'Place Name Field Require').notEmpty();
    req.checkBody('countryid', 'Select A Country').notEmpty();
    req.checkBody('description', 'Description Field Require').notEmpty();
    req.checkBody('howtoget', 'How To Get There Field Require').notEmpty();
    req.checkBody('whentogo', 'When To Go There Field Require').notEmpty();
    req.checkBody('highlights', 'Highlights Field Require').notEmpty();
    req.checkBody('latitude', 'Latitude Field Require').notEmpty();
    req.checkBody('longitude', 'Longitude Field Require').notEmpty();
    req.checkBody('images', 'Please Upload Images Of This Place').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/places-new', { title: 'Add New Place', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        Places.findOne({ placename: req.body.placename }, function(err, places) {
            if (places) {
                res.render('admin/admin_home/places-new', { title: 'New Place', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }

            var newPlaces = new Places({
                placename: req.body.placename,
                countryId: req.body.countryid,
                description: req.body.description,
                howtogetthere: req.body.howtoget,
                whentogo: req.body.whentogo,
                highlights: req.body.highlights,
                map: mapobj,
                images: req.body.images,
                user_id: req.user.id
            });
            newPlaces.save(function(err, result) {
                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Places already exist!' };
                        return res.status(500).render('admin/admin_home/places', { title: 'New Place', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }
                assert.equal(null, err);
                /* res.render('admin/admin_home/places', { title: 'New Place', layout: '../admin/layouts/adminlayout', message: err });*/

                res.redirect('/admin/admin_home/places');
            });

        });
    }

});



// Creating Provider Db and checking for Duplicate Value
router.post('/admin_home/providers', isAdmin, function(req, res, next) {

    var username = req.body.username;
    var email = req.body.email;
    var mobilenumber = req.body.mobilenumber;
    var workinghours = req.body.workinghours;
    var address = req.body.address;
    var zipcode = req.body.zipcode;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var password = req.body.password;
    var password2 = req.body.repassword;


    req.checkBody('username', 'Name Field Require').notEmpty();
    req.checkBody('password', 'Password Field Require').notEmpty();
    req.checkBody('email', 'Email Id Required').isEmail();
    req.checkBody('workinghours', 'Working Hours Field Required').notEmpty();
    req.checkBody('mobilenumber', 'Mobile Number Required').notEmpty();
    req.checkBody('address', 'Address Field Required').notEmpty();
    req.checkBody('zipcode', 'Zipcode Field Required').notEmpty();
    req.checkBody('city', 'City Field Required').notEmpty();
    req.checkBody('state', 'State Field Required').notEmpty();
    req.checkBody('country', 'Counter Field Required').notEmpty();
    req.checkBody('repassword', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        User.findOne({ name: req.body.name, email: req.body.email }, function(err, provider) {
            if (provider) {

                res.render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', error: "Provider already exist!" });
                return true;
            } else {
                var newProvider = new User({
                    username: username,
                    email: email,
                    password: password,
                    mobile: mobilenumber,
                    workinghours: workinghours,
                    address: address,
                    city: city,
                    zipcode: zipcode,
                    state: state,
                    country: country,
                    status: true,
                    user_id: req.user.id,
                    roles: "ADMIN"
                });
                newProvider.password = newProvider.encryptPassword(newProvider.password);
                console.warn(newProvider);
                newProvider.save(newProvider, function(err, result) {
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            var message = { message: 'Provider already exist!' };
                            return res.status(500).render('admin/admin_home/providers', { title: 'Providers', layout: '../admin/layouts/adminlayout', errors: message });
                        }
                        return res.status(500).send(err);
                    }
                    assert.equal(null, err);
                    res.redirect('/admin/admin_home/providers');
                });
            }
        });

    }

});

// Creating Destinations Db and checking for Duplicate Value
router.get('/admin_home/destination-new', isAdmin, function(req, res, next) {
    if (req.user.roles == "ADMIN") {
        Continent.find({ user_id: req.user.id }, function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/destination-new', {
                continents: continent,
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });
        });
    } else if (req.user.roles == "SUPERADMIN") {
        Continent.find(function(err, continent) {
            if (err) {
                assert.equal(null, err);
                return;
            }
            res.render('admin/admin_home/destination-new', {
                continents: continent,
                helpers: { json: function(context) { return JSON.stringify(context); } },

                layout: '../admin/layouts/adminlayout'
            });
        });
    }
});

// Creating Destinations Db and checking for Duplicate Value
router.post('/admin_home/destination-new', isAdmin, function(req, res, next) {

    /* console.warn(req.body); */

    var destinationname = req.body.name;
    var continentId = req.body.continentid;
    var quote = req.body.quote;
    var about = req.body.aboutCountry;
    var images = req.body.images;

    req.checkBody('name', 'Destination Name Field Require').notEmpty();
    req.checkBody('continentid', 'Continent Id Field Require').notEmpty();
    req.checkBody('quote', 'Destination Quote Field Require').notEmpty();
    req.checkBody('aboutCountry', 'About Country Field Require').notEmpty();
    req.checkBody('images', 'Upload Images Of This Country').notEmpty();

    var errors = req.validationErrors();
    /*console.warn(req.body);*/
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/destination-new', { title: 'Destination', layout: '../admin/layouts/adminlayout', errors: messages });
        /* console.warn(messages);*/
    } else {

        Destination.findOne({ name: req.body.name }, function(err, destination) {
            if (destination) {
                res.render('admin/admin_home/destination-new', { title: 'Destination', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }
            var newDestination = new Destination({
                name: req.body.name,
                continentId: req.body.continentid,
                quote: req.body.quote,
                about: req.body.aboutCountry,
                images: req.body.images,
                user_id: req.user.id
            });
            newDestination.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Destination already exist!' };
                        return res.status(500).render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                /* res.render('admin/admin_home/destination', { title: 'Destination', layout: '../admin/layouts/adminlayout', message: err });*/
                res.redirect('/admin/admin_home/destination');
            });

        });

    }
});

// Creating Categories Db and checking for Duplicate Value
router.post('/admin_home/categories', isAdmin, function(req, res, next) {

    req.checkBody('name', 'Category Field Require').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        /*return done(null, req.flash('error', messages));*/
        res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', errors: messages });

    } else {

        Category.findOne({ name: req.body.name }, function(err, category) {
            if (category) {
                res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', error: "Already Exists" });
                return true;
            }
            var newCategory = new Category({
                name: req.body.name,
                user_id: req.user.id
            });
            newCategory.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Categorie already exist!' };
                        return res.status(500).render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                /*res.render('admin/admin_home/categories', { title: 'Categories', layout: '../admin/layouts/adminlayout', message: err });*/
                res.redirect('/admin/admin_home/categories');
            });

        });

    }
});

// Creating New Accomodation 

router.post('/admin_home/accomodation-new', isAdmin, function(req, res, next) {
    console.warn(req.body.images);
    req.checkBody('country', 'Select A Country From Dropdown').notEmpty();
    req.checkBody('state', 'Select A State From Dropdown').notEmpty();
    req.checkBody('hotelname', 'Hotelname Field Required').notEmpty();
    req.checkBody('starcategory', 'Select Category From The Dropdown').notEmpty();
    req.checkBody('description', 'Description Field Required').notEmpty();
    req.checkBody('textbox', 'Add A RoomType').notEmpty();
    req.checkBody('images', 'Upload Images For This Hotel').notEmpty();
    var errors = req.validationErrors();
    // console.warn(errors);
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/accomodation-new', { title: 'accomodation-new', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {
        Accomodation.findOne({ hotelname: req.body.hotelname }, function(err, accomodation) {
            if (accomodation) {
                res.render('admin/admin_home/accomodation-new', { title: 'accomodation-new', layout: '../admin/layouts/adminlayout', error: "Hotel Already Exists" });
                return true;
            }

            var newAccomodation = new Accomodation({
                countryId: req.body.country,
                stateId: req.body.state,
                hotelname: req.body.hotelname,
                category: req.body.starcategory,
                description: req.body.description,
                roomtypes: req.body.textbox,
                images: req.body.images,
                user_id: req.user.id
            });
            newAccomodation.save(function(err, result) {

                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Accomodation already exist!' };
                        return res.status(500).render('admin/admin_home/accomodation-new', { title: 'Accomodation', layout: '../admin/layouts/adminlayout', errors: message });
                    }

                    // Some other error
                    return res.status(500).send(err);
                }

                console.log("Data Inserted");
                console.warn(err);
                assert.equal(null, err);
                /* res.render('admin/admin_home/accomodation', { title: 'accomodation-new', layout: '../admin/layouts/adminlayout', message: err });*/
                res.redirect('/admin/admin_home/accomodation');

            });

        });
    }
});



/* Creating New Package (Check Custom-home.js file for package cration).
(Check custom-home.js for itinerary add new day code) */


router.post('/admin_home/packages-new', isAdmin, function(req, res, next) {
    var userid = req.user.id;

    var errors = req.validationErrors();
    //console.warn(errors);
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('admin/admin_home/packages-new', { title: 'package-new', layout: '../admin/layouts/adminlayout', errors: messages });
    } else {

        var newPackage = new Package({
            continentId: req.body.continentId,
            countryId: req.body.countryId,
            packagename: req.body.packagename,
            categories: req.body.packagecategories,
            packagedescription: req.body.packagedescription,
            itinerary: req.body.itinerary,
            images: req.body.images,
            packageinclude: req.body.includes,
            packageexclude: req.body.excludes,
            childrenpolicy: req.body.childrenpolicy,
            cancelpolicy: req.body.cancellationpolicy,
            terms: req.body.termsconditions,
            map: req.body.map,
            user_id: req.user.id
        });


        newPackage.save(function(err, result) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    var message = { message: 'Package already exist!' };

                    return res.status(500).render('admin/admin_home/packages-new', { title: 'package-new', layout: '../admin/layouts/adminlayout', error: message });
                }

                // Some other error
                return res.status(500).send(err);
            }

            console.log("Data Inserted");
            console.warn(err);
            assert.equal(null, err);
            /*res.render('admin/admin_home/packages-new', { title: 'package-new', layout: '../admin/layouts/adminlayout' });*/

            res.redirect('/admin/admin_home/packages');

        });

    }


});


//Image Uploader

router.get('/', function(req, res) {
    fs.readdir(config.UPLOADDIR, function(err, list) {
        if (err)
            throw err;
        res.render('fileUpload', { fileList: list });
    });
});

router.get('/admin/admin_home/fileUpload', function(req, res) {
    fs.readdir(config.UPLOADDIR, function(err, list) {
        if (err)
            throw err;
        res.render('fileUpload', { fileList: list });
    });

});

router.get('/admin_home/deleteFile/:file', function(req, res) {
    var targetPath = config.UPLOADDIR + req.param("file");


    fs.unlink(targetPath, function(err) {
        if (err) {
            res.send("Error to delete file: " + err);
        } else {
            res.send("File deleted successfully!");
        }
    })


});

router.post('/admin_home/fileUpload', multipartMiddleware, function(req, res) {
    var tempPath = req.files.uploadfile.path;
    var targetPath = config.UPLOADDIR + req.files.uploadfile.name;
    fs.rename(tempPath, targetPath, function(err) {
        if (err) {
            var msg = "Error found to upload file " + err;
            var type = "error";
        } else {
            var fileSize = req.files.uploadfile.size / 1024;
            var msg = "File uploaded to " + targetPath + " (" + (fileSize.toFixed(2)) + " kb)";
            var type = "success";
            res.send("/files/" + req.files.uploadfile.name);
        }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() || req.path == '/signin' || req.path == '/signup') {
        return next();
    }
    res.redirect('/user/signin');
}

function isAdmin(req, res, next) {
    if (req.user.roles == "ADMIN" || "SUPERADMIN") {
        /*console.warn(req.user);*/
        return next();
    }
    res.redirect('/');

}