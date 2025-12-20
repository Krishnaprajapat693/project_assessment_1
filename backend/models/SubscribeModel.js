import mongoose from "mongoose";

const SubscribersSchema = new mongoose.Schema(
  {
    email: {
        require: true,
        type: String,
        unique: true
    }
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", SubscribersSchema);

export default Subscriber;
