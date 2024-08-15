const router = require("express").Router();
const { Member, validate } = require("../models/member");

router.post("/create-member", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const memberExists = await Member.findOne({ email: req.body.email });
    if (memberExists)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

    // Calculate validTill based on joinDate and membershipType
    let validTill = new Date(req.body.joinDate);
    if (req.body.userType === "member" && req.body.membershipType) {
      validTill.setDate(
        validTill.getDate() + parseInt(req.body.membershipType)
      );
    }

    const newMember = new Member({
      ...req.body,
      validTill: validTill,
    });

    await newMember.save();
    res.status(201).json({ message: "Member added successfully!" });
  } catch (error) {
    console.error("Error during member creation:", error);
    res.status(400).json({ error: "Error adding member" });
  }
});

router.get("/read-member/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).send({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(400).json({ error: "error fetching member" });
  }
});

router.get("/read-all", async (req, res) => {
  try {
    const members = await Member.find();
    return res.status(200).json(members);
  } catch (error) {
    console.error("Error Fetching members:", error);
    res.status(400).json({ error: "error fetching members" });
  }
});

module.exports = router;
