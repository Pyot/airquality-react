import React from "react";

class Pollution extends React.Component {
   
    render() {
    
        if (this.props.loadingTownList) {
            return (
                
                <div className="row mt-3">
                 <div className="col-md-12 d-flex justify-content-center">
                 <img src={"rings.svg"} alt="loading"/></div>
                </div>
            )
        } else  if (this.props.status) {
           this.status = this.props.status;
           return(
            <div className="row mt-3">
            <div className="col-md-12 d-flex justify-content-center"> 
              {this.name}
              <br/>
              
                {this.props.cities_data && <form>
                <div className="form-group">
                <select className="form-control" value={this.props.selected_city} onChange={this.props.getStationPollution}>
                <option key="start" > Wybierz stacje </option>
                {this.props.cities_data.map(city => {
                   return  (<option key={city.uid} value={city.uid}> 
                                {city.station.name}
                            </option>)
                })
                    }</select>
                   </div>
                    </form>}
            </div>
          </div> 
        );
        } else {
            this.status = this.props.status;
            return(
             <div className="row mt-3">
             <div className="col-md-12 d-flex justify-content-center"> 
               {this.name}
               <br/>
               
                 {this.props.cities_data && <form>
                 <div className="form-group">
                 <select className="form-control" value={this.props.selected_city} onChange={this.props.getStationPollution}>
                 <option key="start" > Wybierz stacje </option>
                 {this.props.cities_data.map(city => {
                    return  (<option key={city.uid} value={city.uid}> 
                                 {city.station.name}
                             </option>)
                 })
                     }</select>
                    </div>
                     </form>}
             </div>
           </div> 
         );
        }
   
    }
}

export default Pollution; 

