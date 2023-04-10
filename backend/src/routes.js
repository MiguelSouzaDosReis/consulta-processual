const express = require('express');
const routes = express.Router()
const lawController = require('./controller/lawController')

routes.get('/search/:lawsuit', lawController.readOne)

module.exports = routes