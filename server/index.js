const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); //req.body

// ROUTES

// get all desks
app.get("/desks", async(req, res) => {
	try {
		const allDesks = await pool.query("SELECT * FROM desks");
		res.json(allDesks.rows);
	} catch (err) {
		console.log(err.message);
	}
})

// get a desk
app.get("/desks/:id", async(req, res) => {
	try {
		console.log(req.params);
	} catch (err) {
		console.log(err.message);
	}
})

//update a desk
app.put("/desk/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { inumber, firstname, lastname, managername, intern, vacant, notes} = req.body;
    const updateTodo = await pool.query(
      "UPDATE desks SET i_num = $2, first_name = $3, last_name = $4, manager_name = $5, intern = $6, vacancy = $7, notes = $8 WHERE entry_id = $1",
      [id, inumber, firstname, lastname, managername, intern, vacant, notes]
    );
    
    res.json("Desk was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
	console.log("server has started on port 5000");
})