import React, { useEffect, useRef } from 'react';
import './Hourly.css';

const Hourly = ({ data }) => {
  const svgRef = useRef(null);
  
  // Display up to 24 hours of data starting from current hour
  const displayData = data.slice(0, 24);

  useEffect(() => {
    // Add animation when component mounts
    if (svgRef.current) {
      svgRef.current.classList.add('animate-draw-line');
    }
    return () => {
      if (svgRef.current) {
        svgRef.current.classList.remove('animate-draw-line');
      }
    };
  }, [data]); 

  // Calculate the highest and lowest temperatures for scaling
  const validTemps = displayData.map(hour => Number(hour.temp)).filter(temp => !isNaN(temp));
  const maxTemp = Math.max(...validTemps);
  const minTemp = Math.min(...validTemps);

  const range = maxTemp - minTemp + 8; // Add padding

  const getYPosition = (temp) => {
    return 80 - ((temp - minTemp + 4) / range) * 60; // Normalize Y position
  };

  // Generate SVG path for temperature line
  const generatePath = () => {
    if (!displayData.length) return '';
    const width = 100 / (displayData.length - 1);
    return displayData.map((hour, i) => {
      const x = i * width;
      const y = getYPosition(hour.temp);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  const getHourDisplay = (hour) => {
    const time = new Date(`2023-01-01T${hour}`);
    const h = time.getHours();
    return h === 0 ? '12 AM' : h === 12 ? '12 PM' : h > 12 ? `${h-12} PM` : `${h} AM`;
  };

  return (
    <div className="box">
      <div className="hourly">
        <div className="overlap-group">
          <div className="overlap">
            {/* Grid Lines */}
            {displayData.map((_, i) => (
              <div key={i} className={`line line-${i + 1}`} />
            ))}
            
            {/* Temperature Line */}
            <svg 
              ref={svgRef}
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="vector-container"
            >
              <path
                d={generatePath()}
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                className="vector"
              />
            </svg>

            {/* Temperature Points */}
            {displayData.map((hour, i) => (
              <div
                key={i}
                className="ellipse-point"
                style={{
                  left: `${i * (100 / (displayData.length - 1))}%`,
                  top: `${getYPosition(hour.temp)}%`,
                }}
                title={`${hour.temp}°C | ${hour.weather} | ${getHourDisplay(hour.time)}`} // Basic tooltip
              />
            ))}
          </div>

          {/* Temperature Labels */}
          <div className="temperature-labels">
            {displayData.map((hour, i) => (
              <div key={i} className="temp-label" style={{left: `${i * (75 / (displayData.length - 1))}%`
            }}>
                {hour.temp}°
              </div>
            ))}
          </div>

          {/* Time Labels */}
          <div className="time-labels">
            {displayData.map((hour, i) => (
              <div key={i} className="time-label" style={{left: `${i * (75 / (displayData.length - 1))}%`}}>
                {getHourDisplay(hour.time) }
              </div>
            ))}
          </div>

          <div className="text-wrapper-15">Hourly Updates</div>
        </div>
      </div>
    </div>
  );
};

export default Hourly;
