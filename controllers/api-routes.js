var db = require("../models");

// =============================================================
module.exports = function (app) {

  // Main line into the application
  app.get("/", function (req, res) {
    db.burgers.findAll({order: ["name"]}).then(function (results) {
      var burgers = {burger: JSON.parse(JSON.stringify(results))};
      res.render("index", burgers);
    }).catch(function (err) {
      throw err;
    });
  });

  // GET route for getting all of the burgers
  app.get("/api/burgers", function (req, res) {
    db.burgers.findAll({order: ["name"]}).then(function (results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // POST route for making a new burger. 
  app.post("/api/burgers", function (req, res) {
    db.burgers.create({
      name: req.body.name,
      eaten: false
    }).then(function () {
      res.status(200).end();
    }).catch(function (err) {
      throw err;
    })
  });


  // PUT route for eating burgers
  app.put("/api/burgers/:id", function (req, res) {
    db.burgers.update({
      eaten: req.body.eaten
    }, {
      where: {
        id: req.params.id
      }
      }).then(function () {
        res.status(200).end();
      }).catch(function (err) {
        throw err;
      })
  });
};
