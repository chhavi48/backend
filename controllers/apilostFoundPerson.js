const asyncHandler = require("express-async-handler");
const axios = require("axios");

const Postdata = async () => {
  app.post("/lostpersons", async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        lost,
        found,
        thing,
        longitude,
        latitude,
      } = req.body;

      // Create a new instance of the lostperson model
      const newLostPerson = new lostpersonModel({
        username,
        email,
        password,
        lost,
        found,
        thing,
        longitude,
        latitude,
      });

      // Save the new lost person entry to the database
      await newLostPerson.save();

      res.status(201).json({ message: "Lost person entry added successfully" });
    } catch (error) {
      console.error("Error adding lost person entry:", error);
      res.status(500).json({ error: "Failed to add lost person entry" });
    }
  });
};

module.exports = { Postdata };
