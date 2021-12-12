const express = require("express");
const router = express.Router();
module.exports = router;
const pool = require("../connection");

router.get("/", async (req, res) => {
  try {
    const restaurants = await pool.query("SELECT * FROM restaurants WHERE restaurant_name IS NOT NULL");
    res.json(restaurants.rows);
  } catch (err) {
    console.error(err.message);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const restaurants = await pool.query
    (`
    SELECT * FROM restaurants
    WHERE restaurant_id = ${req.params.id}
    `);
    res.json(restaurants.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const restaurants = await pool.query
    (`
    DELETE FROM restaurants
    WHERE restaurant_id = ${req.params.id}
    `);
    res.json(restaurants.rows);
  } catch (err) {
    console.error(err.message);
  }
})

