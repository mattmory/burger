var db = require("../models");

// =============================================================
module.exports = function (app) {

  // Main line into the application
  app.get("/", function (req, res) {
      var burgers;
      var champions;
      db.burgers.findAll({ order: ["name"] })
        .then(function (results) {
          burgers = {burger: JSON.parse(JSON.stringify(results))};         
          db.burgers.findAll({
            attributes: ["eaten_by", 
              [db.sequelize.fn("count", db.sequelize.col("name")),"count"]], 
              where: {"eaten":  true},
              group: ["eaten_by"],
           order: db.sequelize.literal("count(name) DESC")
          })
            .then(function (results) {
              champions = {champion: JSON.parse(JSON.stringify(results))};
              
            })
            .then(function () {
               res.render("index",{burgers,champions});
            })
        });
      });

  // GET route for getting all of the burgers
  app.get("/api/burgers", function (req, res) {
    var burgers;
    var champions; // = {"champion": [{"champ": "Matt","burgs": 5},{"champ": "Bill","burgs": 3}]};
    db.burgers.findAll({ order: ["name"] })
      .then(function (results) {
        burgers = {burger: JSON.parse(JSON.stringify(results))};
        db.burgers.findAll({
          attributes: ["eaten_by", 
            [db.sequelize.fn("count", db.sequelize.col("name")),"count"]], 
            where: {"eaten":  true},
            group: ["eaten_by"],
         order: db.sequelize.literal("count(name) DESC")
        })
          .then(function (results) {
            champions =  {champion: JSON.parse(JSON.stringify(results))};
          })
          .then(function () {
           // res.json({ "burgers": burgers, "champions": champions });
            res.json({burgers, champions});
          })
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
        eaten: req.body.eaten,
        eaten_by: req.body.eaten_by
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
