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

    res.render("profiles/babysitter-create");

  } else if (accountType === "client") {
    await User.findByIdAndUpdate(id, { babysitter: false });

    res.render("profiles/client-create");
  }
});

// GET /

// GET /profiles/babysitter
router.get("/babysitter-edit/", isLoggedOut, (req, res) => {
  res.render("profiles/babysitter-create");
});

// POST /profiles/babysitter
router.post("/babysitter-create", isLoggedOut, (req, res) => {
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
router.get("/client-edit/", isLoggedOut, (req, res) => {
  res.render("profiles/client-create");
});

// POST /profiles/client
router.post("/client-create/", isLoggedOut, (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, image } = req.body;

  res.redirect("/client");
});

module.exports = router;
