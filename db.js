const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./school.db', (err) => { // Replace with your db file
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

function getProductbyName(res, name) {
    const searchTerm = `%${name}%`;
    db.all("SELECT * FROM PRODUCT WHERE NAME LIKE ?", [searchTerm], (err, rows) => {
        if (err) {
            console.error("Database error in getProductbyName:", err); // Log errors!
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(rows);
    });
}


function getProductById(res,id)
{
    db.get("SELECT * FROM PRODUCT WHERE ID = ?",[id],(err,row)=>{
        if(err)
        {
            console.error("Database error in getProductbyId:", err); // Log errors!
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
     
        }
        if(!row)
        {
            return res.status(404).json({ message: 'No products found' });

        }

        res.json(row);
    });
}

function getAllProducts(res) {
    db.all("SELECT * FROM PRODUCT", [], (err, rows) => { // Corrected query for all products
        if (err) {
            console.error("Database error in getAllProducts:", err);
            return res.status(500).json({ message: `Error fetching products: ${err.message}` });
        }
        res.json(rows);
    });
}


module.exports = {
    getProductbyName,
    getAllProducts ,
    getProductById
};

