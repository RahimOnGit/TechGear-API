const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./teachgear.db', (err) => { // Replace with your db file
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


function getProductByCategory(res,id)
{
    const sql =    `SELECT  product.name as product_name, category.name as category_name , manifacture.name AS manufacture_name 
        FROM product
        JOIN category ON category.ID = product.CATEGORY_ID
        join manifacture on manifacture.ID = product.MANIFACTURE_ID
        WHERE category.ID = ?`
    db.all(sql,[id],(err,rows)=>{
        if(err)
        {
            console.error("Database error in getProductbyId:", err); // Log errors!
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
     
        }
        if(!rows)
        {
            return res.status(404).json({ message: 'No products found' });

        }

        res.json(rows);
    });
}


function getAllProducts(res) {

    const sql = `select product.*,
    category.name as category_name,
     manifacture.name as manifacture_name
      from product 
join category on category.ID = product.CATEGORY_ID
join manifacture on manifacture.ID = product.MANIFACTURE_ID;`
    db.all(sql, [], (err, rows) => { // Corrected query for all products
        if (err) {
            console.error("Database error in getAllProducts:", err);
            return res.status(500).json({ message: `Error fetching products: ${err.message}` });
        }
        res.json(rows);
    });
}


//add new product
function addProduct(req,res,name,price,stock,category_id,manifacture_id,review_id=null)
{

    const sql = `INSERT INTO PRODUCT
     (
    NAME,
    PRICE,
    STOCK,
    CATEGORY_ID,
    MANIFACTURE_ID,
    REVIEW_ID
    ) VALUES(?,?,?,?,?,?)`;
    db.run(sql,[name,price,stock,category_id,manifacture_id,review_id],err=>{
     
        if (err) {
           
            return res.status(500).json({ message: `Error creating new product: ${err.message}` });
        } 
    });

res.status(200).json({message:"sucessfully added", product_id: this.lastID
    ,name,price,stock,category_id,manifacture_id,review_id
})
}
//delete
function deleteProduct(req,res,product_id)
{
const sql = `delete from product where id = ?`;
db.run(sql,[product_id],(err)=>{
    if(err)
    {
        return res.status(500).json({ message: `Error deleting product: ${err.message}` });
    }
    res.status(200).json({message:`sucessfully deleted ${product_id}`});
})
}



// function editProduct(req,res,colName,value,id)
// {
//     const sql = `UPDATE PRODUCT
// SET ${colName} = ?
// where id = ?;`
//     db.run(sql,[colName,id,value,id],(err)=>{
//         if(err)
//         {
//             return res.status(400).json({message:` error in updating record ${err.message}`});

//         }
//         res.status(200).json({message:`sucessfuly updated ${id}`})
//     });
    
// }


//update (edit)
function editProduct(req,res,name,price,stock,category_id,manifacture_id,review_id=null)
{

    const sql = ` UPDATE PRODUCT
     SET 
    NAME = ?,
    PRICE = ?,
    STOCK = ?,
    CATEGORY_ID = ?,
    MANIFACTURE_ID = ?,
    REVIEW_ID = ?
    WHERE ID = ?`;
    db.run(sql,[name,price,stock,category_id,manifacture_id,review_id,req.params.id],err=>{
     
        if(err)
            {
                return res.status(400).json({message:` error in updating record ${err.message}`});
    
            }

            res.status(200).json({message:"sucessfully updated", product_id: this.lastID
                ,name,price,stock,category_id,manifacture_id,review_id
            })
    });


}

module.exports = {
    getProductbyName,
    getAllProducts ,
    getProductById,
    getProductByCategory,
    addProduct,
    deleteProduct,
    editProduct
};

