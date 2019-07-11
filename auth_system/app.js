const express = require('express');
const control = require('./js/Control');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/resources', express.static(__dirname + '/resources'));

app.get(['/', '/login'], (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/login', (req, res) => {
    control.login(req.body, (result) => {
        res.render('login', {body: result});
    });
});
app.post('/register', (req, res) => {
    control.register(req.body, (result) => {
        res.render('register', {body: result});
    });
});

app.listen(1100);