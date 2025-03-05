import axios from "axios";
import { z } from "zod";
import { useMemo, useState } from "react";
import { SearchType } from "../types";
import { WeatherType } from "../types/index";

// ZOD (para tipar la API de OpenWeatherMap)
const WeatherZod = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  weather: z.array(
    z.object({
      description: z.string(),
      icon: z.string(),
    })
  ),
});

export type Weather = z.infer<typeof WeatherZod>; // Inferir en base al esquema del type que hemos creado en Zod

// Estado inicial con icono y descripción
const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
  weather: [
    {
      icon: "", 
      description: "", 
    }
  ],
};

// Custom hook para obtener el clima
export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherType>(initialState);
  console.log(weather, "weather")
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Función para obtener los datos del clima
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState); // Restablecer el estado a los valores iniciales

    try {
      // URL para obtener las coordenadas de la ciudad
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);

      // Si no se encuentran resultados, mostrar 'no encontrado'
      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0]?.lat;
      const lon = data[0]?.lon;

      // URL para obtener el clima usando las coordenadas
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Realizar la consulta a la API para obtener los datos del clima
      const { data: weatherResult } = await axios<Weather>(weatherUrl);

      // Validar la respuesta con Zod
      const result = WeatherZod.safeParse(weatherResult);

      if (result.success) {
        // Si la validación es exitosa, actualizar el estado con los datos obtenidos
        setWeather(result.data);
      } else {
        console.log("Respuesta mal formada");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Memoización para evitar re-renderizados innecesarios
  const hasWeatherData = useMemo(() => weather.name, [weather]);

  // Generar la URL del icono a partir del código del icono (como 01d, 10n, etc.)
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData,
    iconUrl, // Añadido para usar el icono en tu componente
  };
};
