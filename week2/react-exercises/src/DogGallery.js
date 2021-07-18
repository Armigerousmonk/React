import React, {useState} from 'react'

export const DogGallery = () => {
    const [dogPhotos, setDogPhotos] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const getDogPhoto = () => {
        setLoading(true);
        return (
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(res => res.json())
            .then(data => {
                setDogPhotos([...dogPhotos, data]);
                console.log(dogPhotos)
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
                console.log(error);

            })
        )}
    return (
        <div className="dogGallery">
            <Button className="dogButton" onClick={getDogPhoto} />
            {isLoading && <h1>Loading...</h1>}
            {hasError && <h1>Error...</h1>}
            {dogPhotos.length === 0  ? "Get your first dog by clicking button!" : dogPhotos.map( (dogPhoto, index) => <DogPhoto key={index} dogPhotos={dogPhoto} />)}
        </div>
    )
}

const DogPhoto = (props) => {
    return (
        <div>
            <img src={props.dogPhotos.message} alt="cuteDoggs" width='500px'/>
        </div>
    )
}

const Button = (props) => <button onClick={props.onClick}>Get a dog!</button>