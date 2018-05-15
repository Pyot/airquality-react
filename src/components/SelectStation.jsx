import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class SelectStation extends React.Component {

  render() {

    if (this.props.loadingTownList) {
      return (
        <div className="row mt-3">
          <div className="col-md-12 d-flex justify-content-center">
            <img src={"rings.svg"} alt="loading"/></div>
        </div>
      )
    } else if (this.props.stationListStatus) {
        
        if(this.props.stationListStatus === 'ok'){
            this.stationListStatus = '';
        } else {
            this.stationListStatus = this.props.stationListStatus;
        }
      return (
        <div>
         <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppearTimeout={1000}>
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-center">
              {this.stationListStatus && <h2>{this.stationListStatus}</h2>}
                <br/> {this.props.stationList && <form>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={this.props.selectedStation}
                      onChange={this.props.getStationPollution}>
                      <option disabled selected value>
                        Wybierz stacje
                      </option>
                      {this
                        .props
                        .stationList
                        .map(city => {
                          return (
                            <option key={city.uid} value={city.uid}>
                              {city.station.name}
                            </option>
                          )
                        })
}</select>
                  </div>
                </form>}
              </div>

            </div>
          </ReactCSSTransitionGroup>
        </div>

      );
    } else {
   
      return (
        <div>
         <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppearTimeout={1000}>

          <div className="row mt-3">
            <div className="col-md-12 d-flex justify-content-center">
           
              <br/> {this.props.stationList && <form>
                <div className="form-group">
                  <select
                    className="form-control"
                    value={this.props.selectedStation}
                    onChange={this.props.getStationPollution}>
                    <option disabled selected value>
                      Wybierz stacje
                    </option>
                    {this
                      .props
                      .stationList
                      .map(city => {
                        return (
                          <option key={city.uid} value={city.uid}>
                            {city.station.name}
                          </option>
                        )
                      })
}</select>
                </div>
              </form>}
            </div>
          </div>
          </ReactCSSTransitionGroup>
        </div>

      );
    }

  }
}

export default SelectStation;
