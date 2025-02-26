
const db = require('./db');

//show statistic grouped by category
//how many products per category
// price per category
function getStats(res)
{
const sql = `SELECT category.NAME as category_name, COUNT(product.ID) AS amount_products ,
  round(avg(product.PRICE),2)  as average_price_per_category  
FROM product
join category on category.ID = product.CATEGORY_ID
GROUP BY product.CATEGORY_ID;`;

db.all(sql,(err,rows)=>{
    if(err)
    {
res.status(400).json({message: err.message});
    }
    if(!rows)
    {
        res.status(400).json({message: err.message});

    }
    res.status(200).json(rows);

})
}



//
function getReviews(res)
{
const sql = `select product.NAME as product_name, avg(review.RATE) as average_rating , review.COMMENT
from review
join product on product.ID = review.PRODUCT_ID
group by product.NAME;
`;

db.all(sql,(err,rows)=>{
    if(err)
        {
    res.status(400).json({message: err.message});
        }
        if(!rows)
        {
            res.status(400).json({message: err.message});
    
        }
        res.status(200).json(rows);
    
})
}

module.exports = { getReviews , getStats}