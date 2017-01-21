var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
    studName: { type: String, required: true },
    studRoll: String,
    perAddr: String
}, { collection: 'user-data' });

var Collection = mongoose.model('Collection', collectionSchema);