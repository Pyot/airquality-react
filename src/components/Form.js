import React from 'react';

class Form extends React.Component {
    render() {
        return(
        <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-center"><h1 id="MainTitle">Sprawdź jakość powietrza w swoim mieście.</h1></div>
        
        <div className="col-md-12 d-flex justify-content-center mt-5">
        
        
          <form className="form-inline" onSubmit={this.props.getStations}>
            <div className="form-group">
              <input className="form-control mr-2" type="text" name="city" placeholder="Podaj nazwę miasta..."></input>
              <button className="btn btn-pollution" type="submit" >Pobierz dane</button>
              </div>
          </form>
          </div>
          </div>
        );
    }
}

export default Form; 