const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '') {
        showError('El campo es obligatorio');
        return;
    }

    callAPI(nameCity.value);
    
})

function callAPI(city){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max, humidity, pressure}, weather:[arr], wind:{speed}} = data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);
    const hum = humidity;
    const pres = pressure;
    const spe = speed;
    
    

    const content = document.createElement('div');
    content.innerHTML = `
        
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">        
    <h2>${degrees}°C</h2>  
      <div class="clima">  
        <p>Mínima: <span class="inf"> ${min}°C</span></p>     
        <p>Máxima para hoy: <span class="inf">${max}°C</span></p>
        <p>Humedad: <span class="inf">${hum}°%</span></p>
        <p>Presión: <span class="inf">${pres} Hectopascales</span></p>
        <p>Viento: <span class="inf">${spe} M/S</span></p>
      </div>  
    `;

    result.appendChild(content);

   
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
