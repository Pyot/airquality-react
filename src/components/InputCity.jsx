import React from 'react';

class InputCity extends React.Component {
  render() {
    return (
      <div id="InputCity" className={"row mt-4"}>
        <div className="col-md-12 d-flex justify-content-center">
          <h1 id="MainTitle">Sprawdź jakość powietrza w swoim mieście.</h1>
        </div>
        <div className="col-md-12 d-flex justify-content-center mt-5">
          <form
            className="form-inline"
            autoComplete="off"
            onSubmit={this.props.getStations}>
            <div className="form-group d-flex justify-content-center mb-0">
              <input
                className="form-control mr-2"
                type="text"
                name="city"
                placeholder="Podaj nazwę miasta..."></input>
              <button className="btn btn-pollution" type="submit">Pobierz dane</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default InputCity;