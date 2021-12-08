const express = require("express");
const router = express.Router();
const pool = require("../connection");
const authorize = require("../middlewares/authorize");

// Get the managers restaurant
router.get("/", authorize, async (req, res) => {
  try {
    if (req.user.type === "consumer") {
      return res.status(403).json({ error: "You are not a manager!" });
    }
    const restaurant = await pool.query('SELECT * FROM restaurant WHERE id = $1', [req.user.id]);
    res.json(restaurant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})


// Update the restaurant
router.put("/", authorize, async (req, res) => {
  try {
    if (req.user.type === "consumer") {
      return res.status(403).json({ error: "You are not a manager!" });
    }
    const { name, location, img, operatingHours, type, pricelvl  } = req.body;
    const newRestaurant = await pool.query(
        'UPDATE restaurant SET name = $1, location = $2, image_url = $3, operating_hours = $4, type = $5, price_level = $6 WHERE id = $7 RETURNING *',
        [name, location, img, operatingHours, type, pricelvl, req.user.id]
    );
    res.json(newRestaurant.rows[0]);

  } catch (err) {
    console.error(err);        
  }
})

module.exports = router;