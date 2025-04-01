import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import weatherWarning from "../src/images/title_rect.png";
import windSpeed from "../src/images/heavy_wind.svg";
import visibility from "../src/images/visibility_eye.svg";
import searchIcon from "../src/images/search_icon.png";
import BikerIcon from "../src/images/biker.svg";
import AiIcon from "../src/images/weather_ai_icon.svg";
import CurrentWeatherIcon from "../src/images/partly_cloudy.svg";
import safetyGuide from "../src/images/safety_guide.png";

function Warnings({children}) {
    return (
        <div id="warnings">
            <h1>Weather warnings</h1>
            <img src={weatherWarning} alt="weather-warning"/>
            <div id="warning-data">
                {children}
            </div>
        </div>
    );
}

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

export default function Weather() {

    const [aiSearch, setAiSearch] = useState("");

    const [weatherData, setWeatherData] = useState('');
    const API_KEY = ""; /* Need to get from Google Cloud Console */

    const [postcode, setPostcode] = useState("");
    const [repairShops, setRepairShops] = useState([]);

    function handlePostcodeSearchChange(event) {
        if (event.target.value.length > 8) {
            return;
        }
        setPostcode(event.target.value.toUpperCase());
    }

    function handleEnterPressed(e) {
        if (e.key === "Enter") {
            fetchRepairShops();
        }
    }

    async function fetchRepairShops() {
        if (!postcode) {
            return;
        }

        try {
            const geoRes = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${API_KEY}`
            );
            const geoData = await geoRes.json();

            if (geoData.status !== "OK" || geoData.results.length === 0) {
                alert("Invalid postcode");
                return;
            }
        
            const { lat, lon } = geoData.results[0].geometry.location;

            const placesRes = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=bicycle_store&key=${API_KEY}`
            );
            const placesData = await placesRes.json();
        
            if (placesData.status !== "OK" || placesData.results.length === 0) {
                alert("No bicycle repair shops found nearby.");
                return;
            }

            const shopsWithDistance = placesData.results.map((shop) => {
            const distance = getDistance(lat, lon, shop.geometry.location.lat, shop.geometry.location.lng);
                return { name: shop.name, distance };
            });
        
            const nearestShops = shopsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 3);
        
            setRepairShops(nearestShops);
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

    /*useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationWeather(latitude, longitude);
        }); } else {
            console.log("Not Available");
        }
    }, []);

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
    };*/


    function handlePostcodeSearchChange(event) {
        if (event.target.value.length > 8) {
            return;
        }
        setPostcode(event.target.value.toUpperCase());
    }



    function handleAiSearchChange(event) {
        setAiSearch(event.target.value);
    }

    return (
        <div id='forecast-body'>
            <div id="content">

                <Link to="/Home">
                    <button type="button" id="backButton">&#8592;</button>
                </Link>
                <Warnings>
                    <ImagePanel src={windSpeed} top={250} left={145}/>
                    <TextPanel top={280} left={0} className="centred">
                        <p>{/*weatherData ? (
                            `${weatherData.wind?.speed ?? "N/A"} km/h`
                        ) : (
                            "Loading weather data..."
                        )*/}5 km/h</p>
                        <h3>Wind Speed</h3>
                    </TextPanel>
                    <ImagePanel src={visibility} top={255} left={324}/>
                    <TextPanel top={280} left={180} className="centred">
                        <p>
                            {/*weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : "N/A"*/}1.0 km
                        </p>
                        <h3>Visibility</h3>
                    </TextPanel>
                    <TextPanel top={250} left={400} width={600}>
                
                        <h3>Consider travelling before 7pm:</h3>
                        <h3> - 
                            <span> Strong winds</span> and
                            <span> poor visibility</span> will be common after 7pm
                        </h3>
                        <h3> - 
                            <span> Heavy rain</span> may follow (60% chance)
                        </h3>
                    </TextPanel>

                    <TextPanel top={280} left={1000} width={250}>
                        Due to severe weather warnings, please see our guide on how to ride safely, below:
                    </TextPanel>
                    <a href={safetyGuide} download>
                        <button type="button">Stay Safe</button>
                    </a>

                    <div className="warning-data-figures">
                        <TextPanel width={250}>
                            Due to severe weather warnings, please see our guide on how to ride safely, below:
                        </TextPanel>
                        <a href={safetyGuide} download>
                            <button type="button">Stay Safe</button>
                        </a>
                    </div>
                </Warnings>

                {/* Utilities
                    - Repair shops near the given postcode
                    - Weather AI with a search bar
                    - Today's temperature and feels like
                */}

                <Utility value="repair">
                    <Subheading text="Bike Repair"/>
                    <hr/>
                    <Searchbar value="repair-search">
                        <img src={searchIcon} alt="search icon" width="25px"/>


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
                            <li>Triton Cycles <span>1km</span></li>
                            <li>The Bike Shop <span>2km</span></li>
                            <li>Rayan's Cycles <span>4km</span></li>
                            </>
                        )}
                        </ul>
                    </RepairPanel>
                </Utility>
                <Utility value="ai">
                    <Subheading text="Weather AI"/>
                    <hr/>
                    <TextPanel top={120} left={50}>
                        <p>
                            Welcome to your personal <span>Weather AI</span>!
                        </p>
                        <p>
                            You can ask things like:
                            <span> how warm should I dress today?</span> or
                            <span> Is it safe to be cycling tonight?</span>
                        </p>
                    </TextPanel>
                    <ImagePanel src={AiIcon} top={250} left={160}/>
                    <Searchbar value="ai-search">
                        <img src={searchIcon} alt="search icon" width="25px"/>
                        <input type="text" placeholder="Do I need to wear a raincoat today?" value={aiSearch} onChange={handleAiSearchChange}/>
                    </Searchbar>
                </Utility>
                <Utility value="temp">
                    <Subheading text="Today's Temperature"/>
                    <hr/>
                    <h1>25°</h1>
                    <TextPanel top={190} left={200}>
                        <p>Feels like <span>15°</span></p>
                    </TextPanel>
                    <ImagePanel src={CurrentWeatherIcon} top={250} left={80}/>
                </Utility>
                <TempIcon />
            </div>
        </div>
    );
}