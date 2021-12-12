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
    const restaurant = await pool.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [req.user.id]);
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
    const { restaurant_name, restaurant_location, restaurant_image, operatingHours, restaurant_type, restaurant_pricelvl  } = req.body;
    const newRestaurant = await pool.query(
        'UPDATE restaurants SET restaurant_name = $1, restaurant_location = $2, restaurant_image = $3, operating_hours = $4, restaurant_type = $5, restaurant_pricelvl = $6 WHERE restaurant_id = $7 RETURNING *',
        [restaurant_name, restaurant_location, restaurant_image, operatingHours, restaurant_type, restaurant_pricelvl, req.user.id]
    );
    res.json(newRestaurant.rows[0]);

  } catch (err) {
    console.error(err);        
  }
})

module.exports = router;