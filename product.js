const db = require('./db');

function getProductbyName(res, name) {
    const searchTerm = `%${name}%`;
    db.all("SELECT * FROM PRODUCT WHERE NAME LIKE ?", [searchTerm], (err, rows) => {
        if (err) {
            console.error("Database error in getProductbyName:", err); 
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No product found' });
        }
        res.json(rows);
    });
}


function getProductById(res,id)
{
    db.get("SELECT * FROM PRODUCT WHERE ID = ?",[id],(err,row)=>{
        if(err)
        {
            console.error("Database error in getProductbyId:", err);
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
     
        }
        if(!row)
        {
            return res.status(404).json({ message: 'No product found' });

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
            console.error("Database error in getProductbyId:", err); 
            return res.status(500).json({ message: `Error fetching data: ${err.message}` });
     
        }
        if(!rows)
        {
            return res.status(404).json({ message: 'No product found' });

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
    db.all(sql, [], (err, rows) => { 
        if (err) {
            console.error("Database error in getAllProducts:", err);
            return res.status(500).json({ message: `Error fetching products: ${err.message}` });
        }
        res.json(rows);
    });
}


//add new product
function addProduct(req,res,name,price,stock,category_id,manifacture_id)
{

    const sql = `INSERT INTO PRODUCT
     (
    NAME,
    PRICE,
    STOCK,
    CATEGORY_ID,
    MANIFACTURE_ID
    ) VALUES(?,?,?,?,?)`;
    db.run(sql,[name,price,stock,category_id,manifacture_id],err=>{
     
        if (err) {
           
            return res.status(404).json({ message: `Error creating new product: ${err.message}` });
        } 
   
        res.status(200).json({message:"sucessfully added", product_id: this.lastID
            ,name,price,stock,category_id,manifacture_id})
    });


}
//delete
function deleteProduct(req,res,product_id)
{
db.get('select id , name from product where id = ?',[product_id],(err,row)=>
{
    if(!row)
        {
            return res.status(500).json({ message: `product not found` });
  
        }

        
const sql = `delete from product where id = ?`;
db.run(sql,[product_id],(err)=>{
    if(err)
    {
        return res.status(500).json({ message: `Error deleting product: ${err.message}` });
    }
    if(!product_id)
    {
         return res.status(404).json({ message: `product not found` });
  
    }
    res.status(200).json({message:`sucessfully deleted id : ${product_id}`});
})
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