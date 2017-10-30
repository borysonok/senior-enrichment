import React, { Component } from "react";
import axios from "axios";

// PROPS:
// this.props.id
// this.props.selectedCampus
// this.props.pickCampus
//
export default class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: {},
      campusId: 0,
      students: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/campuses/${this.props.id}/students`)
      .then(result => result.data)
      .then(allStudents => {
        this.setState({
          campus: this.props.selectedCampus,
          campusId: this.props.selectedCampus.id,
          students: allStudents
        });
      })
  }

  render() {
    return (
      <div className="container">
        <div>Campus</div>
        <hr />
        <div className="left">{"id:          " + this.state.campusId}</div>
        <div className="left">{"name:        " + this.state.campus.name}</div>
        <div className="left">{"url:         " + this.state.campus.imageURL}</div>
        <div className="left">{"description: " + this.state.campus.description}
        </div>
        <hr />     
        <div id="greetings">Student List:</div>  
        <hr />    
        <ol>
          {this.state.students[0] &&
            this.state.students.map((item, index) => (
              <li id="greetings" className="entry" key={index}>{item.firstName + " " + item.lastName}</li>
            ))}
        </ol>
        <hr />
        <button onClick={() => this.props.pickCampus(0)} className="button">
          Back
        </button>
      </div>
    );
  }
}
