import React from 'react';
import './App.css';
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

class App extends React.Component {


  constructor(props){
    super(props);
    this.state={
      city:'',
      listOfCities:[]
    }
    this.onChangeCity= this.onChangeCity.bind(this);
    this.onClickAdd= this.onClickAdd.bind(this);
    this.onClickDelete= this.onClickDelete.bind(this);   
    this.fetchCityData= this.fetchCityData.bind(this);   
  }

  doesCityExistsInState(name){
    const{listOfCities}=this.state;
    let citiesArr = listOfCities.map(item => { return item.city });
    let isDuplicate = citiesArr.some(city =>{ 
      return city === name
    });
    return isDuplicate;
  }

  fetchCityData(){
    const {city, listOfCities} = this.state;
    const API_KEY= 'ce2bc03b43230e19c5f273a27b5dfe36';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&unites=metric`)
      .then(response => response.json())
      .then(data=> {
        console.log('data',data);
        this.setState({  
          listOfCities: !this.doesCityExistsInState(data.name) ? [...listOfCities,{
            city:data.name,
            temparature: data.main.temp,
            status: data.weather[0].description
          }] : listOfCities
        });
      })
  }

  onChangeCity(event){
    this.setState({
      city:event.target.value
    })
  }

  onClickAdd() {
    this.fetchCityData();
  }
  
  onClickDelete = city => {
    const {listOfCities}=this.state;
    // let returnedList= listOfCities.splice(city,1);
    let returnedList= listOfCities.filter((_,i) => i !== city )
    console.log('returnedList',returnedList);
    this.setState({
      listOfCities: returnedList
    })
  }

  render(){
    const {listOfCities}= this.state;
    return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className="textinput-icon">
              <TextField 
                id="standard-basic" 
                className="textinput" 
                label="Type a City Name"
                onChange={(event) =>this.onChangeCity(event)}
              />
              <AddIcon 
                className="icon" 
                onClick = {this.onClickAdd}
              />
            </Paper>
            <TableContainer component={Paper}>
              <Table className="" aria-label="simple table">
                <TableBody>
                  {listOfCities.map((city, index) => (
                    <TableRow key={index}>
                      <TableCell>{city.city}-{city.temparature} {city.status}</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <CachedIcon 
                        className="icon" 
                        onClick = {this.fetchCityData}
                      />
                      <IconButton key={index} onClick={() => this.onClickDelete(index)}>
                        <HighlightOffIcon/>
                      </IconButton>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={8}>
            <Paper className=""> City Details</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
