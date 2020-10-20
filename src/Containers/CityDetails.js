import React from 'react';
import './CityDetails.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import { fetchCityDetails } from '../actions'

export class CityDetails extends React.Component {
  constructor(props){
    super(props);
    
    this.onClickAddOrRefreshDetails= this.onClickAddOrRefreshDetails.bind(this);
  }

  onClickAddOrRefreshDetails() {
    this.props.dispatch(fetchCityDetails(this.props.weather.listOfCities[0].city));
  }

  render(){
    const content = !(this.props.weather.listOfCities[0] === undefined || this.props.weather.listOfCities[0].length === 0)
      ? (
        <Card className={"card"}>
          <CardContent>
            <Typography className="" color="textSecondary" gutterBottom>
              {`${this.props.weather.listOfCities[0].temparature} C` }
            </Typography>
            <Typography variant="body2" component="p">
              {this.props.weather.listOfCities[0].status }
            </Typography>
            <Typography variant="body2" component="p">
              {`Wind ${this.props.weather.listOfCities[0].wind.speed}  ${this.props.weather.listOfCities[0].wind.deg}`  }
            </Typography>
            <Typography variant="body2" component="p">
              {`Pressure ${this.props.weather.listOfCities[0].pressure}`}
            </Typography>
          </CardContent>
        </Card>
      )
      : '';

    const fiveDayForecast=
      !((this.props.forecastList === undefined || this.props.forecastList.length === 0)
       || (this.props.weather.listOfCities[0] === undefined || this.props.weather.listOfCities[0].length === 0))
       ?( this.props.forecastList.map((row, index) =>
          <Card className="five-day-card">
            <CardContent key={index}>
              <Typography className="" color="textSecondary" gutterBottom>
                {`${Date(row.dt)}`}
              </Typography>
              <Typography variant="body2" component="p">
                {row.weather[0].main}
              </Typography>
              <Typography variant="body2" component="p">
                {row.main.temp}
              </Typography>
            </CardContent>
          </Card>
       ))
        : '';

    return (
      <div className="city-details-layout">
        <div className="header">
          <h2 className="title">
            {`${this.props.weather.listOfCities[0].city}` } 
          </h2 >
          <CachedIcon 
            className="icon" 
            onClick = {this.onClickAddOrRefreshDetails}
          />
        </div>
        <div className="details">
          {content}
          <div className="five-day-forecast">
            <h3>
              Five Day Forecast
            </h3> 
            <div className="five-day">
              {fiveDayForecast}  
            </div>
          </div>
        </div>
        {/* <Cloudy/> */}
      </div>
    );
  }
}
