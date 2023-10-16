// TopUp.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

class TopUpSingleton {
  static instance;

  constructor() {
    if (TopUpSingleton.instance) {
      return TopUpSingleton.instance;
    }

    this.TopUp = mongoose.model("topUp", new Schema({
        PID: {
            type: String,
            required: true,
        },
        UID: {
            type: String,
            required: true,
        },
        smartCardID: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }, { timestamps: true }));

    TopUpSingleton.instance = this;
  }

  getModel() {
    return this.TopUp;
  }
}

export default new TopUpSingleton().getModel();
