const express = require("express")
const router = express.Router()
module.exports = router;

const pool = require("../connection");

// GET all product positions
router.get("/", async (req, res) => {
    try {
      const products = await pool.query("SELECT * FROM product");
      res.json(products.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

// GET a single menu position
router.get("/:id", async (req, res) => {
    try {
      const products = await pool.query
      (`
      SELECT * FROM product
      WHERE product_id = ${req.params.id}
      `);
      res.json(products.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // POST new product position
  router.post("/", async (req, res) => {
    try {
      const { restaurant_key, product_name, product_description, product_price, product_category, product_image } = req.body;
      const products = await pool.query
      (`
      INSERT INTO product (restaurant_key, product_name, product_description, product_price, product_category, product_image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [restaurant_key, product_name, product_description, product_price, product_category, product_image]);
      res.json(products.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

// DELETE a menu position by its ID (QUESTIONABLE IF NEEDED AT ALL)
router.delete("/:id", async (req, res) => {
    try {
      const products = await pool.query
      (`
      DELETE FROM menu
      WHERE menu_id = ${req.params.id}
      `);
      res.json(products.rows);
    } catch (err) {
      console.error(err.message);
    }
  })








  

// changing items' values should be restricted for now

// // Renaming menu position by its ID
// router.post("/rename/:id/:new_title", async (req, res) => {
//     try {
//       const {} = req.body;
//       const restaurants = await pool.query
//       (`
//       UPDATE menu
//       SET title = '${req.params.new_title}'
//       WHERE menu_id = ${req.params.id};
//       `);
//       res.json(restaurants.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   })

// // Changing description of menu postion by its ID
// router.post("/new_description/:id/:new_description", async (req, res) => {
//     try {
//       const restaurants = await pool.query
//       (`
//       UPDATE menu
//       SET description = '${req.params.new_description}'
//       WHERE menu_id = ${req.params.id};
//       `);
//       res.json(restaurants.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   })

// // Changing image link of menu position by id
// router.post("/new_img/:id/:new_img", async (req, res) => {
//     try {
//       const restaurants = await pool.query
//       (`
//       UPDATE menu
//       SET image = '${req.params.new_img}'
//       WHERE menu_id = ${req.params.id};
//       `);
//       res.json(restaurants.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   })

// // Changing price
// router.post("/new_price/:id/:new_price", async (req, res) => {
//     try {
//       const restaurants = await pool.query
//       (`
//       UPDATE menu
//       SET price = '${req.params.new_price}'
//       WHERE menu_id = ${req.params.id};
//       `);
//       res.json(restaurants.rows);
//     } catch (err) {
//       console.error(err.message);
//     }
//   })