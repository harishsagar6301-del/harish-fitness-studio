const express = require("express");
const router = express.Router();

router.post("/checkin", async (req, res) => {
  try {
    const { name } = req.body;

    res.json({
      success: true,
      message: `${name} checked in successfully`
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;