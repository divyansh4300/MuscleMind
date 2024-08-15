const mongoose = require("mongoose");
const Joi = require("joi");

const memberSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    userType: { type: String, required: true },
    gender:{type:String, required:true},
    membershipType: { type: Number, required: false, default: 0 }, // Default to 0
    joinDate: { type: Date, required: true },
    address: { type: String, required: true },
    weight: { type: Number, required: true },
    validTill: { type: Date, required: false }
});

const Member = mongoose.model("member", memberSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        gender: Joi.string().required().label("Gender"),
        email: Joi.string().email().required().label("Email"),
        phoneNumber: Joi.string().required().label("Phone Number"),  // Changed to string
        userType: Joi.string().required().label("User Type"),
        membershipType: Joi.number().optional().allow(""),  // Changed to number
        joinDate: Joi.date().required().label("Date"),
        address: Joi.string().required().label("Address"),
        weight: Joi.number().required().label("Weight"),
        feeDeposited: Joi.number().optional().label("Fee Deposited"),
        validTill: Joi.date().optional().label("Valid Till")
    });
    return schema.validate(data);
};

module.exports = { Member, validate };
