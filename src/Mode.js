import React, {useEffect, useState} from 'react';
/*component for mode switch*/
const Mode =() =>{
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect( () => {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme){
            setIsDarkMode(savedTheme === 'dark');
        }
        else{
            setIsDarkMode(true);
        }
    }
    ,[]);

    const toggleTheme = () => {
        setIsDarkMode((prevState)=>
        {
            const newTheme = !prevState;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        }
        );
    }
    useEffect(() => {
        if (isDarkMode) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
          document.body.setAttribute("colour-mode", "dark");
        } else {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
          document.body.setAttribute("colour-mode", "light");
        }
      }, [isDarkMode]);
    
      return(
        <div className="mode">
            <label className="switch-container">
                <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={toggleTheme} 
                />
                <span className="slider"></span>
            </label>
            <p>{isDarkMode ? "Dark Mode" : "Light Mode"}</p>
        </div>
      );
    
};

export default Mode;