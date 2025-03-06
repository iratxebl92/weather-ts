import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import './Form.css'
import { SearchType } from '../../types/index';
import { Alert } from '../Alert/Alert';


type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export const Form = ({fetchWeather}: FormProps) => {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            //Si está vacío
            setAlert('Todos los campos son obligatorios')
            return //Evita que se ejecuten las siguientes lineas de código
        }
        fetchWeather(search)
    }

  return (
   <form 
    className='form'
    onSubmit={handleSubmit }

   >
    {alert && <Alert> {alert} </Alert>}
    <div  className='field'>
        <label htmlFor="city">Ciudad</label>
        <input 
            type="text" 
            id="city" 
            name="city" 
            placeholder="Ciudad"
            value={search.city} 
            onChange={handleChange}
        />
    </div>
    <div  className='form'>
        <label htmlFor="country">Pais:</label>
        <select 
            name="country" 
            id={search.country} 
            value={search.country}
            onChange={handleChange}
        >

        <option value="">Seleccione un Pais</option>
        {countries.map(country => (
            <option
            key={country.code} 
            value={country.code}
            >
                {country.name}
            </option>
        ))}
        </select>
    </div>
        <input className='submit' type="submit" value='Consultar clima' />
   </form>
  )
}
