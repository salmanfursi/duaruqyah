const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 4000;

// Create a connection to the SQLite database

// Specify the path to your SQLite file
const dbPath = '/dua_main.sqlite';
const db = new sqlite3.Database(dbPath);


// app.get('/data', (req, res) => {
//   // Query the database to retrieve the required data for dropdowns
//   db.all(`SELECT 
//             categories.cat_id AS cat_id,
//             categories.cat_name_en AS cat_name,
//             subcategories.subcat_id AS subcat_id,
//             subcategories.subcat_name_en AS subcat_name,
//             duas.dua_id AS dua_id,
//             duas.dua_name_en AS dua_name
//           FROM 
//             categories
//           LEFT JOIN 
//             subcategories ON categories.cat_id = subcategories.cat_id
//           LEFT JOIN 
//             duas ON subcategories.subcat_id = duas.subcat_id`, (err, rows) => {
//     if (err) {
//       res.status(500).send(err.message);
//       return;
//     }
    
//     // Send the data as JSON response
//     res.json(rows);
//   });
// });


app.get('/api', (req, res) => {
  // Query the database to retrieve categories
  db.all('SELECT category FROM Tables', (err, rows) => {
    if (err) {
      // console.log(err)
      console.log(rows)
      res.status(500).json({ error: 'Database query error' });
    } else {
      // Extract the category values from the rows
      const categories = rows.map(row => row.category);
      res.json(categories);
    }
  });
});


// Start the Express server
app.get('/', (req, res) => {
    res.send('server is running');
});
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
