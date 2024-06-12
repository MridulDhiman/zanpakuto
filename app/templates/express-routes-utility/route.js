const express = require('express');

const <%= routeGrp %>Router = express.Router();

<%= routes %>

module.exports = <%= routeGrp %>Router;