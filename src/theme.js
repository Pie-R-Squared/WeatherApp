import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

/*
    Theme component which wraps the entire application
    with the selected theme (Light or Dark)
    The theme is present in localStorage to persist 
    across different pages
*/
export const Theme = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.setAttribute("colour-mode", theme);

        document.querySelectorAll(".custom-bullets").forEach((element) => {
            element.setAttribute("colour-mode", theme);
        });

        document.querySelectorAll(".utility").forEach((element) => {
            element.setAttribute("colour-mode", theme);
        });

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => {
        setTheme((previousColour) => (previousColour === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
}