var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    picture: {
        type: String,
        default: '/images/user/default.JPG'
    },
    priority: {
        type: String,
        default: 'user'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Liked',
            autopopulate: true
        }
    ],
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('user', UserSchema);