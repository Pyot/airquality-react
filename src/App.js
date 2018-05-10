import React from "react";

import MainView from "./components/MainView";
import Form from "./components/Form";
import Pollution from "./components/Pollution";
import CityPollution from "./components/CityPollution";



class App extends React.Component {
  state = {

    status: undefined,
    dataCity: undefined,

    selected_city: undefined,

    pollutionCity: undefined,
    lodingSatus: 'Loading ...',

  }

  constructor(props) {
    super(props)
    this.getCity = this.getCity.bind(this);
    // this.getCityStation = this.getCityStation.bind(this);
  }

  // getPollution = async (e) => {
  //   e.preventDefault();
  //   const city = e.target.elements.city.value;
  //   const api_call = await fetch(`https://api.waqi.info/search/?keyword=${city}&token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
  //   const data = await api_call.json();
  //   console.log('getPollution');
  //   console.log(data);
  //   console.log(data.data.length);
  //   if (data.data.length === 0){
  //       this.setState({
  //       status: 'Niestety nic nie znaleźliśmy. Możemy zasugerować sprawdzenie poprawności nazwy miasta.',
  //       cities_data: undefined  
  //     })
  //   } else {
  //       this.setState({
  //       status: data.status,
  //       cities_data: data.data  
  //     });
  //   };
  // }

  getPollution = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    fetch(`https://api.waqi.info/search/?keyword=${city}&token=4e9a9b9811fab51ec451adc577b177e3fef457b1`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {

        console.log(data)

        if (data.data.length === 0) {
          this.setState({
            status: 'Niestety nic nie znaleźliśmy. Możemy zasugerować sprawdzenie poprawności nazwy miasta.',
            cities_data: undefined
          })
        } else {
          this.setState({
            status: data.status,
            cities_data: data.data
          })
        }
      });

  }


  getCity(e) {
    this.setState({
      selected_city: e.target.value,
      loadingStatus: 'Loading ...'
    });

    console.log('getCity');
    console.log(this.state.selected_city);
    const city = e.target.value;
    fetch(`https://api.waqi.info/feed/@${city}/?token=4e9a9b9811fab51ec451adc577b177e3fef457b1`)
    .then((data) => {
      this.setState({
        pollutionCity: undefined,
        loadingStatus: 'Loading .....'
      })
      return data.json()
    })
    .then((data) => {
    
      if ((((data || {}).data) || {}).iaqi) {
        console.log('jest iaqi');
        console.log(data.data);
        this.setState({
          loadingStatus: '',
          dataCity: data,
          pollutionCity: data.data.iaqi,
        });
  
      }
    })
  }

  // getCityStation = async (e) => {
  //   e.preventDefault();
  //   const city = this.state.selected_city;
  //   const api_call = await fetch(`https://api.waqi.info/feed/@${city}/?token=4e9a9b9811fab51ec451adc577b177e3fef457b1`);
  //   const data = await api_call.json();
  //   console.log('getCityStation');
  //   console.log(this.state.selected_city);

  //   this.setState({
  //     pollutionCity: undefined,
  //   })
  //   if ((((data || {}).data) || {}).iaqi) {
  //     console.log('jest iaqi');
  //     console.log(data.data);
  //     this.setState({
  //       dataCity: data,
  //       pollutionCity: data.data.iaqi,
  //     });

  //   }


  // }






  render() {
    return ( <div>
      <MainView />

      <Form getPollution = {
        this.getPollution
      }/>

      <Pollution status = {this.state.status}
      cities_data = {this.state.cities_data}
      selected_city = {this.state.selected_city}
      getCity = {this.getCity}
      getCityStation = {this.getCityStation}/>

      < CityPollution pollutionCity = {this.state.pollutionCity}
      dataCity = {this.state.dataCity}
      loadingStatus = {this.state.loadingStatus}
      />

      </div>

    );
  }
}

export default App;