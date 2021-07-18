import React, {useState} from 'react'

export const Friend = () => {

    const [friend, setFriend] = useState(undefined)
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    const getFriend = () => {
        setLoading(true)
        return fetch("https://www.randomuser.me/api?results=1")
        .then(res => res.json())
        .then(data => {
            setFriend(data.results[0]);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err)}
        )
    }

    return (
        <div className="friend">
            <Button onClick={getFriend}/>
            {isLoading && <h1>Loading...</h1>}
            {hasError && <h1>Error...</h1>}
            {friend === undefined ? null : <FriendProfile friend={friend}/>}
        </div>
    )

}

const FriendProfile = (props) => {
    return (
        <div>

            <ul>
                <li>First name: {props.friend.name.first}</li>
                <li>Last name: {props.friend.name.last}</li>
                <li>Address name: {props.friend.location.street.name}</li>
                <li>Country name: {props.friend.location.country}</li>
                <li>Email: {props.friend.email}</li>
                <li>Phone Number: {props.friend.phone}</li>
            </ul>
        </div>
    )
}

const Button = (props) => <button onClick={props.onClick}>Get a friend!</button>
