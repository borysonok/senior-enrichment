import React, { Component } from "react";
import axios from "axios";

// PROPS:
// this.props.id
// this.props.selectedStudent
// this.props.pickStudent
//
export default class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            studentId: 0
        };
    }

    componentDidMount() {
        this.setState({
            student: this.props.selectedStudent,
            studentId: this.props.selectedStudent.id
        });
    }

    render() {
        return (
            <div className="container">
                <div>Student</div>
                <hr />
                <div className="left">{"id:            " + this.state.studentId}</div>
                <div className="left">{"first name:    " + this.state.student.firstName}</div>
                <div className="left">{"last name:     " + this.state.student.lastName}</div>
                <div className="left">{"gpa:           " + this.state.student.gpa}</div>
                <div className="left">{"email:         " + this.state.student.email}</div>
                <div className="left">{"campus id:     " + this.state.student.campusId}</div>
                <hr />
                <button onClick={() => this.props.pickStudent(0)} className="button">
                    Back
                 </button>
            </div>
        );
    }
}
