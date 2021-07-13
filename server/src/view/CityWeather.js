const { getImage } = require("../services/FormatImagesService");
const { getLocaleCity } = require("../services/GetLocaleOfCityService");

module.exports = {
  async cityWatherDataFormatted(page, city){
    const imageInformations = await getImage(page);
    const localCity = await getLocaleCity(city);
    
    const result = {
      ...imageInformations,
      coordinates: localCity.coordinates,
      location: localCity.location
    }
    
    return result;
  }
}
