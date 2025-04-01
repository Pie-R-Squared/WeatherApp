import React from "react";
import "./SecondaryInfo.css";

const SecondaryInfo = (props) => {
  /*threshold for high wind*/
  const HIGH_WIND_THRESHOLD = 20;
  const isHighWind = props.windspeed >= HIGH_WIND_THRESHOLD;
  return (
    <div className="secondary-box">
      <div className="secondary-info">
        <div className="secondary-overlap">
          <div className="secondary-overlap-group">
            <img
              className="secondary-rectangle"
              alt="Rectangle"
              src="https://c.animaapp.com/XRcEjpxL/img/rectangle-7.png"
            />

            
            <img
              className="secondary-weather-icon"  
              alt="Weather Icon"
              src={props.icon}
            />
            
               { /*display temp*/}
            <div className="secondary-text-wrapper">{props.temp}°</div>
          </div>

          { /*sunset and sunrise section*/ }
          <div className="sunset">
            <div className="div">Sunset</div>

            <div className="secondary-text-wrapper-2">{props.sunset}</div>

            <img
              className="sunset-svgrepo-com"
              alt="Sunset svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/sunset-svgrepo-com--1--1.png"
            />
          </div>

          <div className="sunrise">
            <div className="secondary-text-wrapper-3">Sunrise</div>

            <div className="secondary-text-wrapper-4">{props.sunrise}</div>

            <img
              className="sunrise-svgrepo-com"
              alt="Sunrise svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/sunrise-svgrepo-com--1--1.png"
            />
          </div>


          { /*humidity section*/ }
          <div className="secondary-humidity">
            <div className="secondary-overlap-group-2">
              <img
                className="humidity-svgrepo-com"
                alt="Humidity svgrepo com"
                src="https://c.animaapp.com/XRcEjpxL/img/humidity-svgrepo-com--1--1.png"
              />

              <div className="secondary-text-wrapper-5">Humidity</div>

              <div className="secondary-text-wrapper-6">{props.humidity}%</div>
            </div>
          </div>
          {/*windspeed section*/}
          <div className="wind-speed">
            <img
              className="wind-svgrepo-com"
              alt="Wind svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/wind-svgrepo-com--1--1.png"
            />

            <div className="secondary-overlap-2">
              <div className="secondary-text-wrapper-7">Wind Speed</div>

              <div className="secondary-text-wrapper-8">{props.windspeed} m/s</div>
            </div>
          </div>

          {/*percipitation section*/}
          <div className="secondary-percipitation">
            <img
              className="rain-svgrepo-com"
              alt="Rain svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/rain-svgrepo-com--1--1.png"
            />

            <div className="secondary-overlap-3">
              <div className="secondary-text-wrapper-7">Percipitation</div>

              <div className="secondary-text-wrapper-9">{props.percipitation}mm</div>
            </div>
          </div>


          {/*pressure section*/}
          <div className="secondary-pressure">
            <img
              className="pressure-svgrepo-com"
              alt="Pressure svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/pressure-svgrepo-com--1--1.png"
            />

            <div className="secondary-text-wrapper-10">Pressure</div>

            <div className="secondary-text-wrapper-11">{props.pressure}hPa</div>
          </div>


          {/*visibility section*/  }
          <div className="secondary-visibility">
            <img
              className="secondary-visibility-eye"
              alt="Visibility eye"
              src="https://c.animaapp.com/XRcEjpxL/img/visibility-eye-svgrepo-com-1.png"
            />

            <div className="secondary-text-wrapper-12">Visibility</div>

            <div className="secondary-text-wrapper-13">{props.visibility}m</div>
          </div>


          {/*uv index section*/}
          <div className="secondary-UV">
            <img
              className="sun-svgrepo-com"
              alt="Sun svgrepo com"
              src="https://c.animaapp.com/XRcEjpxL/img/sun-2-svgrepo-com-1.png"
            />

            <div className="secondary-text-wrapper-14">UV</div>

            <div className="secondary-text-wrapper-15">{props.visibility}</div>
          </div>



          {/* Wind Warning Section */}  
          <div className="secondary-warning">
            <div className="secondary-overlap-4">
              {isHighWind && (
                <>
                  <div className="secondary-text-wrapper-16">Pedal with caution</div>
                  <div className="secondary-text-wrapper-17">Strong Wind Ahead!</div>
                  <img
                    className="secondary-img"
                    alt="Rectangle"
                    src="https://c.animaapp.com/XRcEjpxL/img/rectangle-10.png"
                  />
                  <div className="secondary-text-wrapper-18">WARNING</div>
                </>
              )}
              
              {/* Bike image remains no matter the wind speed */}
              <img
                className="secondary-woman-biking-medium"
                alt="Woman biking"
                src="https://c.animaapp.com/XRcEjpxL/img/woman-biking-medium-light-skin-tone-svgrepo-com-1.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryInfo;
