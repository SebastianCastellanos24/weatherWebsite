import { WeatherContainer } from "./components/WeatherContainer"
import { useState, useEffect, FormEvent } from "react"
import { getWeatherByCoords, getWeatherBySearch } from "./api/fetchWeather";
import { SearchBox } from "./components/SearchBox";


function App() {

  //Feach api data
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const LAT = position.coords.latitude;
        const LON = position.coords.longitude;

        try {
          const data = await getWeatherByCoords( LAT, LON );
          setFetchedData(data);
        }
        catch (err) {
          setError("Please check your net connection 💻")
        }
      }
    )
  
  }, [])
  
  //Searcher
  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("");
    try {
      const data = await getWeatherBySearch(CITY);

      if (data === "404") {
        setError("The city could not be found ✈");
      }
      else if (data === "400") {
        setError("Please type any city ✍");
      }
      else {
        setFetchedData(data);
      }

    } 
    catch (err) {
      setError("Please check your net connection 💻")
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SearchBox handleSearch={handleSearch}/>
      <WeatherContainer fetchedData={fetchedData} error={error} />
    </div>
  )
}

export default App
