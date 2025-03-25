import React from 'react';
import './WeatherCard.css';
import purple_background from './assets/purple_background.png';
import partly_cloudy from './assets/partly_cloudy.png';
import drops from './assets/drops.png';
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
          <div className="location-info">
            <h1>{location}</h1>
            <p>{date}</p>
          </div>
          <div className="condition">
            <p>{condition}</p>
          </div>
        </div>

        {/* Middle section */}
        <div className="middle-section">
          <div id="current-weather-icon">
            {icon}
          </div>
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