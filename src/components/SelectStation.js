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
        } else  if (this.props.stationListStatus) {
           this.stationListStatus = this.props.stationListStatus;
           return(
            <div className="row mt-3">
            <div className="col-md-12 d-flex justify-content-center"> 
              {this.name}
              <br/>
              
                {this.props.stationList && <form>
                <div className="form-group">
                <select className="form-control" value={this.props.selectedStation} onChange={this.props.getStationPollution}>
                <option key="start" > Wybierz stacje </option>
                {this.props.stationList.map(city => {
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
            this.stationListStatus = this.props.stationListStatus;
            return(
             <div className="row mt-3">
             <div className="col-md-12 d-flex justify-content-center"> 
               {this.name}
               <br/>
               
                 {this.props.stationList && <form>
                 <div className="form-group">
                 <select className="form-control" value={this.props.selectedStation} onChange={this.props.getStationPollution}>
                 <option key="start" > Wybierz stacje </option>
                 {this.props.stationList.map(city => {
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

