const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    student_num: String,
    name: String,
    surname: String,
    age: Number, 
    degree: String,
    fav_course: String,
    password: String, 
    modified_date: {
        type: Date, 
        default: Date.now
    }
});

exports.UserModel = mongoose.model('user', UserSchema);
