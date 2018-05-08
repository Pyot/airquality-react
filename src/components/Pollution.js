import React from "react";

class Pollution extends React.Component {
    render() {
        return(
          <div>
              {this.props.status}
                {this.props.cities_data && <form onSubmit={this.props.handleSubmit}>
                <select value={this.props.selected_city} onChange={this.props.handleChange}>{this.props.cities_data.map(city => {
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

