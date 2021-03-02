const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const sequelize = require("sequelize");
const db = require("./models");
const passport = require("./config/passport");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve our public folder/static files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use of sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Require/import routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/passport-routes.js")(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then( () => {
  app.listen(PORT, () => console.log(`App listening on URL: http://localhost:${PORT}`));
});