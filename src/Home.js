import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import SecondaryInfo from './SecondaryInfo';
import DailyWeatherCard from './DailyWeatherCard';

import { Cloudy, Sun, CloudSun, CloudLightning, CloudFog, Haze, CloudSnow, CloudRain } from 'lucide-react';
import Hourly from './Hourly';
import NavigationTab from './NavigationTab';
import route from './images/route.png';
import home from './images/homepage.png';
import forecast from './images/forecast.png';
import analysis from './images/analysis.png';
import calendar from './images/calendar.png';
import settings from './images/settings.png';

import search from './images/search.png';
const Home = () => {
    
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyforecastData, setHourlyForecastData] = useState([]);
    const [dailyForecastData, setDailyForecastData] = useState([]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    // Handles form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchCoordinates();
    };
    const getWeatherIcon = (weather) => {
        if (!weather) return "";

        const weatherMain = weather.main;
        const weatherDescription = weather.description.toLowerCase();

        if (weatherMain=='Clear' || weatherMain=='Sunny') return <Sun color='white' className='daily-weather-icon'/>;
        if (weatherMain=='Clouds') {
            if (weatherDescription.includes("few clouds")||weatherDescription.includes("scattered clouds")){
                return <CloudSun color='white' className='daily-weather-icon'/>;
            }
            if(weatherDescription.includes("broken clouds")||weatherDescription.includes("overcast clouds")){
                return <Cloudy color='white' className='daily-weather-icon'/>;
            }

                 
        }
        if(weatherMain=='Rain') return <CloudRain color='white' className='daily-weather-icon'/>;
        if(weatherMain=='Thunderstorm') return <CloudLightning color='white' className='daily-weather-icon'/>;
        if(weatherMain=='Snow') return <CloudSnow color='white' className='daily-weather-icon'/>;
        if(weatherMain =='Mist') return <Haze color='white' className='daily-weather-icon'/>;
        if(weatherMain =='Fog') return <CloudFog color='white' className='daily-weather-icon'/>;
        return <Cloudy color='white' className='daily-weather-icon'/>;
    }

    // Fetch coordinates from city name
    const fetchCoordinates = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=88c8ec109f5f8d265b21fc7677caf154`
            );

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                fetchWeather(lat, lon);
                fetchHourlyForecast(lat, lon);
                fetchDailyForecast(lat, lon);
            } else {
                console.error("City not found");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    // Fetch current weather
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=88c8ec109f5f8d265b21fc7677caf154`
                //  `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=ce46e061fc8564e165553de6369868d3`

            );
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

   
    

    const fetchHourlyForecast = async (lat, lon) => {
        try {
            const response = await axios.get(
                 `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=6134fa762cbe820b055e164835d5986b`

            );
    
            console.log("Hourly Forecast API Response:", response.data); // Debugging
    
            const hourlyData = response.data.list
                .filter((_, index) => index % 2 === 0) // Pick every second item (6-hour intervals)
                .slice(0, 12) // Only keep 12 data points
                .map((item) => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // 24-hour format
                    }),
                    icon: getWeatherIcon(item.weather[0]),
                    temp: Math.round(item.main.temp), // Ensure temp exists

                    description: item.weather[0].description,
                    
                     
                }));
    
            console.log("Processed Hourly Data:", hourlyData); // Debugging
    
            setHourlyForecastData(hourlyData);
        } catch (error) {
            console.error("Error fetching hourly forecast:", error);
        }
    };
    const fetchDailyForecast = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&appid=6134fa762cbe820b055e164835d5986b`

            );
            const dailyData = response.data.list.slice(0, 4).map((day) => ({
                date: new Date(day.dt * 1000).toLocaleDateString("en-GB", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                }),
                temp: Math.round(day.temp.day),
                icon: getWeatherIcon(day.weather[0]),
                description: day.weather[0].description,
                
                
            }));

            setDailyForecastData(dailyData);
        } catch (error) {
            console.error("Error fetching daily forecast:", error);
        }
    };
    
    
    

    // Convert Unix timestamp to readable time
    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    const sunriseTime = weatherData?.sys?.sunrise
        ? formatTime(weatherData.sys.sunrise)
        : "N/A";

    const sunsetTime = weatherData?.sys?.sunset
        ? formatTime(weatherData.sys.sunset)
        : "N/A";


   
    return (
        
        <div className = 'container'>
            
            <form onSubmit={handleSubmit}>
                <div id='search'>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={handleInputChange}
                        className="search-bar"
                    />
                    <button><img src={search} /></button>
                </div>  
            </form>
            {weatherData ? (
                <>
                    

                    <div className="current-weather">
                        <WeatherCard
                            location={weatherData.name}
                            date= {new Date(weatherData.dt * 1000).toLocaleDateString('en-GB', {weekday: 'short', month: 'short', day: 'numeric'})}
                            temperature={weatherData.main.temp}
                            condition={weatherData.weather[0].description}
                            pressure={weatherData.main.pressure}
                            icon= {getWeatherIcon(weatherData.weather[0])}
                        />
                    </div>
                    <div className="extra-weather">
                        <SecondaryInfo
                            temp={weatherData.main.temp}
                            humidity={weatherData.main.humidity}
                            visibility = {weatherData.visibility}
                            windspeed = {weatherData.wind.speed}
                            pressure = {weatherData.main.pressure}
                            percipitation = {weatherData.rain?.["1h"] ?? 0}
                            uv = {weatherData.uvi}
                            sunset = {sunsetTime}
                            sunrise = {sunriseTime}
                            icon = {getWeatherIcon(weatherData.weather[0])}

                        />
                    </div>
                    <div className="daily-weather">
                        {dailyForecastData.map((day, index) =>(
                            <DailyWeatherCard key={index} {...day} /> 
                        ))}
                    </div> 
                    <div className='hourly-weather'>
                        <Hourly data={hourlyforecastData} />  
                    </div>
                    <div id="mode">
                        <label className="switch-container">
                        <input type="checkbox" />
                        <span className="slider"></span>
                        </label>
                        <p>Dark Mode</p>
                    </div>
                    <div className="navigation-tab">
                        {[
                        { id: 'home', icon: home, label: 'Home' },
                        { id: 'weather', icon: forecast, label: 'Weather' },
                        { id: 'route', icon: route, label: 'Route' },
                        { id: 'analysis', icon: analysis, label: 'Analysis' },
                        { id: 'calendar', icon: calendar, label: 'Calendar' },
                        { id: 'settings', icon: settings, label: 'Settings' },
                        ].map((tab) => (
                        <NavigationTab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} />
                        ))}
                    </div>
                    
                </> 
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};
export default Home;
