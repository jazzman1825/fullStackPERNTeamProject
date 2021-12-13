const express = require("express")
const router = express.Router()
const pool = require("../connection");
const authorize = require("../middlewares/authorize");

// GET orders of customer/manager
router.get("/", authorize, async (req, res) => {
  try {
    if (req.user.type === "consumer") {
      const orders = await pool.query
      (`SELECT * FROM orders WHERE customer_id = ${req.user.id}`);
      res.json(orders.rows);
    }
    else {
      const orders = await pool.query
      (`SELECT * FROM orders WHERE restaurant_id = ${req.user.id}`);
      res.json(orders.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
})

// GET order details
router.get("/:id", async (req, res) => {
  try {
    const orderDetails = await pool.query
    (`SELECT product_name, product_price FROM orders JOIN order_contents ON orders.order_id = order_contents.order_key
     JOIN products ON products.product_id = order_contents.product_key 
     WHERE order_id = ${req.params.id} `);
    res.json(orderDetails.rows)
  } catch (err) {
    console.error(err.message)  
  }
})

// Send a new order
router.post("/", authorize, async (req, res) => {
  try {
    const { restaurant_id, customer_id, order_time, order_status, order_price, order_address } = req.body;
    const newOrder = await pool.query
    (`
    INSERT INTO orders (restaurant_id, customer_id, order_time, order_status, order_price, order_address)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [restaurant_id, customer_id, order_time, order_status, order_price, order_address]);
    res.json(newOrder.rows[0]); 
  } catch (err) {
    console.error(err.message)  
  }
})

router.post("/details", authorize, async (req, res) => {
  try {
    const { product_key, order_key } = req.body;
    const newOrderDetails = await pool.query
    (`
    INSERT INTO order_contents (product_key, order_key)
    VALUES ($1, $2)
    RETURNING *`,
    [product_key, order_key]);
    res.json(newOrderDetails.rows[0]); 
  } catch (err) {
    console.error(err.message)  
  }
})

// Update order status
router.put("/", authorize, async (req, res) => {
  try {
    const { order_id, order_status } = req.body;
    const updatedOrder = await pool.query(
        `UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *`,
        [order_status, order_id]
    );
    res.json(updatedOrder.rows[0]);
  } catch (err) {
    console.error(err.message);        
  }
})

// DELETE an order
router.delete("/id/:id", async (req, res) => {
    try {
      const orders = await pool.query
      (`
      DELETE FROM orders
      WHERE order_id = ${req.params.id}
      `);
      res.json(orders.rows);
    } catch (err) {
      console.error(err.message);
    }
})

module.exports = router;