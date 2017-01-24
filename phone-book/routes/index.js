var express = require('express');
var router = express.Router();

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

router.post('/contact/save', function(req, res, next) {
    var name = req.body.name;
    var company = req.body.company;

    var phone = [];
    console.log(phone);
    req.body.phoneType.forEach(function(e, i, a) {
        var phoneDetails = {
            type: req.body.phoneType[i],
            value: req.body.phonenNumber[i]
        };
        console.log(phoneDetails);
        phone.push(phoneDetails);
    });
    console.log(phone);
    return;

    var email = [];
    req.body.emailType.forEach(function(e, i, a) {
        var emailDetails = {
            type: req.body.emailType[i],
            value: req.body.emailAddress[i]
        };
        email.push(emailDetails);
    });

    var group = req.body.group;


    var contact = {
        name: name,
        company: company,
        phone: phone,
        email: email,
        group: group
    };
    console.log("data submitted" + contact);
    // var data = new contactModel(contact);
    // data.save();
    res.redirect('/');
});
module.exports = router;