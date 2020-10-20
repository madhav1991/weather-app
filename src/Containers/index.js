import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import CachedIcon from '@material-ui/icons/Cached';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import { fetchWeather,removeCity,fetchCityDetails,clearList } from '../actions'
import {CityDetails} from '../Containers/CityDetails';
import Button from '@material-ui/core/Button';

class WeatherContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city:'',
    }
    this.onChangeCity= this.onChangeCity.bind(this);
    this.onClickAddOrRefresh= this.onClickAddOrRefresh.bind(this);
    this.onClickDelete= this.onClickDelete.bind(this);   
    this.onClickCityDetails= this.onClickCityDetails.bind(this);
    this.onClickClearList= this.onClickClearList.bind(this);
  }

  onChangeCity(event){
    this.setState({
      city:event.target.value
    })
  }

  onClickAddOrRefresh() {
    this.props.dispatch(fetchWeather(this.state.city));
  }
  
  onClickDelete = index => {
    this.props.dispatch(removeCity(this.props.weather.listOfCities[index].city));
  }

  onClickCityDetails = index => {
    console.log('(this.props.weather.listOfCities[index].city)',(this.props.weather.listOfCities[index].city))
    this.props.dispatch((fetchCityDetails(this.props.weather.listOfCities[index].city)))
  }

  onClickClearList() {
    this.props.dispatch(clearList());
  }

  render(){
    console.log('this.props',this.props);
    const {weather,errors}= this.props;
    const cityDetails = this.props.forecastListByCity.showCityDetails 
      ? (
        <CityDetails
          dispatch={this.props.dispatch}
          weather={this.props.weather}
          forecastList={this.props.forecastListByCity.forecastList}
        />
      )
      : '';

    return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={4} className="city-list">
            <Paper className="textinput-icon">
              <TextField 
                error={errors ? errors.length>0 : false}
                id="standard-basic" 
                className="textinput" 
                label="Type a City Name"
                onChange={(event) =>this.onChangeCity(event)}
                helperText={errors ? errors[0]: ''}
              />
              <AddIcon 
                className="icon" 
                onClick = {this.onClickAddOrRefresh}
              />
            </Paper>
            <TableContainer className="table-container"component={Paper}>
              <Table className="" aria-label="simple table">
                <TableBody>
                  {weather.listOfCities.map((city, index) => (
                    <TableRow key={index}>
                      <TableCell onClick={() => this.onClickCityDetails(index)} >{city.city}-{city.temparature} {city.status}</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <CachedIcon 
                          className="icon" 
                          onClick = {this.onClickAddOrRefresh}
                        />
                      </TableCell>
                        <td>
                          <IconButton key={index} onClick={() => this.onClickDelete(index)}>
                            <HighlightOffIcon/>
                          </IconButton>
                        </td>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="contained" color="default" className="button" onClick={this.onClickClearList}>
                Clear
              </Button>
            </TableContainer>
          </Grid>
          <Grid item xs={8} className="city-details">
           {cityDetails}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps (state) {
    return state
}
  
export default connect(mapStateToProps)(WeatherContainer)
