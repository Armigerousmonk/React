import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const RandomJoke = () => {
    const [joke, setJoke] = useState({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        const fetchData = async() => {
            const result = await axios('https://official-joke-api.appspot.com/random_joke');

            setJoke(result.data);
        }
        fetchData();
        }, []);


    return (
        <Joke joke={joke}/>

    )
}

const Joke = (props) =>{
    return (
        <div className="randomJokes">
            <p>Daily joke:</p>
            <p>{props.joke.setup}</p>
            <p>{props.joke.punchline}</p>
        </div>
    )
}
