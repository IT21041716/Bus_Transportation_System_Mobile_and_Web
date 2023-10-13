import mongoose from "mongoose";
const Schema = mongoose.Schema;

const smartCard = new Schema({
  uId: {
    type: String,
    required: true,
  },
  SID: {// new aded variable
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  balance: { // new aded variable
    type: Number,
    required: true,
  }
});

export default mongoose.model("smartcards", smartCard);
