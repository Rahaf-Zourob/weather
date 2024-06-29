const apiKey = '6fe79224be0858d5cc85b5810d346b0f'
let city = ''
let weatherInfo = {
    isLoading: false,
    error: false,
    temp: '',
    cityName: '',
    srcWeather: '',
    statusWeather: ''
}
let { isLoading, error, srcWeather, temp, statusWeather, cityName } = weatherInfo
function getCity(event) {
    city = event.target.value;
}
async function weatherNow(event) {
    event.preventDefault();
    document.querySelector('.what__city').style.display = 'none'
    isLoading = true;
    error = false;
    updateCardContent();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    isLoading = false
    if (data.cod == 200) {
        cityName = data.name
        temp = data.main.temp
        statusWeather = data.weather[0].description
        srcWeather = data.weather[0].icon
    } else { error = true }
    updateCardContent();
}

function updateCardContent() {
    if (isLoading) {
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.loading').style.display = 'block';
    } else if (error == false) {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.card_content').style.display = 'block';
        document.querySelector('.city_name').innerHTML = cityName;
        document.querySelector('.weather_temp').innerHTML = temp + '&deg;';
        document.querySelector('.weather_status').innerHTML = statusWeather;
        document.querySelector('.weather_img').innerHTML = `<img src="http://openweathermap.org/img/wn/${srcWeather}.png" alt="weather status image" />`;
    } else {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.card_content').style.display = 'none';
        document.querySelector('.error').style.display = 'block';
    }
}