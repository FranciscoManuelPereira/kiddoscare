const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/options
router.get("/options", isLoggedOut, (req, res) => {
  /*   if(req.session.currentUser.babysitter) res.render("profiles/babysitter-edit")
      else res.render("profiles/client-edit") */
  res.render("profiles/options");
});

// POST /auth/options
router.post("/options", isLoggedOut, (req, res, next) => {
  res.render("profiles/options"); 
});

// GET /profiles/babysitter
router.get("/babysitter-edit", isLoggedOut, (req, res) => {
  res.render("profiles/babysitter-edit");
});

// POST /profiles/babysitter
router.post("/babysitter-edit", isLoggedOut, (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    image,
    age,
    experience,
    criminalRecord,
    disponibility,
    linkedin,
    language,
    area,
  } = req.body;

  res.render("profiles/babysitter", req.body);
});

// GET /profiles/client
router.get("/client-edit", isLoggedOut, (req, res) => {
  res.render("profiles/client-edit");
});

// POST /profiles/client
router.post("/client-edit", isLoggedOut, (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, image } = req.body;

  res.render("profiles/client", req.body);
});

module.exports = router;
