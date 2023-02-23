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
      const userId = req.session.currentUser._id;
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        experience,
        /*  criminalRecord, */
        /*  disponibility, */
        linkedin,
        price,
        language,
        location,
        disponibility: {
          morning,
          afternoon,
          night
        }
      } = req.body;

      let image;
      if (req.file) {
        image = req.file.path;
      } else {
        image = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
      }

      await User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        image,
        experience,
        /* criminalRecord, */
        /*  disponibility, */
        linkedin,
        price,
        language,
        location,
        disponibility: {
          morning,
          afternoon,
          night
        }
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
router.post(
  "/client-create",
  isLoggedIn,
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      const { phoneNumber, location } = req.body;
      const thisUserId = req.session.currentUser._id;

      let thisImage;
      if (req.file) {
        thisImage = req.file.path;
      } else {
        thisImage =
          "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
      }

      const thisUser = await User.findByIdAndUpdate(thisUserId, {
        phoneNumber,
        location,
        image: thisImage,
      });

      res.redirect("/client");
    } catch (error) {
      next(error);
    }
  }
);

// GET /client
router.get("/client", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId);
    res.render("profiles/client", { user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /babysitter
router.get("/babysitter", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId);

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
router.post(
  "/babysitter-edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(req.body);

            const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        age,
        experience,
    /*     criminalRecord, */
        language,
        linkedin,
        price,
        location,
        morning,
        afternoon,
        night
      } = req.body;

      let image;
      
      if (req.file) {
        image = req.file.path;
      }

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
      /*     criminalRecord, */
          language,
          linkedin,
          price,
          location,
          disponibility: {
            morning,
            afternoon,
            night
          }
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
  }
);

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
router.post(
  "/client-edit/:id",
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phoneNumber, location } = req.body;

      let image;
      if (req.file) {
        image = req.file.path;
      }

      const updatedUserClient = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          location,
          image,
        },
        { new: true }
      );

      req.session.currentUser = updatedUserClient;
      console.log(updatedUserClient);

      res.redirect("/client");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

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

    res.render("babysitters-list", { babyArray, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET babysitter-profile-geral
router.get("/babysitter-profile-geral/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.session.currentUser;

    const babysitter = await User.findById(id).populate('reviewsReceived')
    .populate({
      path: 'reviewsReceived',
      populate: {
        path: 'author',
        model: 'User',
      }
    });

    res.render("profiles/babysitter-profile-geral", babysitter, user);
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
/* router.get("/babysitter-profile-geral/:id", async (req, res, next) => {
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
}); */




router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    const { session } = req;
    const currentUserId = req.session.currentUser._id;
    /* currentUser.populate('favorites'); */
    const currentUser = await User.findById(currentUserId).populate(
      "favorites"
    );
    res.render("profile/profile", { currentUser, session });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


/* router.post("/deleteFavorite/:id", async (req, res, next) => {
  const babysitterId = req.params.id;
  const userId = req.session.currentUser._id;

  try {
    const babysitterRemove = await User.findById(userId);
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: babysitterId },
    });
    await User.findByIdAndRemove(babysitterId);

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    next(error);
  }
}); */


// POST / review
router.post("/review/create/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    const author = req.session.currentUser._id;

    // create
    const newReview = await Reviews.create({
      author,
      receiver: id,
      content,
      rating,
    });

    // add review to user
    await User.findByIdAndUpdate(author, { $push: { reviewsWritten: newReview._id } });

    await User.findByIdAndUpdate(id, { $push: { reviewsReceived: newReview._id } });

    res.redirect("/babysitters-list");
  } catch (error) {
    console.log(error);
    next(error);
  }
});


/* // POST / delete review
router.post("/review/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const removedReview = await Review.findByIdAndRemove(id);

    await User.findByIdAndUpdate(removedReview.author, {
      $pull: { reviews: removedReview._id },
    });

    res.redirect("/babysitters-list");
  } catch (error) {
    console.log(error);
    next(error);
  }
}); */

module.exports = router;
