const express = require('express');
const auth_control = require('./server_resources/auth_control');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/resources', express.static(__dirname + '/resources'));

app.get('/register', (request, response) => {
    response.status(200);
    response.set({'Content-Type': 'text/html'});
    response.render('register');
});

app.get(['/login', '/'], (request, response) => {
    response.status(200);
    response.set({'Content-Type': 'text/html'});
    response.render('login');
});

app.post('/register/submit', (request, response) => {
    console.log('sent '+request.body);
    var objMsg = auth_control.register(request.body);
    response.status(Number.parseInt(objMsg.code));
    response.set({'Content-Type': 'application/json'});
    response.json(objMsg);//needs to be controled with jquery
});

app.listen(3310);