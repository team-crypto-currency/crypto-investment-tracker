const isAuthenticated = require("../config/middleware/isAuthenticated");



module.exports = (app) => {

  app.get("/signup", (req, res) => res.render("signup")),

  // app.get("/coins", (req, res) => res.render("coins"));

  // If the user is signed in, let them access the coins route
  app.get("/coins", isAuthenticated, function(req, res) {
    res.render("coins");
  });

  app.get("/sign-in", function(req, res) {
    // If the user already has an account send them to the coins page
    if (req.user) {
      res.redirect("/coins");
    }
    res.render("sign-in");
  });

  // Here we've added our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/coins", isAuthenticated, function(req, res) {
    res.render("signup");
  });



};