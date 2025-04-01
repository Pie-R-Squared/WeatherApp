import React, { useState, useEffect } from 'react';

function WeatherAI({prompt, weatherData, triggerAI}) {
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (!triggerAI || !prompt || !weatherData) return;

        const getResponse = async () => {
            try {
                let advice = "";
                
                if (prompt.includes("rain")) {
                    if (weatherData.weather[0]?.description.includes("rain")) {
                        advice = "It’s raining today. You might want to consider taking an umbrella!";
                    } else {
                        advice = "Don't worry, it's not raining today. You can go cycling!";
                    }
                } else if (weatherData.weather[0]?.description.includes("clear")) {
                    advice = "It’s clear and sunny! Perfect for cycling!";
                } else if (weatherData.main.temp < 10) {
                    advice = "It’s a bit chilly. Make sure to wear something warm for cycling!";
                } else {
                    advice = "It seems like a nice day for cycling!";
                }
                
                setResponse(advice);
            } catch (error) {
                console.error('Error generating advice:', error);
                setResponse("Sorry, I couldn't provide advice right now.");
            }
        };
        getResponse();
    }, [triggerAI, prompt, weatherData]);

    if (response) {
        return (
            <p>{response}</p>
        );
    } else {
        return (
            <div>
                <p>
                    Welcome to your personal <span>Weather AI</span>!
                </p>
                <p>
                    You can ask things like:
                    <span> how warm should I dress today?</span> or
                    <span> Is it safe to be cycling tonight?</span>
                </p>
            </div>
        );
    }
};

export default WeatherAI;