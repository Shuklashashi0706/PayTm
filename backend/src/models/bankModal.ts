import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

accountSchema.post("save", (doc) => {
  console.log("Account Doc saved:", doc._id);
});
const bankModal = mongoose.model("Account", accountSchema);

export default bankModal;
