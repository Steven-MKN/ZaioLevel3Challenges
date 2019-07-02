var array = [];

exports.register = (body) => {
    var returnObj = {};
    //check password match
    if (body.inpPassword == body.inpConfPassword){
        returnObj.code = 201;
        returnObj.message = "Successfully registered";

        array[0] = body.inpName;
        array[1] = body.inpSurname;
        array[2] = body.inpAge;
        array[3] = body.inpEmail;
        array[4] = body.inpPassword;
        array[5] = body.inpConfPassword;
        console.log(array);

    } else {
        returnObj.code = 200;
        returnObj.message = "Passwords do not match";
    }

    return returnObj;
}