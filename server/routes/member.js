const router = require("express").Router();
const { Member, validate } = require("../models/member");

router.post("/create-member", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
  
      const member = await Member.findOne({ email: req.body.email });
  
      if (member)
        return res.status(409).send({ message: "User with given email already exists" });
  
      await new Member({ ...req.body }).save();
  
      res.status(201).json({ message: "Member added successfully!" });
    } catch (error) {
      console.error('Error during member creation:', error);
      res.status(400).json({ error: "Error adding member" });
    }
  });
  

module.exports = router;
