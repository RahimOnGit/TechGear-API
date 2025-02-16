
const express = require('express');
const app = express();
const db = require('./db');


app.get('/products', (req, res) => {
    db.getAllProducts(res); n
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




app.listen(7000, () => {
    console.log('Server started on port 7000');
});