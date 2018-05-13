import React from "react";

import Form from "./components/Form";
import Pollution from "./components/Pollution";
import CityPollution from "./components/CityPollution";



class App extends React.Component {
  state = {

    status: undefined,
    dataCity: undefined,
    dataCityStatus : undefined,

    selected_city: undefined,

    pollutionCity: undefined,
    loadingTownList: false,
    loadingStation: false,

  }

  constructor(props) {
    super(props)
    this.getStationPollution = this.getStationPollution.bind(this);
    // this.getStations = this.getStations.bind(this);
    
  }

  getStations = (e) => {
    console.log('getStations');
    e.preventDefault();

    this.setState({
      status: undefined,
      dataCity: {"status": "ok", "data" : { "iaqi" : { "pm25" : { "v": ''}}}},
    dataCityStatus : undefined,
    cities_data: {"status": "ok", "data" : { "iaqi" : { "brak" : { "v": 'Brak danych'}}}},
    selected_city: undefined,

    pollutionCity: {"status": "ok", "data" : { "iaqi" : { "clear" : { "v": 'clear'}}}},
    loadingTownList: true,
    })
    const city = e.target.elements.city.value;
    fetch(`https://api.waqi.info/search/?keyword=${city}&token=7c200db3b52810d3f6a68b989445e0289d3428b8`)
    // fetch(`citylist.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.data.length === 0 || data.status === "error" || data.status === "nug" ) {
          
          console.log(data.data.length);
          this.setState({
            status: 'Niestety nic nie znaleźliśmy. Możemy zasugerować sprawdzenie czy nie brakuje polskich znaków. Niebawem to poprawimy...',
            cities_data: undefined,
            loadingTownList: false,
          })
        } else {
          this.setState({
            status: data.status,
            cities_data: data.data,
            loadingTownList: false,
          })
        }
      });
  }


  getStationPollution = (e) => {

    this.setState({
      status: undefined,
      dataCity: {"status": "ok", "data" : { "iaqi" : { "brak" : { "v": 'Brak danych'}}}},
    dataCityStatus : undefined,
    pollutionCity: undefined,
    loadingStation: true,
    selected_city: e.target.value,
    })
  
    
   
    const city = e.target.value;
   
    
    fetch(`https://api.waqi.info/feed/@${city}/?token=7c200db3b52810d3f6a68b989445e0289d3428b8`)
    // fetch(`${city}.json`)
    .then((data) => {
     
      console.log(data);
      this.setState({
        pollutionCity: undefined,
        loadingStation: true,
      })
      
      return data.json()
    })
    .then((data) => {
     
     if ((((data || {}).data) || {}).iaqi) {
        
        console.log('jest iaqi: ', data.data);
        this.setState({
         
          dataCity: data,
          dataCityStatus: data.status,
          pollutionCity: data.data.iaqi,
          loadingStation: false
        });
  
      } else if(((data || {}).status) || {})  {
        this.setState({
         
          dataCity: {"status": "ok", "data" : { "iaqi" : { "pm25" : { "v": 100}, "city": {"name": "Niestety nastąpił problem z połączeniem z serwerem. Spróbuj za chwilę."}}}},
          pollutionCity:  { "pm25": {"v":100}},
          dataCityStatus: data.status,
          loadingStation: false
        });

      }

      return data
    }).catch((error) => {
      console.log('Error: ',error);
      this.setState({
        loadingStatus: 'Niestety wystąpił błąd. Spróbuj ponownie za chwilę',
        dataCity: {"status": "ok", "data" : { "iaqi" : { "brak" : { "v": 'Brak danych'}}}},
        pollutionCity:  { "Status" : { "v": 'Spróbuj za chwilę'}},
        dataCityStatus: "Błąd",
        loadingStation: false
      });
    })
    
  }



  render() {
    return ( <div id="MainView" className="container-fluid d-flex align-items-center pl-0 pr-0">
              <div className="container ">
    
      <Form getStations = {
        this.getStations
      }/>

      <Pollution status = {this.state.status}
      cities_data = {this.state.cities_data}
      selected_city = {this.state.selected_city}
      getStationPollution = {this.getStationPollution}
      getCityStation = {this.getCityStation}
      loadingTownList = {this.state.loadingTownList}
      />

      < CityPollution pollutionCity = {this.state.pollutionCity}
      dataCity = {this.state.dataCity}
      dataCityStatus = {this.state.dataCityStatus}
      loadingStation = {this.state.loadingStation}
      loadingTownList = {this.state.loadingTownList}
      />
      </div>
      </div>

    );
  }
}

export default App;