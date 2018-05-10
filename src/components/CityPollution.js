import React from "react";

class CityPollution extends React.Component {
    
  

    render(){
      this.loadingStatus = this.props.loadingStatus;
        if(this.props.dataCity){
            this.dataCity =  this.props.dataCity;
        }
        if(this.props.pollutionCity){
            
            this.pollutionCity = this.props.pollutionCity;
            
           console.dir(typeof(this.pollutionCity));
           console.log(this.pollutionCity.pm25);


        }
        
        return (
            <div>
                {this.loadingStatus && <h2>{this.loadingStatus}</h2>}
                {this.dataCity && <h2>{this.dataCity.status}</h2>}
                {this.dataCity && this.dataCity.data && <h2>{this.dataCity.data.city.name}</h2>}
                {this.pollutionCity && <ul>
                    {Object.keys(this.pollutionCity).map((pollution) => {return (<li>{pollution}:  {this.pollutionCity[pollution]['v']}</li>)} )}
                </ul>}
                    
        </div> 
        )
    }
}

export default CityPollution;