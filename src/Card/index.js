import React, {memo, useContext, useEffect} from 'react';
import {Link, useHistory, useRouteMatch} from 'react-router-dom';

import {GlobalContext} from '../App';
import {useWeather} from '../hooks/useWeather';
import '../App.scss';

const CardNoMemo = ({city, setCityCoord}) => {
    const data = useWeather(city);
    const history = useHistory();
    const isHome = Boolean(useRouteMatch('/home'));
    const {dispatch} = useContext(GlobalContext);
    useEffect(() => {
        if (data && data.coord.lat && data.coord.lon && setCityCoord) {
            setCityCoord({
                lat: data.coord.lat,
                lon: data.coord.lon,
            });
        }
    }, [data, setCityCoord])
    if (!data) return null;
    const {name, weather, main, wind} = data;
    const {description, icon} = weather[0];
    const {temp, humidity, pressure, feels_like, temp_max, temp_min} = main;
    const {speed} = wind;

    const handleOnDelete = () => {
        dispatch({
            type: 'DELETE_CITY',
            payload: city,
        })
    };

    const handleOnEdit = () => {
        dispatch({
            type: 'EDIT_CITY',
            payload: city,
        })
        history.push('/home');
    };
    if (isHome) {
        return (
            <Link to={`/city/${city.toLowerCase()}`} className="Card">
                <div className="ActionButtonWrap">
                    {/*<button className="ActionButton" onClick={handleOnEdit}>edit</button>*/}


                    <div className="btnRemoveIcon" onClick={handleOnDelete}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                            <path
                                d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                                fill="#B5B5B5"/>
                        </svg>
                    </div>

                </div>
                <div className="MainInfo">
                    <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"/>
                    <div className="Title">{name}</div>
                    <div className="Description">{description}</div>
                    <div className="Temperature TemperatureIcon">{temp.toFixed()}</div>
                </div>
                <div className="Information">
                    <div>Feels like: {feels_like.toFixed()}</div>
                    <div>Humidity: {humidity}</div>
                    {/* <div>Wind speed: {speed}</div> */}
                </div>
            </Link>
        )
    }
    return (
        <div className="Card">
            <div className="ActionButtonWrap ">
                <div className="btnRemoveIcon" onClick={handleOnDelete}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                        <path
                            d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                            fill="#B5B5B5"/>
                    </svg>
                </div>

            </div>
            <div className="MainInfo">
                <img className="Icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon"/>
                <div className="Title">{name}</div>
                <div className="Description">{description}</div>
                <div className="Temperature TemperatureIcon">{temp.toFixed()}</div>
            </div>
            <div className="Information">
                <div>Feels like: {feels_like.toFixed()}</div>
                <div>Humidity: {humidity}</div>
                <div>Pressure: {pressure}</div>
                <div>Wind speed: {speed}</div>
                <div>Maximum temperature: {temp_max.toFixed()}</div>
                <div>Minimum temperature: {temp_min.toFixed()}</div>
            </div>
        </div>
    );
};

export const Card = memo(CardNoMemo);

