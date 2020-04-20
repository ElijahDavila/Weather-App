const searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('keypress', function(event) {setQuery(event)});

function setQuery(event) {
    if (event.key == 'Enter') {
        getResults(searchBox.value);
    }
}

function getResults (query) {
    fetch(api.openweathermap.org/data/2.5/weather?zip={query}&appid:'614b59449e1c83ffbaf3d20d68215351')
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}


function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = '${weather.name}, ${weather.sys.country}';

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = '${Math.round(weather.main.temp)}<span>ºF</span>';

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hiLo = document.querySelector('.hiLo');
    hiLo.innerText = '${Math.round(weather.main,temp_min)}ºF / ${Math.round(weather.main.temp_max)}ºF';
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return '${day} ${date} ${month} ${year}';
}