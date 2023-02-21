// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerHelper("isBabysitter", function () {
  return req.session.currentUser = true;
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "kiddoscare";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

/* let login = document.querySelector(".signup-btn");
let logout = document.querySelector(".logout-btn");

login.addEventListener('click', function(e) {
  this.classList.add('is-hidden')
  logout.classList.remove('is-hidden');
})

logout.addEventListener('click', function(e) {
  this.classList.add('is-hidden');
  login.classList.remove('is-hidden');
}) */

function showPassword() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/* var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirmPassword");

   */

module.exports = app;
