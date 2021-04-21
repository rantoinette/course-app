const express = require('express');
const route = express.Router();

const Controller = require('../controllers/controller');

route.get('/', Controller.getProfile);
route.get('/classes', Controller.getRegisteredClasses);
route.get('/classes/:id/edit', Controller.getEditClass);
route.post('/classes/:id/edit', Controller.postEditClass);
route.get('/classes/:id/drop', Controller.dropClass);

module.exports = route;