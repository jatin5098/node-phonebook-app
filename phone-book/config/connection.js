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

var contactModel = function() {

}