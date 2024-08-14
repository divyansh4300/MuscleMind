const mongoose = require("mongoose");
const Joi = require("joi");

const memberSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    userType: { type: String, required: true },
    membershipType: { type: String, required: false, default: "" }, // Default to empty string
    joinDate: { type: Date, required: true },
    address: { type: String, required: true },
    weight: { type: Number, required: true },
  });
  

const Member = mongoose.model("member", memberSchema);
const validate = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      email: Joi.string().email().required().label("Email"),
      phoneNumber: Joi.string().required().label("Phone Number"),  // Changed to string
      userType: Joi.string().required().label("User Type"),
      membershipType: Joi.string().optional().allow(""),  // Allowing empty string if not applicable
      joinDate: Joi.date().required().label("Date"),
      address: Joi.string().required().label("Address"),
      weight: Joi.number().required().label("Weight"),
      feeDeposited: Joi.number().optional().label("Fee Deposited"),  // Included as optional
    });
    return schema.validate(data);
  };
  
module.exports = { Member, validate };
