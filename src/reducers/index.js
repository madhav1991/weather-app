import { combineReducers } from 'redux'
import { ADD_OR_REFRESH_CITY,
  REMOVE_CITY,
  FORECAST_LIST_BY_CITY,
  ADD_CITY_ERROR,
  EMPTY_LIST } from '../actions'

const initialState = {
  listOfCities:[],
  forecastList:[],
  showCityDetails:false
};

function doesCityExistsInState(state,name){
  console.log('name',name)
  console.log('initialState',state)
  const{listOfCities} = state;
  console.log('listOfCities',listOfCities)
  let citiesArr = listOfCities.map(item => { return item.city });
  let isDuplicate = citiesArr.some(city =>{ 
    return city === name
  });
  console.log('isDuplicate',isDuplicate)
  return isDuplicate;
}

function weather(state = initialState, action) {
  console.log('reducer in weather', action.payload)
  switch (action.type) {
    case ADD_OR_REFRESH_CITY:
      return Object.assign({},...state.listOfCities, { 
          listOfCities: !doesCityExistsInState(state,action.payload.city) 
            ? [{
                city: action.payload.city,
                temparature: action.payload.temparature,
                status: action.payload.status,
                wind: action.payload.wind,
                pressure: action.payload.pressure
              },
              ...state.listOfCities]
            : [...state.listOfCities],
      })
    case REMOVE_CITY:
      return {
        ...state, 
        listOfCities: state.listOfCities.filter(item => item.city !== action.payload.city)
      }
    case EMPTY_LIST:
      return {
        ...state.forecastList,
        showCityDetails: false,
        listOfCities: [],
      }
      default:
        return state
  }
}

function forecastListByCity(state = initialState, action) {
  console.log('reducer in forecastListByCity', action.payload);
  switch (action.type) {
    case FORECAST_LIST_BY_CITY:
      return { 
          ...state.forecastList,
          showCityDetails:true,
          ...action.payload
      }
    default:
        return state
  }
}

function errors(state = [], action) {
  console.log('reducer in errors', action);
  switch (action.type) {

    case ADD_CITY_ERROR:
      return state.concat([action.payload]);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
    weather,
    forecastListByCity,
    errors
})

export default rootReducer