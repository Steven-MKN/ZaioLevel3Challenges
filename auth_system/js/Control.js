exports.login = (body, callback) => {
    callback({notify: 1});
}

exports.register = (body, callback) => {
    if (body.password == body.confirm_password){
        callback({notify: 1});
    } else {
        callback({notify: 0});
    }
}