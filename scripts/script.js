const currentWeatherItems = document.querySelector('.current-info .others')

const timeZone = document.querySelector('.place .time-zone')
const country = document.querySelector('.place .country')

const currentTemperature = document.querySelector('.future-forecast .today')
const weatherForecast = document.querySelector('.future-forecast .weather-forecast')

const monthsBR = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const daysBR = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

const initDate = () => {
    const time = document.querySelector('.current-info .time')
    const date = document.querySelector('.current-info .date')
 

    setInterval(() => {
        const jsTime = new Date();
        const jsMonth = jsTime.getMonth()
        const jsDate = jsTime.getDate()
        const jsDay = jsTime.getDay()
        const jsHours = jsTime.getHours()
        let jsMinutes = jsTime.getMinutes()

        // if minutes is under 10, getMinutes() will only add one number, so:
        let minutes = jsMinutes < 10 ? ('0' + jsMinutes) : (jsMinutes)
       
        time.innerHTML = jsHours + ':' + minutes
        date.innerHTML = `${daysBR[jsDay]}, ${jsDate} de ${monthsBR[jsMonth]}`
    
    }, 1000)
   
}

const userInput = document.querySelector('.inputCity')
const sendInput = document.querySelector('.sendInput')

const initWeather = () => {
    const API_KEY = 'e63937237298849235ab5f63a0eb5974'
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

    const getWeatherData = () => {
        
        navigator.geolocation.getCurrentPosition((success) => {
        
            let {latitude, longitude} = success.coords

            fetch(`${BASE_URL}lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(response => response.json()).then(data => {

                showWeatherData(data)
            })

        }, 
        // Default
        () => {
            fetch(`${BASE_URL}lat=${-23.547501}&lon=${-46.636108}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
            .then(response => response.json()).then(data => {

                showWeatherData(data)
            })

        })
    }

    getWeatherData()

    const searchCitieWeather = () => {
        sendInput.addEventListener('click', () => {
            let cityName = userInput.value

                fetch('https://rhuanbello-citylist.s3.sa-east-1.amazonaws.com/cities.json')
                .then(response => response.json())
                .then(list => {
                    const cities = list.filter(item => {
                        return item.country == "BR"
                    })

                    cities.forEach(citie => {
                        if (citie.name == cityName) {

                            let {lat, lon} = citie.coord

                            console.log(citie)
                            
                            fetch(`${BASE_URL}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
                            .then(response => response.json()).then(data => {
                                showWeatherData(data)
                                console.log(data)
                                timeZone.innerHTML = citie.name
                            })
                        }
                    })

                })

        })
      

    }

    searchCitieWeather()

    const changeBackgroundByWeather = () => {
        const API_UNP = 'zybzCr74o7PLZJ0bezMjlG1pEsH5Q_Vm4dqNKLBe254'
    
        fetch(`https://api.unplash.com/search/photos?query=clouds&client_id=${API_UNP}`)
        .then(response => response.json()).then(data => {
            console.log(data)

        })


    }

    changeBackgroundByWeather()

    const showWeatherData = (data) => {
        let {humidity, pressure, sunrise, sunset, wind_speed, weather} = data.current 

        console.log(weather[0].description)

        timeZone.innerHTML = data.timezone;
        country.innerHTML = data.lat + 'N ' + data.lon+'E'

        currentWeatherItems.innerHTML = 
       `<div class="weather-item">
            <p>Umidade</p>
            <p>${humidity}%</p>
        </div>
        <div class="weather-item">
            <p>Pressão</p>
            <p>${pressure} hnPA</p>
        </div>
        <div class="weather-item">
           <p>Velocidade do Vento</p>
           <p>${wind_speed} km/h</p>
        </div>
        <div class="weather-item">
           <p>Amanhecer</p>
           <p>${window.moment(sunrise * 1000).format('HH:mm')}</p>
        </div>
        <div class="weather-item">
           <p>Pôr-do-sol</p>
           <p>${window.moment(sunset * 1000).format('HH:mm')}</p>
        </div>`;

        // 

        let otherDayForecast = '';

        data.daily.forEach((item, index) => {
            
            if(index == 0) {
                currentTemperature.innerHTML = `
                <div class="content">
                    <div class="day">Hoje, ${window.moment(item.dt * 1000).locale('pt-BR').format('D [de] MMM')}</div>
                    <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="" class="w-icon">
                    <div class="temp">Dia - ${Math.round((item.temp.day))} °C</div>
                    <div class="temp">Noite - ${Math.round((item.temp.night))} °C</div>
                </div>
                
                `
            } else {
                otherDayForecast += `
                <div class="weather-forecast-item">
                    <div class="day">${window.moment(item.dt * 1000).locale('pt-BR').format('ddd, D [de] MMM')}</div>
                    <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="" class="w-icon">
                    <div class="temp">Dia - ${Math.round((item.temp.day))} °C</div>
                    <div class="temp">Noite - ${Math.round((item.temp.night))} °C</div>
                </div>
                `
            }

        })

        weatherForecast.innerHTML = otherDayForecast; 
    }

}

initDate()
initWeather()