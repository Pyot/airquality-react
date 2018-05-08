import React from "react";

class CityPollution extends React.Component {

  

    render(){
        return (
            <div>
            {this.props.cityPollution && <p>Status: {this.props.cityPollution.status} </p>}
              
        </div> 
        )
    }
}

export default CityPollution;