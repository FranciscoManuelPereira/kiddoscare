const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Reviews = require("../models/Reviews.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /delete client profile
router.get("/client-delete/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const deleteClient = await User.findByIdAndDelete(userId);
    console.log(deleteClient);
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /delete babysitter profile
router.get("/babysitter-delete/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const deleteBabysitter = await User.findByIdAndDelete(userId);
    console.log(deleteBabysitter);
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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

// POST /profiles/babysitter-create
router.post(
  "/babysitter-create",
  fileUploader.single("image"),
  isLoggedIn,
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        experience,
        criminalRecord,
        disponibility,
        linkedin,
        price,
        language,
        area,
      } = req.body;

      let image;

      if (req.file) {
        image = req.file.path;
      } else {
        image = "https://i.ibb.co/zxRZ9FC/pub-5537449-1280.jpg";
      }

      await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        image,
        experience,
        criminalRecord,
        disponibility,
        linkedin,
        price,
        language,
        area,
      });

      res.redirect("/babysitter");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

// GET /profiles/client-create
router.get("/client-create", isLoggedIn, (req, res) => {


  res.render("profiles/client-create");
});

// POST /profiles/client-create
router.post("/client-create", isLoggedIn, (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, image, area } =
    req.body;

  res.redirect("/client");
});

// GET /client
router.get("/client", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    res.render("profiles/client", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /babysitter
router.get("/babysitter", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.session.currentUser;

    res.render("profiles/babysitter", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /babysitter-edit
router.get("/babysitter-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const babysitter = await User.findById(id);
    res.render("profiles/babysitter-edit", { babysitter, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /babysitter-edit
router.post("/babysitter-edit/:id", async (req, res, next) => {
  const { id } = req.params;

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
    language,
    linkedin,
    price,
    area,
  } = req.body;
  try {
    const updatedUserBabysitter = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        image,
        age,
        experience,
        criminalRecord,
        language,
        linkedin,
        price,
        area,
      },
      { new: true }
    );

    req.session.currentUser = updatedUserBabysitter;
    console.log(updatedUserBabysitter);

    res.redirect("/babysitter");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /client-edit
router.get("/client-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const client = await User.findById(id);
    res.render("profiles/client-edit", { client, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /client-edit
router.post("/client-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, phoneNumber, image, area } =
    req.body;
  try {
    const updatedUserClient = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      image,
      area,
    });

    req.session.currentUser = updatedUserClient;
    console.log(updatedUserClient);

    res.redirect("/client");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /babysitters-list
router.get("/babysitters-list", isLoggedIn, async (req, res, next) => {
  try {
    let babyArray = [];
    const allUsers = await User.find();
    const user = req.session.currentUser;

    allUsers.map((user) => {
      if (user.babysitter) {
        babyArray.push(user);
      }
    });

    res.render("babysitters-list", { babyArray, user});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /delete babysitter profile
router.post("/babysitter-edit/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Get Details of Babysitter Profile
router.get("/babysitter-profile-geral/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const babysitterPublicProfile = await User.findById(id)
      .populate("reviews author")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          model: "User",
        },
      });

    const users = await User.find();
    res.render("profile/babysitter-profile-geral", { users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/review/create/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;

    //Create the review
    const newReview = await Reviews.create({ author, content });

    //Add the review to the babysitter
    await User.findByIdAndUpdate(author, { $push: { reviews: newReview._id } });

    res.redirect(`/babysitter-profile-geral/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//Example of how to delete a review and remove it from the user array:
router.post("/review/delete/:id", async (req, res, next) => {
  //id of the review
  const { id } = req.params;

  try {
    const removedReview = await Review.findByIdAndRemove(id);

    await User.findByIdAndUpdate(removedReview.author, {
      id,
      $pull: { reviews: removedReview._id },
    });

    res.redirect("/book-list");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
