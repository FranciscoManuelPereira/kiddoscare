const { Schema, model } = require("mongoose");

const reviewsSchema = new Schema (
    {
        author: [{ type: Schema.Types.ObjectId, ref: "User"}],
        receiver: [{ type: Schema.Types.ObjectId, ref: "User"}],

        content: {
            type: String,
        },

        rate: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);


const Reviews = model("Reviews", reviewsSchema);

module.exports = Reviews;
