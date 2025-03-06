//res.status(400).json({message:"product name cannot be empty"});
    

const valid = require('validator');




function validProudct(req,res,next)
{
    const {name , price , stock , category_id, manifacture_id} = req.body;

  if(!name || !category_id|| !manifacture_id)
  {
    return res.status(400).json({message: "you missed required entry"});
  }
//prouct name
  if(name.trim()==="")
  {
return res.status(400).json({message:"product name cannot be empty"});

  }
  //price
  if(price<0 || price ==0)
  {
    return res.status(400).json({message:"the price must be greater than 0"});

   }
//stock
if(!Number.isInteger(stock) || stock < 0)
{
return res.status(400).json({message:"the stock must be positive integer"});

}

next();
};


function validCustomer(req,res,next)
{
const { name , email , phone } = req.body;    
    if(!name||!email||!phone)
    {
        return res.status(400).json({message:" u missed a required entry"})
    }
if(name.trim()==="")
{
  
  return res.status(400).json({message:"customer name cannot be empty"});
  
    
}
    if(!valid.isEmail(email))
    {
        return res.status(400).json({message:" enter a valid email"});
    }
    if(!valid.isMobilePhone(phone))
    {
        return res.status(400).json({message:" enter a valid phone number"});
    }
    next();

}


module.exports = { validCustomer , validProudct}



