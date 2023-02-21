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

    res.redirect("/babysitter-create");

  } else if (accountType === "client") {
    await User.findByIdAndUpdate(id, { babysitter: false });

    res.redirect("/client-create");
  }
});


// GET /profiles/babysitter-create
router.get("/babysitter-create", isLoggedIn, (req, res) => {
  res.render("profiles/babysitter-create");
});

/* router.get("/babysitter-create", isLoggedIn, async (req, res, next) => {
try {
  const {id} = req.params;
  const {firstName, lastName, email} = req.body;

  await User.findById(id, {firstName, lastName, email});

  res.render("profiles/babysitter-create", {firstName, lastName, email});
  
} catch (error) {
  console.log(error);
  next(error);
}
  
}); */

// POST /profiles/babysitter-create
router.post("/babysitter-create", isLoggedIn, (req, res) => {
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

// GET /profiles/client-create
router.get("/client-create", isLoggedIn, (req, res) => {
  res.render("profiles/client-create");
});

// POST /profiles/client-create
router.post("/client-create", isLoggedIn, (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, image } = req.body;

  res.redirect("/client");
});


// GET /client
router.get("/client", isLoggedIn, async (req, res, next) => {
try {
const user = req.session.currentUser

  res.render("profiles/client", {user})
  
} catch (error) {
  console.log(error);
  next(error);
}
  
})

// GET /babysitter
router.get("/babysitter", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser

    res.render("profiles/babysitter", {user})

} catch (error) {
  console.log(error)
  next(error)
}
})


// GET /babysitter-edit
router.get("/babysitter-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const babysitter = await User.findById(id);
    res.render("profiles/babysitter-edit", {babysitter})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// POST /babysitter-edit
router.post("/babysitter-edit/:id", async (req, res, next) => {
  const {id} = req.params;
  const {firstName, lastName, email, password, phoneNumber, image, age, experience, criminalRecord, language, area} = req.body;
  try {
    const updatedUserBabysitter = await User.findByIdAndUpdate(id, {firstName, lastName, email, password, phoneNumber, image, age, experience, criminalRecord, language, area});

    res.redirect("/babysitter")

  } catch (error) {
    console.log(error)
    next(error)
  }
})


// GET /client-edit
router.get("/client-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await User.findById(id);
    res.render("profiles/client-edit", {client})
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// POST /client-edit
router.post("/client-edit/:id", async (req, res, next) => {
  const {id} = req.params;
  const {firstName, lastName, email, password, phoneNumber, image, area} = req.body;
  try {
    const updatedUserClient = await User.findByIdAndUpdate(id, {firstName, lastName, email, password, phoneNumber, image, area});

    res.redirect("/client")
  } catch (error) {
    console.log(error);
    next(error);
  }
})



module.exports = router;
