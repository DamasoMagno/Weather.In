const body = document.querySelector("body");
const input = document.querySelector("input");
const search = document.querySelector(".search");
const cityInfo = document.getElementById("city");
const closeModal = document.querySelector(".close-modal");

let cityWeatherProps;
let leafletMap = L.map('map');
let cityProps;
let cities = [];

if(!localStorage.getItem("alert")){
  alert("Clique na imagem para acessar o mapa da cidade");
  localStorage.setItem("alert", true);
}

function renderImage(imageURL){
  return `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${imageURL})`;
}

const SearchCity = {
  async showCity(){
    if(!input.value) {
      input.style.border= "1px solid red";
      return;
    };

    await axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=548bd378&city_name=${input.value}&locale=pt`)
    .then( response => {
      const { data } = response;
      if(data.results.city_name === input.value){
        cityWeatherProps = data.results
        input.style.border = "1px solid rgba(0,0,0,0.1)";
      } else {
        alert("Cidade não cadastrada no sistema");
      }
    });

    await axios.get(`https://city-weather-api.herokuapp.com/place-details?input=${cityWeatherProps.city}`)
    .then(response => {
      cityProps = response.data
    });

    cityInfo.style.background = renderImage(cityProps.imageURL);

    DOM.updateDegress();
    Modal.showMap();
  },
}

const DOM = {
  degress: document.querySelector(".degress"),
  region: document.querySelector(".region"), 
  image: document.querySelector(".dayOrNight"),

  updateDegress(){
    DOM.degress.innerHTML = `${cityWeatherProps.temp}º`;
    DOM.region.innerHTML = `${cityWeatherProps.city}`;
    DOM.image.src = `assets/${cityWeatherProps.currently}.png`;
  }
}

const Modal = {
  modal: document.querySelector(".modal-overlay"),

  toggleModal(){
    Modal.modal.classList.toggle("active");
  },

  reloadMyMap(){
    let mymap = cityProps ?
    leafletMap.setView([cityProps.coordinates.lat, cityProps.coordinates.lng], 15) : 
    leafletMap.setView([-23.1697205, -47.1473495], 11);

    return mymap;
  },

  showMap(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZGFtYXNvbWFnbm8iLCJhIjoiY2tnNnh4OHIzMDIwYjJwbndjZXJwdzJlYiJ9.kVuWDJS8DvJgmtDyqr1ujQ'
    }).addTo(Modal.reloadMyMap());
  },
}

Modal.showMap();

search.addEventListener("click", SearchCity.showCity);
cityInfo.addEventListener("click", Modal.toggleModal);
closeModal.addEventListener("click", Modal.toggleModal);