var express = require('express');
var router = express.Router();

// Module imported
// var connection = require('../config/connection');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/phonebook');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: { type: String, required: true },
    company: String,
    phone: [],
    email: [],
    group: String,
    url: []
}, { collection: 'contacts' });

var contactCollection = mongoose.model('contact', contactSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
    var contact = {
        name: 'Jatin Kumar',
        company: 'Happiest Minds',
        phone: [
            { type: 'personal', value: '9776325098' },
            { type: 'home', value: '9776325098' }
        ],
        email: [
            { type: 'home', value: 'jat@ymail.com' },
            { type: 'business', value: 'jat@hm.com' }
        ],
        group: 'home',
        url: [
            { type: 'fb', value: 'www.fb.com/jatin' }
        ]
    };
    console.log("Data submitted" + contact.name);
    var data = new contactCollection(contact);
    data.save();
    res.render('index', { title: 'Phonebook App' });
});

module.exports = router;