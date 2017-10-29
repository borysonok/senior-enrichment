const Sequelize = require("sequelize");
const db = require("../../db/index");

// Campuses
// * have info such as a name, imageUrl, and description
// * name should not be allowed to be empty or null
// * imageUrl should have a default value
// * description should allow an extremely large description
// * can have many students assigned (may have none)

///////////////////////////////////////////////////////////////

module.exports = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: "campusName"
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "https://campusName.com"
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "here is a campus description..."
  }
});
