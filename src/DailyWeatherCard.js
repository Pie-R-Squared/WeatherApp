import React from 'react';

function DailyWeatherCard({date, icon, temp, description}){
    return(
        <div className ='daily-weather-card'>
            <p className = 'date'>{date}</p>
            <div className ='daily-weather-icon'>{icon}</div>
            <p className='daily-weather-description'>{description}</p>
            <p className = 'temp'>{temp}°</p>
            
          
        </div>
    );
}
export default DailyWeatherCard;