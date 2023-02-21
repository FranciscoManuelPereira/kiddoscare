const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
    },

    babysitter: {
      type: Boolean,
      default: false,
    },

    age: {
      type: Number,
      default: 0,
    },

    experience: {
      type: String,
      default: "",
    },

    criminalRecord: {
      type: String,
      default: "",
    },

    /*     disponibility: [
      {
        day: {
          type: String,
          default: "",
        },
        slot: {
          enum: ["morning", "afternoon", "night"],
          default: "morning",
        },
      },
    ], */

    linkedin: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },

    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],

    reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
    reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Reviews" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
