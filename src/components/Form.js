import React from "react";

class Form extends React.Component {
    render() {
        return(
          <form onSubmit={this.props.getPollution}>
              <input type="text" name="city" placeholder="City..."></input>
              <button>Pobierz dane</button>
          </form>
        );
    }
}

export default Form; 