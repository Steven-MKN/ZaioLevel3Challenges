const express = require('express');
const mongoose = require('mongoose');
const UserControl = require('./server_resources/UserScript');

//set-up express
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect db
mongoose.connect('mongodb://localhost/User_Profiler');
mongoose.connection.once('open', () => {
    console.log('MongoDB connection succesful');
}).on('error', (err) => {
    console.log('ERROR:\n' + err);
});

//routes
app.use('/resources', express.static(__dirname + '/resources'), function (req, res, next) {
    console.log(req.url);
    next();
});

app.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.end('./resources/spider.ico');
});

app.get(['/login', '/'], (request, response) => {
    console.log('get: ', request.url, request.ip);
    response.status(201);
    response.render('login');
});
app.post('/login', (request, response) => {
    console.log(request.url, request.ip, request.body);
    UserControl.login(request.body, (result, status) => {
        console.log(result, status);
        if (status == 201) {
            let queryString = `?student_num=${result.student_num}&name=${result.name}&surname=${result.surname}&age=${result.age}&degree=${result.degree}&fav_course=${result.fav_course}`.replace(' ', '%20');
            response.redirect('/manage-profile'+queryString);
        } else {
            response.status(status).end(result);
        }
        
    });
    
});

app.get('/register', (request, response) => {
    console.log(request.url, request.ip);
    response.status(200);
    response.render('register');
});
app.post('/register', (request, response) => {
    console.log(request.url, request.ip, request.body);
    UserControl.register(request.body, (status) => {
        if (status == 201) response.redirect('/login');
        else response.status(status).end();
    });
    
});


app.get('/manage-profile', (request, response) => {
    console.log(request.url, request.ip);
    response.status(201);
    response.render('manage-profile', {query: request.query});
});
app.post('/manage-profile', (request, response) => {
    console.log(request.url, request.ip, request.body);
    UserControl.updateProfile(request.body, (status) => {
        response.status(status).end();
    });
});

app.get('/logout', (request, response) => {
    console.log(request.url, request.ip);
    //TODO end session
    response.redirect('/login');
});





app.listen(3310);