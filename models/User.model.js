const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,

    },

    image: {
      type: String,
      required: true,
    },

    babysitter: Boolean,
    
    age:{
      type: Number,
    },

    experience: {
      type: String,
    },

    criminalRecord: {
      type: String,
    },

    disponibility: [
      {
        day: String,
        slot: {
          type: [String],
          enum: ["morning", "afternoon", "night"]
        }
    }
  ],

  linkedin: {
    type: String,

  },

  language: {
    type: String,
  },

  area: {
    type: String,
  },

  favorites: {
    type: Schema.Types.ObjectId,
  },

  reviewsWritten: [{ type: Schema.Types.ObjectId, ref: "Reviews"}],
  reviewsReceived: [{ type: Schema.Types.ObjectId, ref: "Reviews"}],

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
