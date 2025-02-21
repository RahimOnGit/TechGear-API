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
const sql = `select * from customer 
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


function getCustomerOrder()
{

}



module.exports= { getCustomerById,editCustomer,getCustomerOrder};