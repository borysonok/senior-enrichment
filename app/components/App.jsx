import React, { Component } from "react";
import axios from "axios";
import Campuses from "./Campuses";
import Students from "./Students";

export default class App extends Component {
  constructor() { 
    super();
    this.state = {
      switcher: 'home'
    }
    this.setSwitcher = this.setSwitcher.bind(this);
  }


  setSwitcher(choice) { 
    this.setState({ switcher: choice })
  }


  render() {
    return (
      <div>
        {
          this.state.switcher === 'home' ?
          <div>
            <h1 id="greetings">Welcome To Margaret Hamilton Interplanetary Academy</h1>
            <hr />
            <br />
            <div className="center">
              <button onClick={() => { this.setSwitcher('campuses') }} className="button">CAMPUSES</button>
              <button onClick={() => { this.setSwitcher('students') }} className="button">STUDENTS</button>
            </div>
            <br />
            <hr />
            <div id="greetings" className="center">Choose your destiny:</div>
          </div>
          :
          this.state.switcher === 'campuses' ?
              <div><Campuses backHome={this.setSwitcher}/></div> : <div><Students backHome={this.setSwitcher}/></div>
        }
      </div>
    );
  }
}
