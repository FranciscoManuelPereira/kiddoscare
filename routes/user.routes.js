const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/options
router.get("/options", isLoggedIn, (req, res) => {
  res.render("profiles/options");
});

// POST /auth/options
router.post("/options", isLoggedIn, async (req, res, next) => {
  const { accountType } = req.body;
  const id = req.session.currentUser._id;

  if (accountType === "babysitter") {
    await User.findByIdAndUpdate(id, { babysitter: true });

    res.render("profiles/babysitter-edit");

  } else if (accountType === "client") {
    await User.findByIdAndUpdate(id, { babysitter: false });

    res.render("profiles/client-edit");
  }
});

// GET /

// GET /profiles/babysitter
router.get("/babysitter-edit/:id", isLoggedOut, (req, res) => {
  res.render("profiles/babysitter-edit");
});

// POST /profiles/babysitter
router.post("/babysitter-edit/:id", isLoggedOut, (req, res) => {
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

  res.redirect("/babysitter");
});

// GET /profiles/client
router.get("/client-edit/:id", isLoggedOut, (req, res) => {
  res.render("profiles/client-edit");
});

// POST /profiles/client
router.post("/client-edit/:id", isLoggedOut, (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, image } = req.body;

  res.redirect("/client");
});

module.exports = router;
