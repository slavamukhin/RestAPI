const mongoose = require('../mongoose');

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'email is require',
        enique: true,
        validate: [{
            validator: function checkEmail(value) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
            },
            msg: 'Enter correct email, please'
        }],
        lowercase: true,
        trim: true
    }
}, {
    timestamp: true
});

module.exports = mongoose.model('Users', usersSchema);