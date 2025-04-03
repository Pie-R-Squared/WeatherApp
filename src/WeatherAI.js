import React, { useState, useEffect } from 'react';

function WeatherAI({prompt, weatherData, triggerAI}) {
    const [response, setResponse] = useState('');

    useEffect(() => {
        if (!triggerAI || !weatherData) return;

        /* RESET TO DEFAULT TEXT */
        if (!prompt) {
            setResponse('');
            return;
        }

        const conditions = weatherData.weather[0]?.main.toLowerCase() || "";
        const description = weatherData.weather[0]?.description.toLowerCase() || "";
        const temp = weatherData.main.temp || 0;
        const humidity = weatherData.main.humidity || 0;
        const visibility = weatherData.visibility || 10000;
        const windSpeed = weatherData.wind?.speed || 0;
        const uvi = weatherData?.uvi || 0;

        const getResponse = async () => {
            try {
                let advice = "";

                /* HOW TO DRESS PROMPT */
                if ((prompt.includes("how") && prompt.includes("dress")) || (prompt.includes("what") && prompt.includes("wear")) || prompt.includes("warm")) {
                    if (temp < 10) {
                        advice = "It’s quite chilly today. Make sure to wear something warm! ༄";
                    } else if (temp < 15) {
                        advice = "It’s a bit chilly today. A light jacket would be a good idea! ༄";
                    } else if (temp < 22) {
                        advice = "The temperature is moderate. You can dress comfortably! 🌤️";
                    } else {
                        advice = "It’s warm today. You can wear lighter clothing! 🔆";
                    }

                /* SAFE CYCLING PROMPT */
                } else if (prompt.includes("safe") && (prompt.includes("cycling") || prompt.includes("cycle") || prompt.includes("bike"))) {
                    if (conditions === "Thunderstorm" || conditions === "Extreme" || description.includes("storm")) {
                        advice = "It’s stormy today. It’s not safe to go cycling! 🌪";
                    } else if (conditions === "rain" || description.includes("rain")) {
                        advice = "It’s raining today. Be cautious while cycling! 🌧";
                    } else {
                        advice = "The weather looks good for cycling. Enjoy your ride! 🚴‍♂️";
                    }

                /* RAIN PROMPT */
                } else if (prompt.includes("rain") || prompt.includes("umbrella")) {
                    if (conditions === "rain" || description.includes("rain")) {
                        advice = "It’s raining today. You might want to consider taking an umbrella and a raincoat! 🌧";
                    } else {
                        advice = "Don't worry, it's not raining today. You can go cycling! 🌤";
                    }

                /* COAT PROMPT */
                } else if (prompt.includes("coat")) {
                    if (temp < 15) {
                        advice = "It’s a bit chilly today. A coat would be a good idea! 🧥";
                    } else {
                        advice = "It’s warm today. You might not need a coat! 🌞";
                    }
                
                /* SUNNY PROMPT */
                } else if (prompt.includes("sunny")) {
                    if (conditions === "clear" || description.includes("sunny")) {
                        advice = "It’s sunny today! Perfect for cycling! 🚴‍♂️";
                    } else {
                        advice = "It’s not sunny today. You might want to check the weather before cycling! 🌥";
                    }

                /* WINDY PROMPT */
                } else if (prompt.includes("windy")) {
                    if (windSpeed > 20) {
                        advice = "It’s quite windy today. Be careful while cycling! ༄";
                    } else {
                        advice = "The wind is mild today. You can go cycling! 🚴";
                    }

                /* CLOUDY PROMPT */
                } else if (prompt.includes("cloudy")) {
                    if (conditions === "clouds" || description.includes("cloudy")) {
                        advice = "It’s cloudy today. You might want to check for rain! ☁️";
                    } else {
                        advice = "It’s not cloudy today. Enjoy your cycling! 🚴‍♀️";
                    }

                /* HUMIDITY PROMPT */
                } else if (prompt.includes("humidity")) {
                    if (humidity > 70) {
                        advice = "It’s quite humid today. Stay hydrated while cycling! 💦";
                    } else {
                        advice = "The humidity is moderate. You can go cycling! 🌥";
                    }

                /* UV INDEX PROMPT */
                } else if (prompt.includes("uv")) {
                    if (uvi > 7) {
                        advice = "The UV index is high today. Wear sunscreen while cycling! 🔆";
                    } else {
                        advice = "The UV index is moderate. You can cycle without much worry! 🌥";
                    }

                /* VISIBILITY PROMPT */
                } else if (prompt.includes("visibility")) {
                    if (visibility < 3000) {
                        advice = "Visibility is low today. It’s not safe to cycle! 🌫️";
                    } else {
                        advice = "Visibility is good today. You can go cycling! 🌤️";
                    }

                /* STORM PROMPT */
                } else if (prompt.includes("storm")) {
                    if (conditions === "Thunderstorm" || conditions === "Extreme" || description.includes("storm")) {
                        advice = "It’s stormy today. It’s not safe to go cycling! 🌪";
                    } else {
                        advice = "It’s not stormy today. You can go cycling! 🔆";
                    }

                /* TEMPERATURE / WEATHER PROMPT */
                } else if (prompt.includes("temperature") || prompt.includes("weather") || prompt.includes("forecast")) {
                    if (temp < 10) {
                        advice = "It’s quite chilly today. Dress warmly! ༄";
                    } else if (temp > 30) {
                        advice = "It’s hot today. Stay hydrated while cycling! 🌞";
                    } else {
                        advice = "The temperature is moderate. Enjoy your ride! 🌡️";
                    }

                /* SUNSET PROMPT */
                } else if (prompt.includes("sunset")) {
                    const sunsetTime = new Date(weatherData.sys.sunset * 1000);
                    const currentTime = new Date();

                    const formatTime = (date) => {
                        return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
                    };

                    if (currentTime > sunsetTime) {
                        advice = "The sun has already set. It’s not safe to cycle now! 🌇";
                    } else {
                        advice = `The sun will set at ${formatTime(sunsetTime)}. You have some time to cycle! 🔆`;
                    }
                
                /* OTHER ADVICE */
                } else if (prompt.includes("advice")) {
                    advice = "Please specify what kind of advice you need regarding the weather.";

                /* SET TO DEFAULT TEXT */
                } else {
                    advice = "";
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