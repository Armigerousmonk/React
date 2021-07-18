import {useState} from 'react';
import { Search } from './components/Search'
import { WeatherProfile } from './components/WeatherProfile'

const Weather = () => {
    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [newData, setNewData] = useState(undefined)


    console.log(newData[0])
    const onChange  = (event) => {
        setCity(event.target.value);
    }

    const getWeather = (event) => {
        event.preventDefault();
        setIsLoading(true)
        const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=85a100989c55667a3bc6b17c1e3de47b`;
        console.log(API_KEY)
        fetch(API_KEY)
            .then(res => res.json())
            .then(data => {
                setNewData([data, ...newData])

                // console.log(data)
            })
            .catch(error => console.log(error))

        }

    return (
        <div>
            <Search city={city} onChange={onChange} getWeather={getWeather}/>
            <div>
            {newData === undefined ? null : [newData].map((item, index) => ( <WeatherProfile key={index} data={item} />))}
            </div>

        </div>
    )
}





export default Weather;