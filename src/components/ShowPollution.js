import React from "react";

class ShowPollution extends React.Component {
    
    constructor (props) {
        super(props)
        this.info = {
            
            "pm25": {
                "normalizer": 100/71,
                "name": "PM 2.5",
                "norms":[[35, 'bar-green'], [53, 'bar-orange'],[71, 'bar-red']]},
            "pm10": {
                "normalizer": 100/101,
                "name": "PM 10",
                "norms":[[40, 'bar-green'], [75, 'bar-orange'],[101, 'bar-red']]},
            "no2": {
                "normalizer": 100/601,
                "name": "No2",
                "norms":[[200, 'bar-green'], [400, 'bar-orange'],[601, 'bar-red']]},
            "so2": {
                "normalizer": 100/1065,
                    "name": "So2",
                    "norms":[[266, 'bar-green'],[532, 'bar-orange'],[1065, 'bar-red']]},
            "o3": {
                "normalizer": 100/241,
                    "name": "o3",
                    "norms":[[100, 'bar-green'],[160, 'bar-orange'],[241, 'bar-red']]},

        }
    }
  

    render(){
        console.log("1111111111", this.props.stationName);
      if(this.props.stationStatus){
          this.stationStatus = this.props.stationStatus;
      }
        if(this.props.stationName){
            console.log("1111111AAAAAAA" ,this.props.stationName);
            this.stationName =  this.props.stationName;
        } else {
            this.stationName = null;
        }
        console.log("22222222222" ,this.props.stationName);
        if(this.props.stationPollution){          
            this.stationPollution = this.props.stationPollution; 
        
        } else {
            this.stationPollution = null;
        }

        if(this.props.loadingTownList){
            return (
                
                <div>
                    
                </div>
            )
        } else if (this.props.loadingStation) {
            return (
                
                <div className="row mt-3">
                 <div className="col-md-12 d-flex justify-content-center">
                 <img src={"rings.svg"} alt="loading"/></div>
                </div>
            )
        } else {
            console.log("333333333333" ,this.props.stationName);
            return (
                
            <div id="ShowPollution" className="row mt-4">
                <div className="col-md-12 d-flex justify-content-center">
                    {this.stationStatus && <h2>{this.stationStatus}</h2>}
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    {/* {this.dataCity && this.dataCity.data && this.dataCity.data.city && <h2 id="CityTitle"><b>{this.dataCity.data.city.name}</b></h2>} */}
                    {this.stationName && <h2 id="CityTitle"><b>{this.stationName}</b></h2>}

                </div>
                <div className="col-md-12 d-flex justify-content-center">
                {this.stationPollution && <div className="col-md-10" >
                        {Object.keys(this.stationPollution).map((pollution, i) => {
                            let pollutionValue = this.stationPollution[pollution]['v'];
                            let info = this.info[pollution];
                            let colorBar;
                            let colorLegendBarGreen;
                            let colorLegendBarOrange;
                            let colorLegendBarRed;
                            let widthBar = pollutionValue;
                            
                               if(  pollution === "pm25" ||
                                    pollution === "pm10" ||
                                    pollution === "no2"  ||
                                    pollution === "so2"  ||
                                    pollution === "o3"
                               )
                               {
                                widthBar = pollutionValue * info['normalizer'];
                                colorLegendBarGreen = info['norms'][0][0] * info['normalizer'];
                                colorLegendBarOrange = info['norms'][1][0] * info['normalizer'] - colorLegendBarGreen;
                                colorLegendBarRed = info['norms'][2][0] * info['normalizer'] - colorLegendBarOrange - colorLegendBarGreen;
                                console.log(colorLegendBarGreen);
                                console.log(colorLegendBarOrange);
                                console.log(colorLegendBarRed);
                                if (pollutionValue <= info['norms'][0][0]) {
                                    colorBar = info['norms'][0][1];
                                
                                }
                                else if (pollutionValue <= info['norms'][1][0]) {
                                    colorBar = info['norms'][1][1]
                                }
                                else {
                                    colorBar = info['norms'][2][1]
                                };
                                return (
                                    <div key={i} className="row mt-2">
                                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                                   <h4 className="mb-0">{this.info[pollution]['name']}</h4>
                                   </div>
                                   <div className="col-md-10">
                                   <div className="progress legend" style={{height: '3px'}}>
                                        <div className="progress-bar bar-green-info" role="progressbar" style={{width: colorLegendBarGreen + "%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar bar-orange-info" role="progressbar" style={{width: colorLegendBarOrange + "%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        <div className="progress-bar bar-red-info" role="progressbar" style={{width: colorLegendBarRed + "%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                    <div className="progress" style={{height: '30px'}}>
                                    
                                    <div className={"progress-bar " + colorBar} role="progressbar" style={{width: widthBar+ '%'}}  aria-valuenow={this.stationPollution[pollution]['v']} aria-valuemax="10">{this.stationPollution[pollution]['v']}
                                    </div>
                                  </div>
                                  </div>
                                  </div>
                            )
                               } 
                            })}
                    </div>} 
                </div>
            </div> 
            ) 
        }

       
        
    
    }
}

export default ShowPollution;