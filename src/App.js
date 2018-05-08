import React from "react";

import MainView from "./components/MainView";
import Form from "./components/Form";
import Pollution from "./components/Pollution";
import CityPollution from "./components/CityPollution";



class App extends React.Component {
  state = {
    
    status: undefined,
    city_data: undefined,

    selected_city: undefined,

    pollution_city: undefined
  }

  constructor(props) {
    super(props)
    this.getCity = this.getCity.bind(this);
    this.getCityStation = this.getCityStation.bind(this);
  }
  
  getCity(e) {
    this.setState({selected_city: e.target.value});
    console.log('getCity');
    console.log(this.state.selected_city);
  }

  getCityStation= async (e) =>  {
    e.preventDefault();
    const city = this.state.selected_city;
    const api_call = await fetch(`https://api.waqi.info/feed/@${city}/?token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
    const data = await api_call.json();
    console.log('getCityStation');
    console.log(this.state.selected_city);
    console.log(data);
    
    this.setState({
      pollution_city: data
    });
  }

  getPollution = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`https://api.waqi.info/search/?keyword=${city}&token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
    const data = await api_call.json();
    console.log('getPollution');
    console.log(data.data.length);
    if (data.data.length === 0){
        this.setState({
        status: 'Niestety nic nie znaleźliśmy. Możemy zasugerować sprawdzenie poprawności nazwy miasta.',
        cities_data: undefined  
      })
    } else {
        this.setState({
        status: data.status,
        cities_data: data.data  
      });
    };
  }

  render(){
    return(
      <div>
        <MainView />
        
        <Form getPollution={this.getPollution}/>

        <Pollution 
        status={this.state.status}
        cities_data={this.state.cities_data}
        selected_city={this.state.selected_city}
        getCity ={this.getCity}
        getCityStation={this.getCityStation}

        />

        <CityPollution
        cityPollution = {this.state.pollution_city}
        />
       

      </div>
      
    );
  }
}

export default App;