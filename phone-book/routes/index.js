var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/dp')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });
//var upload = multer({ dest: 'public/uploads/dp/' });

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/phonebook');
var Schema = mongoose.Schema;

// Module imported
var contactSchema = require('../config/connection').contactSchema(Schema);
var contactModel = mongoose.model('contact', contactSchema);;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contact-entry', { title: 'Phonebook App' });
});

// Delete contact
router.post('/contact/delete', function(req, res, next) {
    var contactId = req.body.contactId;
    console.log(contactId);
});

// Edit contact
router.get('/contact/edit/:id', function(req, res, next) {
    console.log(req.params.id);
    res.redirect('/');
});

router.get('/contact/edit', function(req, res, next) {
    res.redirect('/');
});

router.post('/contact/edit', function(req, res, next) {
    var contactId = req.body.contactId;
    var data = contactModel.findById(contactId);
    // var data = contactModel
    //     .find({ $or: [{ name: { '$regex': 'Su', '$options': 'i' } }, { 'phone.value': { '$regex': 'Su', '$options': 'i' } }] });
    data.then(function(record) {
        console.log(record);
        res.render('edit-contacts', { contacts: [record] });
    });
});

router.post('/contact/update', function(req, res, next) {
    var contactId = req.body.contactId;
    if (req.body.updateDetails == 'Delete') {
        contactModel.findByIdAndRemove(contactId).exec();
        res.redirect('/contact/all');
    }

    if (req.body.updateDetails == 'Update') {
        var name = req.body.name;
        var company = req.body.company;
        var phone = [];
        if (typeof req.body.phoneType === 'object' && req.body.phoneType.length > 1) {
            req.body.phoneType.forEach(function(e, i, a) {
                var phoneDetails = {
                    type: req.body.phoneType[i],
                    value: req.body.phoneNumber[i]
                };
                phone.push(phoneDetails);
            });
        } else {
            var phoneDetails = {
                type: req.body.phoneType,
                value: req.body.phoneNumber
            };
            phone.push(phoneDetails);
        }

        var email = [];

        if (typeof req.body.emailType === 'object' && req.body.emailType.length > 1) {
            req.body.emailType.forEach(function(e, i, a) {
                var emailDetails = {
                    type: req.body.emailType[i],
                    value: req.body.emailAddress[i]
                };
                email.push(emailDetails);
            });
        } else {
            var emailDetails = {
                type: req.body.emailType,
                value: req.body.emailAddress
            };
            email.push(emailDetails);
        }

        var group = req.body.group;

        var url = [];
        if (typeof req.body.urlType === 'object' && req.body.urlType.length > 1) {
            req.body.urlType.forEach(function(e, i, a) {
                var urlDetails = {
                    type: req.body.urlType[i],
                    value: req.body.urlAddress[i]
                };
                url.push(urlDetails);
            });
        } else {
            var urlDetails = {
                type: req.body.urlType,
                value: req.body.urlAddress
            };
            url.push(urlDetails);
        }

        var contact = {
            name: name,
            company: company,
            phone: phone,
            email: email,
            group: group,
            url: url
        };

        contactModel.update({ _id: contactId }, { $set: contact }, function() {
            res.redirect('/contact/all');
        });
    }
});

// Get all contacts
router.get('/contact/all', function(req, res, next) {
    var contacts = contactModel.find();
    contacts.then(function(record) {
        res.render('my-contacts', { contacts: record });
    });
});

// Save new contact
router.post('/contact/save', upload.any(), function(req, res, next) {
    var name = req.body.name;
    var company = req.body.company;
    var phone = [];
    if (typeof req.body.phoneType === 'object' && req.body.phoneType.length > 1) {
        req.body.phoneType.forEach(function(e, i, a) {
            var phoneDetails = {
                type: req.body.phoneType[i],
                value: req.body.phoneNumber[i]
            };
            phone.push(phoneDetails);
        });
    } else {
        var phoneDetails = {
            type: req.body.phoneType,
            value: req.body.phoneNumber
        };
        phone.push(phoneDetails);
    }

    var email = [];

    if (typeof req.body.emailType === 'object' && req.body.emailType.length > 1) {
        req.body.emailType.forEach(function(e, i, a) {
            var emailDetails = {
                type: req.body.emailType[i],
                value: req.body.emailAddress[i]
            };
            email.push(emailDetails);
        });
    } else {
        var emailDetails = {
            type: req.body.emailType,
            value: req.body.emailAddress
        };
        email.push(emailDetails);
    }

    var group = req.body.group;

    var url = [];
    if (typeof req.body.urlType === 'object' && req.body.urlType.length > 1) {
        req.body.urlType.forEach(function(e, i, a) {
            var urlDetails = {
                type: req.body.urlType[i],
                value: req.body.urlAddress[i]
            };
            url.push(urlDetails);
        });
    } else {
        var urlDetails = {
            type: req.body.urlType,
            value: req.body.urlAddress
        };
        url.push(urlDetails);
    }

    var pic = req.files[0].filename;
    console.log(pic);
    var contact = {
        name: name,
        company: company,
        phone: phone,
        email: email,
        group: group,
        url: url,
        pic: pic

    };
    console.log("data submitted" + contact);
    var data = new contactModel(contact);
    data.save();
    res.redirect('/');
});
module.exports = router;