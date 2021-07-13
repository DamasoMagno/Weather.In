const pupetteer = require("puppeteer");
const { cityWatherDataFormatted } = require("../view/CityWeather");

module.exports = {
  async listInformationsCityLocation(request, response){
    const { city } = request.query;

    if(!city) {
      return response.status(400).json({message: "No city defined"});
    }

    const searchCity = city.split(" ").join("+");

    const url = `https://www.google.com/search?q=${searchCity}&tbm=isch`;
    const browser = await pupetteer.launch({args:["--no-sandbox"]});
    const page = await browser.newPage();
    await page.goto(url);

    const cityInformation = await cityWatherDataFormatted(page,city);
    await browser.close();
    return response.json(cityInformation);
  }
}