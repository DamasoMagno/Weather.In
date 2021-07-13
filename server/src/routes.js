const { Router } = require("express");
const routes = Router();

const cityWeatherController = require("./controller/ListInformationsCity");

routes.get("/", cityWeatherController.listInformationsCityLocation);

module.exports = routes;