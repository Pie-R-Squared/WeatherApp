import React from 'react';
import './CurrentWeatherCard.css';
import purple_background from './images/purple_background.png';
import drops from './images/drops.png';


const WeatherCard = ({
  location,
  date,
  temperature,
  condition,
  pressure,
  icon,
}) => {
  return (
    <div className="weather-card">
      <img 
        src={purple_background} 
        alt="Background" 
        className="background-image"
      />

      <div className="content">
        {/* Top section */}
        <div className="top-section">
          <div id="location-info">
            <h1>{location}</h1>
            <p>{date}</p>
          </div>
          <div className="condition">
            <p>{condition}</p>
          </div>
        </div>

        {/* Middle section */}
        <div className="middle-section">
         
          <img src={icon} alt="Weather Icon" className="current-weather-icon" />
          
          <div className="temperature">
            {temperature}<span>°</span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="bottom-section">
          <div className="drops">
            <img 
              src={drops}
              alt="Drops"
              className="drops-icon"
            />
          </div>
          <div className="pressure-info">
            <p>Pressure:</p>
            <p>{pressure}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;