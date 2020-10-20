export const ADD_OR_REFRESH_CITY = "ADD_OR_REFRESH_CITY";
export const REMOVE_CITY = "REMOVE_CITY";
export const FORECAST_LIST_BY_CITY= "FORECAST_LIST_BY_CITY"
export const ADD_CITY_ERROR= "ADD_CITY_ERROR";
export const EMPTY_LIST= "EMPTY_LIST";

export function fetchWeather(city) {
    return function(dispatch){
    const API_KEY= 'ce2bc03b43230e19c5f273a27b5dfe36';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data=> {
        console.log('data',data);
        if (data.cod === 200){
            return dispatch({
                type: ADD_OR_REFRESH_CITY,
                payload: {
                    city:data.name,
                    temparature: data.main.temp,
                    status: data.weather[0].description,
                    wind: data.wind,
                    pressure:  data.main.pressure,
                }
            })
        }
        if (data.cod !== '200'){
            console.log('404');
            return dispatch({type: ADD_CITY_ERROR, payload: data.message});

        }
      })
}}

export function removeCity(city) {
    console.log('remove city action',city);
    return function(dispatch){
        return dispatch({
            type: REMOVE_CITY,
            payload:{
                city
            }
        })
    }
}

export function clearList() {
    console.log('empty list');
    return function(dispatch){
        return dispatch({
            type: EMPTY_LIST,
            payload:{}
        })
    }
}

export function fetchCityDetails(city) {
    return function(dispatch){
        const API_KEY= 'c51223c219d6aec8cb8c5210449bd859';
        const requestUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=5&units=metric            `
        fetch(requestUrl)
            .then(response => response.json())
            .then(data=> {
            console.log('data',data);
            return dispatch({
                type: FORECAST_LIST_BY_CITY,
                payload: {
                    forecastList: data.list 
                }
            })
        });
    }
}
