$(document).ready(() => {

    function valid(value) {
        if (value == '') {
            return undefined;
        }
        return true;
    }

    $("#register-button").click(() => {

        let inputs = {
            student_num: document.querySelector('#student_num').value,
            name: document.querySelector('#name').value,
            surname: document.querySelector('#surname').value,
            age: document.querySelector('#age').value,
            degree: document.querySelector('#degree').value,
            fav_course: document.querySelector('#fav_course').value,
            password: document.querySelector('#password').value,
            confPassword: document.querySelector('#confPassword').value
        };

        console.log(inputs);
        if (!valid(inputs.student_num)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.name)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.surname)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.age)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.degree)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.fav_course)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.password)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.confPassword)) { alert('Please complete all fields'); return; }

        if (inputs.age < 0) {
            alert('You cannot have a negative age');
            return;
        }

        if (inputs.password != inputs.confPassword) {
            alert('Passwords do not match');
            return;
        }

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4) {
                    if (xhttp.status == 201) {
                        alert('registered successfully');
                        if (xhttp.responseURL != this.location) {
                            location = xhttp.responseURL;
                        }
                    }
                    else
                    alert('failed to register user');
                }
            }
        };
        xhttp.open('POST', 'register', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(inputs));

        
    });

    $('#login-button').click(() => {
        let inputs = {
            student_num: document.querySelector('#student_num').value,
            password: document.querySelector('#password').value
        };

        if (inputs.student_num == '' || inputs.password == '') {
            alert('Please input username and password');
            return;
        }

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4){
                if (xhttp.status == 200) alert('Login credentials invalid');
                if (window.location != xhttp.responseURL)
                        window.location = xhttp.responseURL;
            }
        }
        xhttp.open('POST', '/login', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        console.log(JSON.stringify(inputs));
        xhttp.send(JSON.stringify(inputs));

    });

    $('#save-button').click(() => {

        let inputs = {
            student_num: document.querySelector('#student_num').innerHTML,
            name: document.querySelector('#name').value,
            surname: document.querySelector('#surname').value,
            age: document.querySelector('#age').value,
            degree: document.querySelector('#degree').value,
            fav_course: document.querySelector('#fav_course').value
        };

        if (!valid(inputs.name)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.surname)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.age)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.degree)) { alert('Please complete all fields'); return; }
        if (!valid(inputs.fav_course)) { alert('Please complete all fields'); return; }

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 201) {
                try { var response = JSON.parse(xhttp.response); }
                catch (error){
                    console.error("couldn't understand response");
                }

                alert('Changes successfully changed');
            } else if (xhttp.readyState == 4){
                alert('failed to save changes');
            }
        };
        xhttp.open('POST', '/manage-profile', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        console.log(JSON.stringify(inputs));
        xhttp.send(JSON.stringify(inputs));

    });


    $('#logout-button').click(() => {
        console.log('logout');
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.responseURL != location) {
                location = xhttp.responseURL;
            }
        }
        xhttp.open('GET', '/logout', false);
        xhttp.send();
    });

});
