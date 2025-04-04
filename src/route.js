import React, { useState, useEffect } from 'react';
import Mode from './Mode';
import NavigationTab from './NavigationTab';
import home from './images/home_icon.png';
import forecast from './images/forecast.png';
import routeIcon from './images/route.png';
import tick from './routeimages/tick1.png';
import emergencyinfo from './routeimages/emergencyinfo.png';
import safetytips from './routeimages/safetytips.png';
import './route.css';
import './style.css';


const RoutePlanner = () => {
  // Set default city to London if not already set in localStorage
  const defaultCity = localStorage.getItem('city') || 'London';
  const [origin, setOrigin] = useState(defaultCity);
  const [destination, setDestination] = useState(defaultCity);
  
  // handlers for input changes
  const handleOriginChange = (e) => setOrigin(e.target.value);
  const handleDestinationChange = (e) => setDestination(e.target.value);


  //checklist items and toggle logic
  const checklistItems = [
    "Helmet Secured",
    "Lights Working",
    "Tire Pressure Checked",
    "Brakes Functioning",
    "Reflective Gear Worn",
  ];
  
  const [checkedStates, setCheckedStates] = useState(
    Array(checklistItems.length).fill(false)
  );
  
  const toggleCheck = (index) => {
    const updated = [...checkedStates];
    updated[index] = !updated[index];
    setCheckedStates(updated);
  };



  return (
    <div className="container2">
        {/*informational images */}

        <img src = {emergencyinfo} alt = "emergencyinfo" className = "emergencyinfo" id = "emergencyinfo" />
        <img src = {safetytips} alt = "safetytips" className = "safetytips" id = "safetytips" />

    {/*dark/light mode switch*/}
    <Mode />

      {/* Origin & Destination Form */}
      <form>
        <div className="search-fields">
          <div id="searchOrigin">
            <input
              type="text"
              placeholder="Enter origin postcode or city"
              value={origin}
              onChange={handleOriginChange}
              className="route-bar"
            />
          </div>
          
          
                
          <div id="searchDestination">
            <input
              type="text"
              placeholder="Enter destination postcode or city"
              value={destination}
              onChange={handleDestinationChange}
              className="route-bar"
            />
          </div>
          
        </div>
      </form>

      {/* Map showing biking route between origin and destination*/}
      {origin && destination && (
        <div id="map" className="map-container">
          <iframe title="Google Map Directions"
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '1rem' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCGVj5sSHNS3E3I0TlJuFk5oSxjZiI4Mgs&origin=${encodeURIComponent(
              origin
            )}&destination=${encodeURIComponent(destination)}&mode=bicycling`}
          />
        </div>
      )}


      {/* Quick Checklist with toggleable items */}

        <div className="checklist-card">
        <h2 className="checklist-title">Quick Checklist</h2>
        <ul className="checklist-items">
            {checklistItems.map((item, index) => (
            <li key={index} className="checklist-item" onClick={() => toggleCheck(index)}>
                <img
                src={tick}
                alt="tick"
                className={`tick-icon ${checkedStates[index] ? "visible" : "hidden"}`}
                />
                <span>{item}</span>
            </li>
            ))}
        </ul>
        </div>


    
      {/* Navigation Tabs */}
      <div className="navigation-tab">
        {[
          { id: 'home', icon: home, label: 'Home' },
          { id: 'weather', icon: forecast, label: 'Weather' },
          { id: 'route', icon: routeIcon, label: 'Route' },
        ].map((tab) => (
          <NavigationTab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} />
        ))}
      </div>
    </div>
  );
};

export default RoutePlanner;