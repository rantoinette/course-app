const express = require('express');
const route = express.Router();

const Controller = require('../controllers/controller');

route.get('/', Controller.getClassList);
route.get('/:id/register', Controller.getRegisterClass);
route.post('/:id/register', Controller.postRegisterClass);
route.get('/:id/classmates', Controller.getClassmates);

module.exports = route;