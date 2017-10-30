import React, { Component } from "react";
import axios from "axios";
import Campus from "./Campus";

export default class Campuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campuses: [],
      selectedCampus: {},
      switcher: 0
    };
    this.pickCampus = this.pickCampus.bind(this);
  }


  componentDidMount() {
    axios
      .get("/api/campuses")
      .then(result => result.data)
      .then(allCampuses => {
        allCampuses.sort((a, b) => {
          return a.name > b.name;
        });
        this.setState({
          campuses: allCampuses
        });
      });
  }


  pickCampus(campus) {
    if (campus) {
      this.setState({
        selectedCampus: campus,
        switcher: campus.id
      });
    } else {
      this.setState({
        selectedCampus: {},
        switcher: 0
      });
    }
    //console.log("selected campus = ", campus.id);
    //console.log("selected campus name: ", campus.name);
  }



  render() {
    return (
      <div>
        {this.state.switcher === 0 ? (
          <div className="container">
            <div id="greetings">Welcome to CAMPUSES Page:</div>
            <hr />
            {this.state.campuses.map((item, index) => {
              return (
                <div key={index}>
                  <div onClick={() => this.pickCampus(item)} className="entry">
                    {item.name}
                  </div>
                  <button className="deleteBtn">Delete</button>
                  <p />
                </div>
              );
            })}
            <button className="button" onClick={() => this.props.backHome("home")}>
              Home
            </button>
            
          </div>
        ) : (
            <div>
              <Campus
                id={this.state.selectedCampus.id}
                selectedCampus={this.state.selectedCampus}
                pickCampus={this.pickCampus}
              />
            </div>
          )}
      </div>
    );
  }
}
