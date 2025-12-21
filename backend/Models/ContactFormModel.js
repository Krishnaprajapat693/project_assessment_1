import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email : {
        require: true,
        type: String,
        unique: true
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    city: {
        type: String, 
        require: true
    }
  },
  { timestamps: true }
);

const Contacts = mongoose.model("ContactForm", contactFormSchema);

export default Contacts;