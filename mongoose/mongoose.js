const mongoose = require('mongoose');
const beautifulUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.plugin(beautifulUnique);
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

module.exports = mongoose;