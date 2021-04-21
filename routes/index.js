const express = require('express');
const app = express();

const Controller = require('../controllers/controller');
const classRoutes = require('./classes');
const studentRoutes = require('./student');

// DEFINE SESSIONS HERE

app.get('/', Controller.homepage);
app.get('/register', Controller.getRegister);
app.post('/register', Controller.postRegister);
app.get('/login', Controller.getLogin);
app.post('/login', Controller.postLogin);
app.get('/logout', Controller.logout);
app.use('/classes', classRoutes);
app.use('/student', studentRoutes);

module.exports = app;