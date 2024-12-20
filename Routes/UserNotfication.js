const UserNotficationController = require('../Controllers/UserNotficationController');
const express = require('express');
const routes = express.Router();

routes.get('/get',UserNotficationController.get);

module.exports = routes;
// ===========================