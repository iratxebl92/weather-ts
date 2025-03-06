import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import './WeatherDetail.css'

type WeatherDetailProps = {
    weather: Weather
    iconUrl: any

}

export const WeatherDetail = ({weather, iconUrl}: WeatherDetailProps) => {

  return (
    <div className='container'>
        <h2>Clima de: {weather.name} </h2>
        <p className='current'>{formatTemperature(weather.main.temp)}&deg;C </p>
        <div className='temperatures'>
          <p>Min: <span> {formatTemperature(weather.main.temp_min)}&deg;C  </span></p>
          <p>Max: <span> {formatTemperature(weather.main.temp_max)}&deg;C  </span></p>

        </div>
        <img src={iconUrl} alt={weather.weather[0].description} />

    </div>
  )
}
