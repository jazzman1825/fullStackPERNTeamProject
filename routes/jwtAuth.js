const router = require('express').Router();
const pool = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const consumer = await pool.query('SELECT * FROM customers WHERE email = $1', [email] );
        const manager = await pool.query('SELECT * FROM restaurants WHERE email = $1', [email] );
        
        // Check if the user email is found and is it consumer or manager
        let user
        let payload
        if (consumer.rows[0]) {
            user = consumer.rows[0]
            payload = {
                id: user.customer_id,
                type: "consumer"
            }

        }
        if (manager.rows[0]) {
            user = manager.rows[0]
            payload = {
                id: user.restaurant_id,
                type: "manager"
            }
        } 

        if (!(user)) {
            return res.status(401).json({
                error: "Invalid username or password"
            })
        }
        
        // If email was founded, compare hashed passwords
        const passwordCorrect = user === undefined 
            ? false
            : await bcrypt.compare(password, user.password)
        
        if (!(passwordCorrect)) {
            return res.status(401).json({
                error: "Invalid username or password"
            })
        }
    
        // Create jwt token that expires in 1 hour
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    
        res.status(200).send({ token, userID: payload.id, userType: payload.type });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");       
    }
})


// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, accountType } = req.body;

    const consumer = await pool.query('SELECT * FROM customers WHERE email = $1', [email] );
    const manager = await pool.query('SELECT * FROM restaurants WHERE email = $1', [email] );

    // Check if the given email is already in use
    if (consumer.rows.length > 0 || manager.rows.length > 0) {
        return res.status(401).json({
            error: "Email already in use!"
        })
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;

    if (accountType === "manager") {
        newUser = await pool.query('INSERT INTO restaurants (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword] );

        const payload = {
            id: newUser.id,
            type: "manager"
        }
    
        // Create jwt token that expires in 1 hour
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    
        res.status(200).send({ token, userID: payload.id, userType: payload.type });
    }
    else {
        newUser = await pool.query('INSERT INTO customers (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword] );

        const payload = {
            id: newUser.id,
            type: "consumer"
        }
    
        // Create jwt token that expires in 1 hour
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    
        res.status(200).send({ token, userID: payload.id, userType: payload.type });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;