import React from "react";

class Pollution extends React.Component {
   
    render() {


        if (this.props.status === 'ok') {
            this.name = 'AlabamaTest';
            this.status = this.props.status;
            
        }
        return(
          <div>
              {this.name}
              <br/>
              {this.status}
                {this.props.cities_data && <form onChange={this.props.getCity}>
                <select value={this.props.selected_city} onChange={this.props.getCity}>{this.props.cities_data.map(city => {
                   return  (<option key={city.uid} value={city.uid}> 
                                {city.station.name}
                            </option>)
                })
                    }</select>
                    <input type="submit" value="Submit" />
                    </form>}
          </div> 
        );
    }
}

export default Pollution; 

