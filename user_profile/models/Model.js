const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    student_num: String, //TODO make this pk
    name: String,
    surname: String,
    age: Number, //ensure it is greater than 0
    degree: String,
    fav_course: String,
    password: String, //implement sha256 if desired
    modified_date: {
        type: Date, 
        default: Date.now
    }
});

exports.UserModel = mongoose.model('user', UserSchema);
