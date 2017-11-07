var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var app = express();
var _ = require('lodash');
var hbs = require('hbs');
var config = require('../config');
var Subscribe = require('../models/subscribers');
var Inquiry = require('../models/inquiry');
var Packages = require('../models/package');
var Accomodation = require('../models/accomodation');
var Destination = require('../models/destination');
var User = require('../models/user');
var Places = require('../models/places');
var PackageAccomodations = require('../models/package-accomodation');
var PacakheRoomoccupancies = require("../models/package-roomoccupancy")




/* GET home page. */
router.get('/', function(req, res, next) {
    Packages.aggregate([
        { "$match": { "published": true, "promote": true } },
        {
            "$lookup": {
                from: "packageaccomodations",
                localField: "_id",
                foreignField: "packageid",
                as: "mixWithAccomodation"
            }

        },
        {
            "$unwind": {
                path: "$mixWithAccomodation",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            "$lookup": {
                from: "packageroomoccupancies",
                localField: "_id",
                foreignField: "packageid",
                as: "mixWithOccupancies"
            }
        },
        {
            "$unwind": {
                path: "$mixWithOccupancies",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).then(function(result) {
        /*var results = JSON.stringify(result);
        console.warn(results);*/

        res.render('home/index', {
            title: 'aluxtrip.com',
            items: result,
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
});

//Package List For Homepage

router.get('/home/package-list-home', function(req, res, next) {
    Packages.find(function(err, packagelist) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(packagelist);
        }
    });
});
//Get Indian Destinations Page
router.get('/indian-destinations', function(req, res, next) {
    res.render('home/indian-destinations', { title: 'Indian Tours' });
});

//Get Pilgrimage Tours Page
router.get('/pilgrimage-tours', function(req, res, next) {
    Packages.find({ "categories": "Pilgrimage Package", "published": true }, function(err, packagelist) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            res.render('home/pilgrimage-tours', {
                title: 'Pilgrimage Tours',
                item: packagelist,
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
                    }
                }
            });
        }
    });
});

//Render Pilgrimage packages

router.get('/pilgrim/category/:category', function(req, res, next) {
    var pcategory = req.param('category');
    console.log(pcategory);
    Packages.find({ "categories": pcategory, "published": true }, function(err, packdetails) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(packdetails);
        }
    });
});

//Get Indian Destinations Page
router.get('/international-destination', function(req, res, next) {
    res.render('home/international-destination', { title: 'International Tours' });
});

//Indian Package List Route
router.get('/home/indian-destinations-list', function(req, res, next) {
    Destination.aggregate([{
        "$lookup": {
            from: "continents",
            localField: "continentId",
            foreignField: "_id",
            as: "mixWithIndianDestination"
        }

    }]).then(function(allDestinations) {
        return res.json(allDestinations);
    });
});

//Get Indian Package List According to the Place
router.get('/indian-destinations/:id', function(req, res, next) {
    Packages.find({ "countryId": objectId(req.params.id) }, function(err, allPackages) {
        Destination.find({ "_id": objectId(req.params.id) }, function(err, destinationDetails) {
            res.render('home/package-list', {
                title: 'aluxtrip.com',
                items: {
                    packages: allPackages,
                    destination: destinationDetails
                },
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
                    }
                }
            });
        });
    });

});

//Get International Package List According to the Place
router.get('/international-destination/:id', function(req, res, next) {
    Packages.find({ "countryId": objectId(req.params.id) }, function(err, allPackages) {
        Destination.find({ "_id": objectId(req.params.id) }, function(err, destinationDetails) {
            res.render('home/package-list', {
                title: 'aluxtrip.com',
                items: {
                    packages: allPackages,
                    destination: destinationDetails
                },
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
                    }
                }
            });
        });
    });

});
//Get Package Details For Each Place

router.get('/placepackagedetails/:id', function(req, res, next) {
    Packages.find({ "countryId": objectId(req.params.id) }, function(err, allPackages) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(allPackages);
        }
    });
});

//Accomodation Details For Package Page
router.get('/accomodationdetails/:id', function(req, res, next) {
    Accomodation.find({ "_id": objectId(req.params.id) }, function(err, hotelDetails) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(hotelDetails);
        }
    });
});

//Get Places
router.get('/place', function(req, res, next) {
    res.render('home/place', { title: 'Coutry Places' });
});

//Get User List For Contact Page
router.get('/contact', function(req, res, next) {

    User.find({ "roles": "ADMIN" }, function(err, userlist) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            res.render('home/contact', { title: 'Contact', items: userlist });
        }
    })
});

//Get UserDetails For Contact Page

router.get('/userdetails/:id', function(req, res, next) {
    User.find({ "_id": objectId(req.params.id) }, function(err, userdetails) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(userdetails);
        }
    })
});


router.get('/menu', function(req, res, next) {
    Destination.find(function(err, nevItems) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(nevItems);
        }
    });
});

router.get('/package', function(req, res, next) {
    res.render('home/package-details', { title: 'Thailand|Packages' });
});

router.get('/inquiry', function(req, res, next) {
    res.render('home/inquiry', { title: 'Inquiry' });
});

//Package itinerary details route
router.get('/packagedetailspage/packageId/:packageId/destinationId/:destinationId', function(req, res, next) {
    var packageID = req.param('packageId');
    var destinationID = req.param('destinationId');
    Packages.aggregate([
        { "$match": { "_id": objectId(packageID) } },
        {
            "$lookup": {
                from: "destinations",
                localField: "countryId",
                foreignField: "_id",
                as: "mixWithDestination"
            }

        }
    ]).then(function(result) {
        return res.json(result);
    });

});
//Similar Package List Fetch
router.get('/morepackages/packageId/:packageId/destinationId/:destinationId', function(req, res, next) {
    var packageID = req.param('packageId');
    var destinationID = req.param('destinationId');
    console.log(destinationID);
    Packages.find({ "countryId": objectId(destinationID), "categories": "Indian Package", "_id": { $ne: objectId(packageID) }, "published": true }, function(err, packagelist) {
        if (err) {
            assert.equal(null, err);
            return;
        }
        console.warn(packagelist);
        return res.json(packagelist);
    })

});

router.get('/inquiry/package/:packageName/country/:countryName/days/:numberOfDays/userid/:id', function(req, res, next) {
    var name = req.param('packageName');
    var countryname = req.param('countryName');
    var numberofdays = req.param('numberOfDays');
    var userID = req.param('id');
    res.render('home/inquiry', { title: 'Inquiry', items: { name, countryname, numberofdays, userID } });
});

router.get('/inquiry/package/:packageName/country/:countryName/days/:numberOfDays/userid/:id#step-4', function(req, res, next) {
    var name = req.param('name');
    var countryname = req.param('countryName');
    var numberofdays = req.param('numberOfDays');
    var userID = req.param('id')
    res.render('home/inquiry', { title: 'Inquiry', items: { name, countryname, numberofdays, userID } });
});

router.get('/inquiry-modify-package/package/:packageName/country/:countryName/days/:numberOfDays/userid/:id', function(req, res, next) {
    var name = req.param('packageName');
    var countryname = req.param('countryName');
    var numberofdays = req.param('numberOfDays');
    var userID = req.param('id');
    res.render('home/inquiry-modify-package', { title: 'Modify Package', items: { name, countryname, numberofdays, userID } });
});

router.get('/inquiry-modify-package/package/:packageName/country/:countryName/days/:numberOfDays/userid/:id#step-4', function(req, res, next) {
    var name = req.param('packageName');
    var countryname = req.param('countryName');
    var numberofdays = req.param('numberOfDays');
    var userID = req.param('id');
    res.render('home/inquiry-modify-package', { title: 'Modify Package', items: { name, countryname, numberofdays, userID } });
});


router.post('/inquiry/:name', function(req, res, next) {
    /*console.warn(req.body);*/

    var newPackageInquiry = new Inquiry({
        fromDate: req.body.fromdate,
        toDate: req.body.todate,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        packageCreatorID: req.body.packageCreatorID,
        totalRooms: req.body.numberOfRooms,
        accomodationDetails: req.body.accomodationDetails,
        emailID: req.body.emailid,
        phoneNumber: req.body.phonenumber,
        countryName: req.body.countryname,
        inquiryRemark: req.body.inquiryText,
        inquiryType: req.body.inquirytype,
        inquiryDate: req.body.datetime,
        promoCode: req.body.promocode,
        packageName: req.body.packagename,
        inquiryStatus: req.body.inquiryStatus,
        bookingId: req.body.bookingId,
        hotelModificationRequest: req.body.hotelmodifyrequest,
        packageDurationModificationRequest: req.body.packagemodifyduration,
        extraServiceRequest: req.body.packageaddservices
    });
    /*console.warn(newInquiry);*/
    newPackageInquiry.save(function(err, result) {
        /* console.warn(err); */
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                var message = { message: 'Places already exist!' };
                return res.status(500).render('home/inquiry', { title: 'New Package Inquery', errors: message });
            }

            // Some other error
            return res.status(500).send(err);
        }
        //assert.equal(null, err);
        return res.json(result);

    });

    // res.render('home/inquiry', { title: 'Inquiry', data: name });
});

//Place Details aggregate result 
router.get('/place/:id/countryid/:countryId', function(req, res, next) {
    Places.aggregate([
        { "$match": { "_id": objectId(req.params.id) } },
        {
            "$lookup": {
                from: "destinations",
                localField: "countryId",
                foreignField: "_id",
                as: "mixWithPlaceDestination"
            }
        },
        {
            "$unwind": {
                path: "$mixWithPlaceDestination",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).then(function(placeDetails) {
        res.render('home/place', {
            title: 'Place',
            items: placeDetails,
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
                counter: function(index) {
                    return index + 1;
                },
                index_of: function(context, ndx) {
                    return context[ndx];
                }
            }
        });
    });
});


//Package Details aggregate result  (OR) Get Package
router.get('/package/:id/placeid/:countryId', function(req, res, next) {
    console.warn(req.params);

    Packages.aggregate([
        { "$match": { "_id": objectId(req.params.id) } },
        {
            "$lookup": {
                from: "destinations",
                localField: "countryId",
                foreignField: "_id",
                as: "mixWithDestination"
            }

        }
    ]).then(function(resultDestination) {
        /*console.warn(req.params.countryId);*/

        res.render('home/package-details', {
            title: 'Thailand|Packages',
            items: {
                destination: resultDestination
            },
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
                counter: function(index) {
                    return index + 1;
                },
                index_of: function(context, ndx) {
                    return context[ndx];
                }
            }
        });
    });
});

//Subscribe Post Method
router.post('/', function(req, res, next) {
    /* req.checkBody('email', 'Email Id Required').isEmail();*/

    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        res.render('home/index', { title: 'Subscribers', errors: messages });
    } else {
        Subscribe.findOne({ email: req.body.emailID }, function(err, subscriber) {
            /*console.warn(req.body.emailID);*/
            if (subscriber) {
                res.render('home/index', { title: 'Subscribers', message: "Email Already Exists" });
                return true;
            }
            var newSubscribe = new Subscribe({
                email: req.body.emailID
            });
            newSubscribe.save(function(err, result) {
                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        var message = { message: 'Email Already Exists' };
                        return res.status(500).render('home/index', { title: 'Subscribers', errors: message });
                    }

                    // Some other error
                    return res.status(200).send(message);
                }
                assert.equal(null, err);
                /*res.render('home/index', { title: 'Subscribers', message: err });*/
                return res.json(result);
            });

        });
    }
});
//Package Rate Table
router.get('/packageprice/:id', function(req, res, next) {
    /*console.warn(req.params.id);*/
    PacakheRoomoccupancies.find({ packageid: objectId(req.params.id) }, function(err, packageprice) {
        if (err) {
            assert.equal(null, err);
            return;
        } else {
            return res.json(packageprice);
            /*console.warn(packageprice);*/
        }
    });
});

//Package Itinarary and accomodations
router.get('/placedetails/:id', function(req, res, next) {
    /* console.log(req.body); */
    Packages.aggregate([
        { "$match": { "published": true, "placename": objectId(req.params.id) } },
        {
            "$lookup": {
                from: "packageaccomodations",
                localField: "_id",
                foreignField: "packageid",
                as: "mixWithAccomodation"
            }

        },
        {
            "$unwind": {
                path: "$mixWithAccomodation",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            "$lookup": {
                from: "packageroomoccupancies",
                localField: "_id",
                foreignField: "packageid",
                as: "mixWithOccupancies"
            }
        },
        {
            "$unwind": {
                path: "$mixWithOccupancies",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).then(function(allPackagesPlace) {
        return res.json(allPackagesPlace);
    });
});


//Package Itinarary and accomodations
router.get('/packagedetails/:id', function(req, res, next) {

    Packages.find({ _id: objectId(req.params.id) }, function(err, packagedetails) {
        PackageAccomodations.aggregate([
            { "$match": { "packageid": objectId(req.params.id) } },

            {
                "$unwind": "$accomodation"
            },
            {
                "$unwind": "$accomodation.options"
            },
            {
                "$lookup": {
                    from: "accomodations",
                    localField: "accomodation.options.hotelid",
                    foreignField: "_id",
                    as: "mixWithAccomodations"
                }
            },
            {
                "$unwind": "$mixWithAccomodations",
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        optionName: '$accomodation.optionName',
                        'hotelname': '$mixWithAccomodations.hotelname',
                        'hotelId': '$mixWithAccomodations._id',
                        'day': '$accomodation.options.day'
                    }
                    /*,
                                         options: {
                                         $push: {
                                         'option': '$accomodation.accomodation.optionName',
                                         'hotelname': '$mixWithAccomodations.hotelname',
                                         'hotel': '$mixWithAccomodations',
                                         'hotelId': '$mixWithAccomodations.id'
                                         }
                                         }*/
                }
            }
        ]).then(function(allAccomodations) {
            packagedetails.push(allAccomodations);

            /* console.warn(packagedetails);*/
            return res.json(packagedetails);
        });

    })

});


//Inquiry Country Post Method
router.post('/country/:id', function(req, res, next) {
    /*console.warn(req.body);*/

    var newInquiry = new Inquiry({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        emailId: req.body.emailIid,
        phoneNumber: req.body.phonenumber,
        countryName: req.body.countryName,
        inquiryRemark: req.body.inquiryText,
        fromPage: req.body.fromPageName,
        inquiryType: req.body.inquiryType,
        inquiryStatus: req.body.inquiryStatus
    });
    /*console.warn(newInquiry);*/
    newInquiry.save(function(err, resultCountry) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                var message = { message: 'Places already exist!' };
                return res.status(500).render('home/country/:id', { title: 'New Inquery', errors: message });
            }
            // Some other error
            return res.status(500).send(err);
        }
        //assert.equal(null, err);
        return res.json(resultCountry);
    });
});



hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

hbs.registerHelper('breaklines', function(text) {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
});
hbs.registerHelper('list', function(context, options) {
    return "<ul>" + context.map(function(item) {
        return "<li>" + options.fn(item) + "</li>";
    }).join("\n") + "</ul>";
});

hbs.registerHelper('chain', function() {
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
});
module.exports = router;