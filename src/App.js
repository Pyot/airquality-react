import React from "react";

// import Form from "./components/Form";
// import Pollution from "./components/Pollution";
// import CityPollution from "./components/CityPollution";

import InputCity from "./components/InputCity";
import SelectStation from "./components/SelectStation";
import ShowPollution from "./components/ShowPollution";



class App extends React.Component {
  state = {
    //Status request po wykonaniu getStations()
    //stationListStatus
    stationListStatus: undefined,
    //stationList
    //Lista stacji przekazywana do <select>
    stationList: undefined,

    //stationName
    stationName: undefined,
    // Status reuqest po wykonaniu getStationPollution()
    //stationStatus
    stationStatus : undefined,

    //Wybrana stracja z listy select
    //selectedStation
    selectedStation: undefined,
    //stationPollution
    stationPollution: undefined,

    //Wykorzystywane do wywoływania statusu "loading" 
    loadingTownList: false,
    loadingStation: false,

  }

  constructor(props) {
    super(props)
    this.getStationPollution = this.getStationPollution.bind(this);
    // this.getStations = this.getStations.bind(this);
    
  }


  //Input - City Name (String), Zwraca - Liste stacji w danym mieście (Array)
  getStations = (e) => {
    console.log('getStations');
    e.preventDefault();
    
    this.setState({
      stationListStatus: undefined,
      stationList: {"status": "ok", "data" : { "iaqi" : { "brak" : { "v": 'Brak danych'}}}},
      loadingTownList: true,
      selectedStation: undefined,

      // Zerowanie danych poprzednio wyszukanego miasta
      stationName: null,
      // Zerowanie danych poprzednio wybraje stacji
      stationPollution: undefined,
      
    })

    const city = e.target.elements.city.value;
    // fetch(`https://api.waqi.info/search/?keyword=${city}&token=7c200db3b52810d3f6a68b989445e0289d3428b8`)
    fetch(`citylist.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.data.length === 0 || data.status === "error" || data.status === "nug" ) {
          
          console.log(data.data.length);
          this.setState({
            stationListStatus: 'Niestety nic nie znaleźliśmy. Możemy zasugerować sprawdzenie czy nie brakuje polskich znaków. Niebawem to poprawimy...',
            stationList: undefined,
            loadingTownList: false,
            
          })
        } else {
          this.setState({
            stationListStatus: data.status,
            stationList: data.data,
            loadingTownList: false,
          })
        }
      });
  }


  getStationPollution = (e) => {

    this.setState({
     stationListStatus: undefined,
     stationName: undefined,
    stationStatus : undefined,
    stationPollution: undefined,
    loadingStation: true,
    selectedStation: e.target.value,
    })
   
    const city = e.target.value;
   
    
    // fetch(`https://api.waqi.info/feed/@${city}/?token=7c200db3b52810d3f6a68b989445e0289d3428b8`)
    fetch(`${city}.json`)
    .then((data) => {
     
      console.log(data);
      this.setState({
        stationPollution: undefined,
        loadingStation: true,
      })
      
      return data.json()
    })
    .then((data) => {
     
     if ((((data || {}).data) || {}).iaqi) {
        
        console.log('jest iaqi: ', data.data);
        this.setState({
         
          //dataCity: data,
          stationName: data.data.city.name,
          stationStatus: data.status,
          stationPollution: data.data.iaqi,
          
          loadingStation: false
        });
        console.log(this.state.stationName);
      } else if(((data || {}).status) || {})  {
        this.setState({
          
          // dataCity: {"status": "ok", "data" : { "iaqi" : { "pm25" : { "v": 100}, "city": {"name": "Niestety nastąpił problem z połączeniem z serwerem. Spróbuj za chwilę."}}}},
          stationName: "Brak danych spróbuj za chwilę.",
          stationStatus: data.status,
          stationPollution:  null,
         
          loadingStation: false
        });

      }

      return data
    }).catch((error) => {
      console.log('Error: ',error);
      this.setState({
        
        stationName: "Error",
        stationPollution:  undefined,
        stationStatus: "Błąd",
        loadingStation: false
      });
    })
    
  }



  render() {
    return ( 
      <div id="MainView" className="container-fluid d-flex align-items-center pl-0 pr-0">
      <div className="container ">
    
      <InputCity 
        getStations = {this.getStations}
      />

      <SelectStation 
        stationListStatus = {this.state.stationListStatus}
        stationList = {this.state.stationList}
        selectedStation = {this.state.selectedStation}
        getStationPollution = {this.getStationPollution}
        getCityStation = {this.getCityStation}
        loadingTownList = {this.state.loadingTownList}
      />

      <ShowPollution 
        stationPollution = {this.state.stationPollution}
        stationName = {this.state.stationName}
        stationStatus = {this.state.stationStatus}
        loadingStation = {this.state.loadingStation}
        loadingTownList = {this.state.loadingTownList}
      />

      </div>
      </div>

    );
  }
}

export default App;