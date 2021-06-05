var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,    
    priority: {
        type: String,
        default: 'user'
    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Liked',
            autopopulate: true
        }
    ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);