const Sequelize = require("sequelize");
const db = require("../../db/index");

// Students
// * have profile info including firstName, lastName, email, and gpa
// * firstName and lastName should not be empty or null
// * should have a virtual 'name' field which is the concatenation of firstName and lastName
// * email should not be null and should ensure valid email
// * gpa should be a float (decimal) between 0.0 and 4.0
// * must be assigned to a campus

///////////////////////////////////////////////////////////////////////////

module.exports = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: "First_Name"
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: "Last_Name"
  },
  gpa: {
    //type: Sequelize.RANGE(Sequelize.DECIMAL(0.0, 4.0)) ??????????????? HELP !!!!!
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 4.0
    },
    defaultValue: 4.0
  },
  name: {
    type: Sequelize.VIRTUAL,
    set: function(val) {
      let fn = this.getDataValue("firstName");
      let ln = this.getDataValue("lastName");
      let fullName = fn + "_" + ln;
      this.setDataValue("email", fullName + "@gmail.com");
      this.setDataValue("name", fullName);
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false,
    defaultValue: "someName@gmail.com"
  }
});

///////////////////////////////////////////////////////////////////////////
//
// ===============  HELP: ===============================
// 1)
// How to use VIRTUAL with get and set?
// How to properly set a value for name and email???
// I need to set email as sum of firstName + lastName....
// But it is always null in the DB field ???!!!

// 2)
// How to make ranges using Sequelize.RANGE type ???
//
