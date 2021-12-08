const express = require("express")
const router = express.Router()
module.exports = router;

const pool = require("../connection");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await pool.query("SELECT * FROM customer");
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// GET a single customer with the requested customer_id
router.get("/:id", async (req, res) => {
  try {
    const customers = await pool.query
    (`
    SELECT * FROM customer 
    WHERE customer_id = ${req.params.id}
    `);
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
  }
})


// DELETE a customer with the requested customer_id
router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const customers = await pool.query
    (`
    DELETE FROM customer 
    WHERE customer_id = ${id}
    `);
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// POST a single customer with the requested login and password
router.post("/", async (req, res) => {
  try {
    const { login, password  } = req.body;
    const customers = await pool.query
    (
    `INSERT INTO customer(login, password)
    VALUES ($1, $2)
    RETURNING *`,
    [login, password]
    );
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// Changing customer password (questionable if needed)
router.put("/", async (req, res) => {
  try {
    const { id, new_password  } = req.body;
    const customers = await pool.query
    (`
    UPDATE customer
    SET password = '${new_password}'
    WHERE customer_id = ${id};
    `);
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
  }
})