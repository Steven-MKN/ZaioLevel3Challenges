const Model = require('../models/Model');
const bcrytp = require('bcrypt');
const saltRounds = 10;

exports.register = (body = {}, callBack) => {

    let status = 400;

    bcrytp.hash(body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            callBack(status);
        } else {
            let user = new Model.UserModel({
                student_num: body.student_num,
                name: body.name,
                surname: body.surname,
                age: body.age, 
                degree: body.degree,
                fav_course: body.fav_course,
                password: hash
            });
        
            user.save().then((err) => {
                if ('error!!!', err){
                    console.log(err);
                    status = 200;
                } 
                status = 201;
                console.log(status);
                callBack(status);
        
            });
        }
    });    
}

exports.updateProfile = (body = {}, callback) => {

    let status = 200;

    Model.UserModel.updateOne({student_num : body.student_num}, 
        {
            name: body.name,
            surname: body.surname,
            age: body.age,
            degree: body.degree,
            fav_course: body.fav_course 
        }).then((result) => {
            console.log(result);
            if (result && result.nModified == 1){
                status = 201;
            } else if (result && result.n == 1){
                status = 201;
            }
            callback(status);
        });
}

exports.login = (body = {}, callback) => {

    let status = 200; 

    console.log(body);

    Model.UserModel.findOne({ 
        student_num : body.student_num
    }).then((result) => {
        if (result) {
            bcrytp.compare(body.password, result.password, (err, res) => {
                if (err) {
                    console.log(err);
                    status = 501;
                }
                else if (res) status = 201;

                console.log(result);
                callback(result, status);
            });
            
        } else{
            callback({}, 401);
        }
        
    })
    .catch((err) => {
        callback({}, 501);
    });
}