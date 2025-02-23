const db = require('./db');





function editCustomer(req, res, name, email, phone) {
    const sql = `
      UPDATE CUSTOMER
      SET NAME = ?, EMAIL = ?, PHONENUMBER = ?
      WHERE ID = ?;
    `;
  
    db.run(sql, [name, email, phone, req.params.id], function (err) {
      if (err) {
        console.log("Error in updating customer data:", err.message);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Updated successfully", name, email, phone });
    });
  }

function getCustomerById(req,res,id)
{
const sql = `select customer.*,orders.ID as order_number, orders.DATE  from customer 
join orders on orders.CUSTOMER_ID = customer.ID
where customer.ID = ?;  `;
db.all(sql,[id],(err,rows)=>{

if(!rows || rows.length==0)
{
   return res.status(404).json({ message: "customer not found"});
}
res.status(200).json(rows);
})
}


function getCustomerOrders(req,res,id)
{
  const sql = `select
   ORDERS.ID ,
    CUSTOMER.NAME as customer_name, 
    PRODUCT.NAME as product_name , 
    PRODUCT.PRICE ,
    ORDER_STATUS.STATUS as order_status,
    ORDERS.DATE FROM PRODUCT
JOIN ORDER_DETAILS ON PRODUCT.ID = ORDER_DETAILS.PRODUCT_ID 
JOIN ORDERS ON ORDER_DETAILS.ORDER_ID = ORDERS.ID
join CUSTOMER ON CUSTOMER.ID = ORDERS.CUSTOMER_ID
JOIN ORDER_STATUS ON ORDER_STATUS.ID = ORDERS.ORDERSTATUS_ID
WHERE CUSTOMER.ID = ?;`;

db.all(sql,[id],(err,rows)=>{
  if(err)
  {
    console.log(`error in fetching data: ${err.message}`)
  }
 
if(!rows || rows.length==0)
  {
     return res.status(404).json({ message: "customer not found"});
  }
  res.status(200).json(rows);
})

}


module.exports= { getCustomerById,editCustomer,getCustomerOrders};