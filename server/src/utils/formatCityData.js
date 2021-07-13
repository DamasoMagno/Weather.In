module.exports = {
  formatCityData(response){
    let cities = response.map((city) => {
      return {
        coordinates: {
          lat: city.lat, 
          long: city.lon 
        },
        location: { 
          city: city.address.city, 
          country: city.address.country,
          state: city.address.state
        }
      }
    });
  
    return cities[0];
  }
}
