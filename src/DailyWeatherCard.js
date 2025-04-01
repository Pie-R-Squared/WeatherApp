import React from 'react';

const DailyWeatherCard = ({date, icon, temp, description}) => {
    console.log(icon);
    return(
        <div className ='daily-weather-card'>
            <p className = 'date'>{date}</p>
            <img src = {icon} className='daily-weather-icon' alt='daily-weather'/>
            <p className='daily-weather-description'>{description}</p>
            <p className = 'temp'>{temp}°</p>
            
          
        </div>
    );
}
export default DailyWeatherCard;