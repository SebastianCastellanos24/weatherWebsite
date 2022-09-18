const API_KEY = "a0a846c0fbebb453da68bc34119d6e48"

export const getWeatherByCoords = async (LAT: number, LON: number ): Promise<any> => {

    const API_COORDS = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;

    const response = await fetch(API_COORDS);
    const data = await response.json();
    
    return data;

};

export const getWeatherBySearch = async (CITY: String): Promise<any> => {
    
    const API_CITY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
    
    const response = await fetch (API_CITY);
    const respData = await response.json();

    return respData;

}