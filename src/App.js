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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({selected_city: event.target.value});
    console.log('działa');
  }

  handleSubmit= async (e) =>  {
    
    e.preventDefault();
    const city = this.state.selected_city;
    const api_call = await fetch(`https://api.waqi.info/feed/@${city}/?token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
    const data = await api_call.json();
    console.log(data);
    this.setState({
      pollution_city: data
    })
    alert('Your favorite flavor is: ' + this.state.pollution_city.status);
    
  }

  getPollution = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`https://api.waqi.info/search/?keyword=${city}&token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
    const data = await api_call.json();
    console.log(data);
    this.setState({
      status: data.status,
      cities_data: data.data
     
    })
  
  }

  getCityPollution = async (e) => {
    e.preventDefault();
    const city = e.target.value;
    const api_call = await fetch(`https://api.waqi.info/feed/@${city}/?token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
    const data = await api_call.json();
    console.log(data);
    this.setState({
      pollution_city: data.status
     
    })
  
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
        handleChange ={this.handleChange}
        handleSubmit={this.handleSubmit}
        getCityPollution={this.getCityPollution}

        />

        <CityPollution
        cityPollution = {this.state.pollution_city}
        />
       

      </div>
      
    );
  }
}

export default App;