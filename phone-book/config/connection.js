var contactSchema = function(Schema) {
    return new Schema({
        name: { type: String, required: true },
        company: String,
        phone: [],
        email: [],
        group: String,
        url: []
    }, { collection: 'contacts' });
};
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
module.exports = {
    contactSchema: contactSchema
};