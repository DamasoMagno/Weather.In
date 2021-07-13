const openGeocoder = require("node-open-geocoder");
const { formatCityData } = require("../utils/formatCityData");

module.exports = {
  async getLocaleCity(city){
    const response = new Promise((resolve, reject) => {
      openGeocoder()
      .geocode(city)
      .end((error, res) => {
        resolve(formatCityData(res));
      });
    });

    return response;
  }
}