import express from 'express';

const <%= routeGrp %>Router = express.Router();

<%= routes %>

export default <%= routeGrp %>Router;