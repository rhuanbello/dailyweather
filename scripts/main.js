const initSearch = () => {
    const inputSearch = document.querySelector('.search-container .input-search')
    const btnSearchTerm = document.querySelector('.search-container .search-btn.term')

    const search = () => {
        let searchTerm = inputSearch.value
        let btn = btnSearchTerm 
        
        if (searchTerm) {
            btn.setAttribute('href', `https://www.google.de/search?q=${searchTerm}`)
            btn.setAttribute('target', '_blank')
        } else {
            btn.setAttribute('href', '')
            btn.setAttribute('target', '')
        }
        
    }

    btnSearchTerm.addEventListener('click', search)

    // Se pressionar enter e houver valor no input
    document.addEventListener('keydown', (e) => {
        if(e.key === "Enter" && inputSearch.value) {
           btnSearchTerm.click()
        }
    });

}

initSearch()

const initChooseInput = () => {
    const inputLocation = document.querySelector('.search-container .input-location')
    const inputSearch = document.querySelector('.search-container .input-search')
    const btnChangeInputToLocation = document.querySelector('.search-container .btn-location')
    const btnChangeInputToSearch = document.querySelector('.search-container .btn-search')
    const btnSearchTerm = document.querySelector('.search-container .search-btn.term')
    const btnSearchLocation = document.querySelector('.search-container .search-btn.location')
    const btnChange = document.querySelectorAll('.search-container .search-options .change')

    const changeInputToLocation = () => {
        inputLocation.classList.toggle('hidden');
        inputSearch.classList.toggle('hidden');
        btnSearchLocation.classList.toggle('hidden')
        btnSearchTerm.classList.toggle('hidden')
        btnChangeInputToLocation.classList.toggle('active')
        btnChangeInputToSearch.classList.toggle('active')
        inputSearch.value = ''
        inputLocation.value = ''
    }


    btnChange.forEach(btn => {
        btn.addEventListener('click', changeInputToLocation)

    })

}

initChooseInput()

const initAside = () => {
    const aside = document.querySelector('.main-home .aside-forecast')
    const footer = document.querySelector('.main-home .footer-home')
    const openAside = document.querySelector('.footer-home .open-aside')
    const closeAside = document.querySelector('.aside-forecast .close-aside')
    const marquee = document.querySelector('.aside-forecast header marquee')

    const open = () => {
        footer.classList.add('hidden')
        aside.classList.remove('hidden')
        aside.classList.remove('down')
        marquee.start()
    }

    openAside.addEventListener('click', open)

    const close = () => {
        footer.classList.remove('hidden')
        aside.classList.add('down')

        const closing = () => {
            aside.classList.add('hidden')
        }

        setTimeout(closing, 700)

    }

    closeAside.addEventListener('click', close)

}

initAside()

const initDate = () => {
    const time = document.querySelector('.weather-description .container .time')
    const date = document.querySelector('.weather-description .container .date')
 
    setInterval(() => {
        moment.locale('pt-br')
        time.innerHTML = moment().format('LT')
        date.innerHTML = moment().format('ddd, D [de] MMM [de] YYYY');
    
    }, 1000)
   
}

initDate()

const initWeather = () => {
    const weatherTemperature = document.querySelector('.footer-home .weather-temperature')
    const cityName = document.querySelector('.footer-home .city-name')
    const weatherDetails = document.querySelector('.footer-home .weather-description .weather-details')
    const weatherIcon = document.querySelector('.footer-home .weather-description .icon')
    const weatherForecast = document.querySelector('.aside-forecast .weatherForecast')
    const inputSearch = document.querySelector('.search-bar .input-location')
    const sendInput = document.querySelector('.search-bar .search-btn.location')

    const API_KEY = 'e63937237298849235ab5f63a0eb5974'
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?'

    const getWeatherByLocalStorage = () => {
        let lat = localStorage.getItem('lat')
        let lon = localStorage.getItem('lon')
        let citieName = localStorage.getItem('citieName')
        
        fetch(`${BASE_URL}lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(response => response.json()).then(data => {
            showWeatherData(data)
            cityName.innerHTML = citieName
        })
        
    }
    
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

    if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
        getWeatherByLocalStorage()

    } else {
        getWeatherData()

    }

    const searchCitieWeather = () => {
        // getting the value of the user input and putting it as a lowercase word, to match with the city name of the api
        let cityNameInput = inputSearch.value.toLowerCase()
            
            // ONLY BR Countries JSON File =  https://rhuanbello-citylist.s3.sa-east-1.amazonaws.com/cities.json
            fetch('https://rhuanbello-citylist.s3.sa-east-1.amazonaws.com/citylist.json')
            .then(response => response.json())
            .then(list => {
                list.forEach(citie => {
                    if (citie.name.toLowerCase() === cityNameInput) {
                        
                        localStorage.setItem('lat', citie.coord.lat)
                        localStorage.setItem('lon', citie.coord.lon)
                        localStorage.setItem('citieName', citie.name)

                        getWeatherByLocalStorage()

                    }
                })

            })
    
    }

    sendInput.addEventListener('click', searchCitieWeather);

    document.addEventListener('keydown', (e) => {
        if(e.key === "Enter" && inputSearch.value) {
            sendInput.click()
        }
    });

    const getBackgroundQuerie = (query) => {
        const CLIENT_ID = 'zybzCr74o7PLZJ0bezMjlG1pEsH5Q_Vm4dqNKLBe254'
        const keyword = `${query} wallpaper`
        const randomIndex = Math.floor(Math.random() * 5) 

        fetch(`https://api.unsplash.com/search/photos?query=${keyword}&order_by=relevant&page=1&orientation=landscape&client_id=${CLIENT_ID}`)
        .then(response => response.json()).then(data => {
            let imgUrl = data.results[randomIndex].urls.regular

            changeBackground(imgUrl)
        })

    }

    const changeBackground = (imgUrl) => {
        const mainHome = document.querySelector('.main-home')
        mainHome.style.background = `url('${imgUrl}') no-repeat center center`;
        mainHome.style.backgroundSize = "cover";

    }

    const showWeatherData = (data) => {
        let {humidity, wind_speed, weather, temp} = data.current 

        // Search Image by Weather Description
        // Setting The Weather Description of Current Data to LocalStorage
        localStorage.setItem('weatherDescription', weather[0].description)
        // Sending the value of Local Storage to the function responsible to send the request of the background image
        getBackgroundQuerie(localStorage.getItem('weatherDescription'))
        
        cityName.innerHTML = data.timezone;
        
        let otherDayForecast = '';

        data.daily.forEach((item, index) => {
            
            if(index == 0) {
                weatherTemperature.innerHTML = `${Math.round(temp)}°`
                weatherIcon.innerHTML = `<img class="weather-icon" src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="">`
                weatherDetails.innerHTML = 
                `
                    <div class="wind container">
                        <img src="assets/icons/wind-speed.svg" alt="wind-speed">
                        <span class="wind-speed">${wind_speed} mh/s</span>
                    </div>
                    <div class="humidity container">
                        <img src="assets/icons/humidity.svg" alt="humidity">
                        <span class="humidity">${humidity}%</span>
                    </div>
                    <div class="temperature container">
                        <img src="assets/icons/weather.svg" alt="weather">
                        <span class="temperature">${weather[0].main}</span>
                    </div>
                    <div class="max-temp container">
                        <img src="assets/icons/max-temp.svg" alt="max-temp">
                        <span class="max-temp">${Math.round(item.temp.max)}°</span>
                    </div>
                    <div class="min-temp container">
                        <img src="assets/icons/min-temp.svg" alt="min-temp">
                        <span class="min-temp">${Math.round(item.temp.min)}°</span>
                    </div>
                
                `
            } 
            else {
                otherDayForecast += 
                `
                    <div class="box">
                        <p>${window.moment(item.dt * 1000).locale('pt-BR').format('ddd, D [de] MMM')}</p>
                        <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="">
                        <p>${Math.round((item.temp.day))}°</p>
                    </div>

                `
            }

        })

        weatherForecast.innerHTML = otherDayForecast; 
    }
}

initWeather()