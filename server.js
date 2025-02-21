
const express = require('express');
const app = express();
const p = require('./product');
const c = require('./customer');

const db = require('./db');


app.use(express.json())
/* products */
//get all product
app.get('/products', (req, res) => {
    p.getAllProducts(res); 
});

//search by category
app.get('/products/category/:id', (req, res) => {
    p.getProductByCategory(res,req.params.id); 
});

//search by name
app.get('/products/search', (req, res) => {
    const productName = req.query.name;
    if (!productName) {
        return res.status(400).json({ message: "Product name is required" });
    }
    p.getProductbyName(res, productName);
});
//search by id
app.get('/products/:id', (req, res) => {
    p.getProductById(res,req.params.id); 
});
//post
app.post("/products",(req,res)=>{

const {name , price , stock , category_id, manifacture_id ,review_id} = req.body;
  if(!name || !price ||!stock || !category_id|| !manifacture_id)
  {
    return res.status(500).json({message: "you missed required entry"});
  }
db.addProduct(req,res,name , price , stock , category_id, manifacture_id ,review_id);

})
//delete by id
app.delete("/products/:id",(req,res)=>{
    const {id} = req.params;
   
    p.deleteProduct(req,res,id);

});

//edit   
app.put("/products/:id",(req,res)=>{
const {name , price , stock , category_id, manifacture_id ,review_id} = req.body;
if(!name || !price ||!stock || !category_id|| !manifacture_id)
{
  return res.status(500).json({message: "you missed required entry"});
}
    p.editProduct(req,res,name,price,stock,category_id,manifacture_id,review_id);
})



//customer 
app.get('/customer/', (req, res) => {
    db.all(`select * from customer`,(err,rows)=>
    {
        res.json(rows);
    }
    );
});


app.get('/customer/:id', (req, res) => {
    c.getCustomerById(req,res,req.params.id); 
});

app.put('/customer/:id',(req,res)=>{
    const {name , email , phone} = req.body;
   
if(!name||!email||!phone)
{
    return res.status(400).json({message:" u missed a required entity"})
}
    c.editCustomer(req,res,name,email,phone);
})

app.get('/customer/:id/orders', (req, res) => {
    c.getCustomerOrders(req,res,req.params.id); 
});


app.listen(7000, () => {
    console.log('Server started on port 7000');
});