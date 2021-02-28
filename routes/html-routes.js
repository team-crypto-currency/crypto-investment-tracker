module.exports = (app) => {

  app.get("/signup", (req, res) => res.render("signup")),

  app.get("/sign-in", (req, res) => res.render("sign-in")),

  app.get("/coins", (req, res) => res.render("coins"));

};