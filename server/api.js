"use strict";
const api = require("express").Router();
const db = require("../db");
const Student = require("../db/models").Student;
const Campus = require("../db/models").Campus;

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!

api.get("/hello", (req, res) => res.send({ hello: "world" }));

////////////////////////////////////////////////////////////////////////
/////////////////////////////// GET ////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//////////////////////     GET: '/API/CAMPUSES'    /////////////////////
// To Get all Campuses...
api.get("/campuses", function(req, res, next) {
  Campus.findAll()
    .then(function(allCampuses) {
      res.json(allCampuses);
    })
    .catch(next);
});
//////////////////////     GET: '/API/CAMPUSES/:ID'     ////////////////
// To get only one Campus...
api.get("/campuses/:id", function(req, res, next) {
  Campus.findById(req.params.id)
    .then(function(oneCampus) {
      res.json(oneCampus);
    })
    .catch(next);
});
//////////////////////     GET: '/API/STUDENTS'    /////////////////////
// To Get all Students...
api.get("/students", function(req, res, next) {
  Student.findAll()
    .then(function(allStudents) {
      res.json(allStudents);
    })
    .catch(next);
});
//////////////////////     GET: '/API/STUDENTS/:ID'     ////////////////
// To get only one Student...
api.get("/students/:id", function(req, res, next) {
  Student.findById(req.params.id)
    .then(function(oneStudent) {
      res.json(oneStudent);
    })
    .catch(next);
});
//////////////////   GET: '/API/STUDENTS/NAMES/:NAME'  /////////////////
// To find only one student BY FULL NAME (firstName + ' ' + lastName)!!!
api.get("/students/names/:name", function(req, res, next) {
  Student.findOne({
    where: {
      firstName: req.params.name.split(" ")[0],
      lastName: req.params.name.split(" ")[1]
    }
  })
    .then(function(oneStudent) {
      res.json(oneStudent);
    })
    .catch(next);
});
/////////////////  GET: '/API/CAMPUSES/:ID/STUDENTS'   /////////////////
// To get ALL students from specified campus...
api.get("/campuses/:id/students", function(req, res, next) {
  Campus.findById(req.params.id)
    .then(oneCampus => oneCampus.getStudents())
    .then(allStudents => res.json(allStudents))
    .catch(next);
});

////////////////////////////////////////////////////////////////////////
///////////////////////////// POST /////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//////////////////////    POST: '/API/CAMPUSES/'   /////////////////////
// To create new Campus...
api.post("/campuses", function(req, res, next) {
  Campus.create(req.body)
    .then(oneCampus => {
      res.json(oneCampus);
    })
    .catch(next);
});
//////////////////////    POST: '/API/STUDENTS/'  /////////////////////
// To create new Student...
api.post("/students", function(req, res, next) {
  Student.create(req.body)
    .then(oneStudent => {
      res.json(oneStudent);
    })
    .catch(next);
});

///////////////////////////////////////////////////////////////////////
////////////////////////////// PUT ////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/////////////////////////   PUT: '/API/CAMPUSES/:ID'   ////////////////
// To update info for specified campus...
api.put("/campuses/:id", function(req, res, next) {
  Campus.findById(req.params.id)
    .then(oneCampusPromise => oneCampusPromise.update(req.body))
    .then(updatedCampus => res.json(updatedCampus));
});
/////////////////////////   PUT: '/API/STUDENTS/:ID'   ////////////////
// To update info for specified student...
api.put("/students/:id", function(req, res, next) {
  Student.findById(req.params.id)
    .then(oneStudentPromise => oneStudentPromise.update(req.body))
    .then(updatedStudent => res.json(updatedStudent));
});

////////////////////////////////////////////////////////////////////////
////////////////////////////// DELETE //////////////////////////////////
////////////////////////////////////////////////////////////////////////

///////////////////////////  DELETE: 'API/CAMPUSES/:ID'  ///////////////
// To delete specified campus and then return the rest...
api.delete("/campuses/:id", function(req, res, next) {
  Campus.destroy({
    where: { id: req.params.id }
  })
    .then(() => Campus.findAll())
    .then(remainingCampuses => res.json(remainingCampuses))
    .catch(next);
});
///////////////////////////  DELETE: 'API/STUDENTS/:ID'  ///////////////
// To delete specified student and then return the rest...
api.delete("/students/:id", function(req, res, next) {
  Student.destroy({
    where: { id: req.params.id }
  })
    .then(() => Student.findAll())
    .then(remainingStudents => res.json(remainingStudents))
    .catch(next);
});

////////////////////////////////////////////////////////////////////////
////////////////////////////// EXPORT //////////////////////////////////
////////////////////////////////////////////////////////////////////////

module.exports = api;
