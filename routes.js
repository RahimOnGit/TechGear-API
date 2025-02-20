
const express = require('express');
const app = express();
const db = require('./db');


app.use(express.json())

app.get('/products', (req, res) => {
    db.getAllProducts(res); 
});


app.get('/products/category/:id', (req, res) => {
    db.getProductByCategory(res,req.params.id); 
});


app.get('/products/search', (req, res) => {
    const productName = req.query.name;
    if (!productName) {
        return res.status(400).json({ message: "Product name is required" });
    }
    db.getProductbyName(res, productName);
});

app.get('/products/:id', (req, res) => {
    db.getProductById(res,req.params.id); 
});


app.post("/products",(req,res)=>{

const {name , price , stock , category_id, manifacture_id ,review_id} = req.body;
  if(!name || !price ||!stock || !category_id|| !manifacture_id)
  {
    return res.status(500).json({message: "you missed required entry"});
  }
db.addProduct(req,res,name , price , stock , category_id, manifacture_id ,review_id);

})

app.delete("/products/:id",(req,res)=>{
    const {id} = req.params;
   
    db.deleteProduct(req,res,id);

});

   
app.put("/products/:id",(req,res)=>{
  
    
const {name , price , stock , category_id, manifacture_id ,review_id} = req.body;
if(!name || !price ||!stock || !category_id|| !manifacture_id)
{
  return res.status(500).json({message: "you missed required entry"});
}

    db.editProduct(req,res,name,price,stock,category_id,manifacture_id,review_id);
})



app.listen(7000, () => {
    console.log('Server started on port 7000');
});