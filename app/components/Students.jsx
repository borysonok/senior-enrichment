import React, { Component } from "react";
import axios from "axios";
import Student from "./Student";

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      switcher: 0
    };
    this.pickStudent = this.pickStudent.bind(this);
  }


  componentDidMount() {
    axios
      .get("/api/students")
      .then(result => result.data)
      .then(allStudents => {
        allStudents.sort((a, b) => {
          return a.lastName > b.lastName;
        });
        this.setState({
          students: allStudents
        });
      });
  }


  pickStudent(student) {
    if (student) {
      this.setState({
        selectedStudent: student,
        switcher: student.id
      });
    } else {
      this.setState({
        selectedStudent: {},
        switcher: 0
      });
    }
  }


  render() {
    return (
      <div>
        {this.state.switcher === 0 ? (
          <div className="container">
            <div id="greetings">Welcome to STUDENTS Page:</div>
            <hr />
            {this.state.students.map((item, index) => {
              return (
                <div key={index}>
                  <div onClick={() => this.pickStudent(item)} className="entry">
                    {item.firstName + " " + item.lastName}
                  </div>
                  <button className="deleteBtn">Delete</button>
                  <p />
                </div>
              );
            })}
            <button className="button" onClick={() => this.props.backHome('home')}>
              Home
            </button>
            
          </div>
        ) : (
            <div>
              <Student
                id={this.state.selectedStudent.id}
                selectedStudent={this.state.selectedStudent}
                pickStudent={this.pickStudent}
              />
            </div>
          )}
        </div>
    );
  }
}
