import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import weatherWarning from "../src/images/title_rect.png";
import weatherWarningLight from "../src/images/title_rect_light.png";
import windSpeed from "../src/images/heavy_wind.svg";
import visibility from "../src/images/visibility_eye.svg";
import BikerIcon from "../src/images/biker.svg";
import AiIcon from "../src/images/weather_ai_icon.svg";
import CurrentWeatherIcon from "../src/images/partly_cloudy.svg";
import safetyGuide from "../src/images/safety_guide.png";
import Mode from './Mode';
import WeatherAI from "./WeatherAI";
import route from './images/route.png';
import home from './images/home_icon.png';
import forecast from './images/forecast.png';

/*
    Warnings component which contains the title,
    weather warnings, windspeed and visibility
*/
function Warnings({children}) {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const savedTheme = localStorage.getItem('theme');
            if ((savedTheme === 'dark' && !isDarkMode) || (savedTheme === 'light' && isDarkMode)) {
                setIsDarkMode(savedTheme === 'dark');
            }
        }, [isDarkMode]);

        return () => clearInterval(intervalId);
    }, [isDarkMode]);

    return (
        <div id="warnings">
            <h1>Weather warnings</h1>
            <img
                src={isDarkMode ? weatherWarning : weatherWarningLight} 
                alt="weather-warning"
            />
            <div id="warning-data">
                {children}
            </div>
        </div>
    );
}

/*
    Navbar component for switching between pages
*/
function NavigationTab({id, icon, label}){
    return(
        <div id={id} className="navigation-item">
            <Link to={`/${id}`}>
                <button><img src={icon} alt={label}/></button>
                <p>{label}</p>
            </Link>
        </div>
    )
}

/*
    Utility component which generalises a container
    for the three utilities: repair, ai and today's
    temperature
*/
function Utility({value, children}) {
    return (
        <div id={value} className="utility">{children}</div>
    );
}

function Searchbar({value, children}) {
    return (
        <div id={value}>{children}</div>
    );
}

function Subheading({text}) {
    return (
        <h2>{text}</h2>
    );
}

/*
    Container for images, which may be provided
    with a top and left value to absolutely position
    the image
*/
function ImagePanel({src, top, left}) {
    return (
        <div className="image-panel"
            style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                ...(top !== undefined && left !== undefined
                    ? { top: `${top}px`, left: `${left}px`, position: "absolute" }
                    : {})
            }}>
        </div>
    );
}

function RepairPanel({children}) {
    return (
        <div id="repair-panel">{children}</div>
    );
}

function TempIcon() {
    return (
        <div id="temp-icon"></div>
    );
}

/*
    Container for text, which may be provided
    with a top and left value to absolutely position
    the text, as for ImagePanel
*/
function TextPanel({top, left, className, width, children}) {
    return (
        <div className={`text-panel ${className || ""}`}
            style={{
                maxWidth: `${width || 300}px`,
                ...(top !== undefined && left !== undefined
                    ? { top: `${top}px`, left: `${left}px`, position: "absolute" }
                    : {})
            }}>
            {children}
        </div>
    );
}

/*
    The Weather component which contains all the React
    components and exports them to App.js

    Contains:
        - Weather Warnings, windspeed and visibility
        - Safety guide for riding in dangerous weather
        - The three nearest repair shops to a given poscode
        - A cyclist-tailored weather AI that accepts prompts
        - Today's temperature and what it feels like
*/
export default function Weather() {

    const [aiSearch, setAiSearch] = useState("");
    const [triggerAI, setTriggerAI] = useState(false);

    const [weatherData, setWeatherData] = useState('');
    const API_KEY = "AIzaSyCGzyUl2BVFjyZp67Z4OeFsomXHQzKIKM8";

    const [postcode, setPostcode] = useState("");
    const [repairShops, setRepairShops] = useState([]);

    function handlePostcodeSearchChange(event) {
        if (event.target.value.length > 8) {
            return;
        }
        setPostcode(event.target.value.toUpperCase());
    }

    function handleEnterPressed(e) {
        if (e.key === "Enter" && postcode.trim() !== "") {
            fetchRepairShops();
        }
    }

    function handleAiEnterPressed(e) {
        if (e.key === "Enter" && aiSearch.trim() !== "") {
            setTriggerAI(true);
        }
    }

    async function fetchRepairShops() {
        if (!postcode) {
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/fetchRepairShops?postcode=${postcode}`);
            const shops = response.data.shops;

            console.log('Response from backend:', shops);
        
            setRepairShops(shops);
        } catch (error) {
            console.error("Error while fetching location data:", error);
        }
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /*
        Fetch user's exact location upon loading the page
        Retrieves the latitude and longitude
    */
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationWeather(latitude, longitude);
        }); } else {
            console.log("Not Available");
        }
    }, []);

    /*
        Fetches the weather data based on the user's location
        Displays an error if the API call fails
    */
    const fetchLocationWeather = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"9b27abfa8280abdbc5b8674b42e31f07"}`
            );
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    function handleAiSearchChange(event) {
        setAiSearch(event.target.value);
    }

    return (
        <div id="forecast-body">

        <div id="content">

            <Mode />

            <Warnings>
                <div className="warning-data-figures">
                    <ImagePanel src={windSpeed}/>
                    <TextPanel width={150} className="centred">
                        <p>{weatherData ? (
                            `${((weatherData.wind?.speed ?? 0) / 3.6).toFixed(2)} m/s`
                        ) : (
                            ""
                        )}</p>
                        <h3>Wind Speed</h3>
                    </TextPanel>
                </div>
                <div className="warning-data-figures">
                    <ImagePanel src={visibility}/>
                    <TextPanel width={150} className="centred">
                        <p>
                            {weatherData.visibility ? (weatherData.visibility).toFixed(1) : "N/A"}m
                        </p>
                        <h3>Visibility</h3>
                    </TextPanel>
                </div>
                { weatherData && (
                <TextPanel width={600}>
                    <h3>Considerations:</h3>
                    {weatherData.wind.speed > 6 ? (
                        <h3> - <span>⚠️ Strong winds</span> detected</h3>
                    ) : (
                        <h3> - <span>Low wind</span> conditions</h3>
                    )}

                    {weatherData.visibility / 1000 < 5 ? (
                        <h3> - <span>⚠️ Poor visibility</span> conditions</h3>
                    ) : (
                        <h3> - <span>Good visibility</span> conditions</h3>
                    )}

                    {weatherData.rain?.["1h"] ? (
                        <h3> - <span>⚠️ Heavy rain</span> expected ({Math.round(weatherData.rain["1h"] * 100)}% chance)</h3>
                    ) : (
                        <h3> - <span>No rain</span> expected</h3>
                    )}

                    {!(weatherData.wind.speed > 6 || weatherData.visibility / 1000 < 5 || weatherData.rain?.["1h"]) && (
                        <>
                            <h3>No severe weather warnings</h3>
                            <h3> - <span>Low wind</span> and <span>good visibility</span></h3>
                            <h3> - <span>{weatherData.rain?.["1h"] ? `${Math.round(weatherData.rain["1h"] * 100)}% chance of light rain` : "No rain expected"}</span></h3>
                        </>
                    )}
                </TextPanel>)
                }
                <div className="warning-data-figures">
                    <TextPanel width={250}>
                        In case of severe weather warnings, please see our guide on how to ride safely, below:
                    </TextPanel>
                    <a href={safetyGuide} download>
                        <button type="button">Stay Safe</button>
                    </a>
                </div>
            </Warnings>

            <div className="navigation-tab">
                {[
                { id: 'home', icon: home, label: 'Home' },
                { id: 'weather', icon: forecast, label: 'Weather' },
                { id: 'route', icon: route, label: 'Route' },
                ].map((tab) => (
                <NavigationTab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} />
                ))}
            </div>

            <Utility value="repair">
                <Subheading text="Bike Repair"/>
                <hr/>
                <Searchbar value="repair-search">
                    <img className="search-icon" alt="search icon" width="25px"/>
                    <input type="text" placeholder="Insert postcode" value={postcode} onChange={handlePostcodeSearchChange} onKeyDown={handleEnterPressed}/>
                </Searchbar>
                <ImagePanel src={BikerIcon} top={120} left={80}/>
                <RepairPanel>
                    <h3>Repair shops near you</h3>
                    <ul className="custom-bullets">
                    {repairShops && repairShops.length > 0 ? (
                        repairShops.slice(0, 3).map((shop, index) => (
                            <li key={index}>
                            {shop.name} <span>{shop.distance.toFixed(2)} km</span>
                            </li>
                        ))
                    ) : (
                        <>
                        <li>No repair shops found</li>
                        </>
                    )}
                    </ul>
                </RepairPanel>
            </Utility>
            <Utility value="ai">
                <Subheading text="Weather AI"/>
                <hr/>
                <TextPanel top={120} left={50}>
                    <WeatherAI prompt={aiSearch} weatherData={weatherData} triggerAI={triggerAI} />
                </TextPanel>
                <ImagePanel src={AiIcon} top={250} left={160}/>
                <Searchbar value="ai-search">
                    <img className="search-icon" alt="search icon" width="25px"/>
                    <input type="text" placeholder="Do I need to wear a raincoat today?" value={aiSearch} onChange={handleAiSearchChange} onKeyDown={handleAiEnterPressed}/>
                </Searchbar>
            </Utility>
            <Utility value="temp">
                <Subheading text="Today's Temperature"/>
                <hr/>
                <h1>{ weatherData ? (
                    `${weatherData.main.temp.toFixed(1)}°`
                ) : (
                    ""
                )}</h1>
                <TextPanel top={190} left={200}>
                    <p>Feels like <span>
                        { weatherData ? (
                            `${weatherData.main.feels_like.toFixed(1)}°`
                        ) : (
                            ""
                        )}</span></p>
                </TextPanel>
                <ImagePanel src={CurrentWeatherIcon} top={250} left={80}/>
            </Utility>
            <TempIcon />
        </div>
    </div>
    );
}
