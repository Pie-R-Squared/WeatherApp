import React from 'react';
import { Link } from 'react-router-dom';
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

export default NavigationTab;