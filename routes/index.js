const express = require('express');
const app = express();

const Controller = require('../controllers/controller');
const classRoutes = require('./classes');
const studentRoutes = require('./student');

// DEFINE SESSIONS HERE
const session = require('express-session');

// NON-SESSION ENABLED ROUTES
app.get('/', Controller.homepage);
app.get('/register', Controller.getRegister);
app.post('/register', Controller.postRegister);
app.get('/login', Controller.getLogin);

// ENABLE SESSION HERE
app.use(session({
    secret: 'course-app-session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 8 * 60 * 60 * 1000
    }
}))

// SESSION ENABLED ROUTES
app.post('/login', Controller.postLogin);
app.get('/logout', Controller.logout);
app.use('/classes', classRoutes);
app.use('/student', studentRoutes);

module.exports = app;