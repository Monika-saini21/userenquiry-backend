const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert=(req,res)=>
{
    
    let {name,email,phone,message}=req.body;
     
       let enquiry = new enquiryModel({
           name,
           email,
           phone,
           message
       });
       enquiry.save().then(()=>{ 
           res.send("Data saved")
       })  .catch((err)=>{
            res.send({err})
       })
  
}

let enquiryList=(req,res)=>{
        enquiryModel.find().then((enquiry)=>{
            res.send({status:1, enquirylist:enquiry});
        }).catch((err)=>{
            res.send({status:0, message:"error"})
        })
} 

let enquiryDelete=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.deleteOne({_id:enId});
    res.send({status:1 ,message:"Enquiry delete",enquiry})
}

let enquirysingleRow=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.findOne({_id:enId})
      res.send({status:1, enquiry})
}

let enquiryUpdate = async (req, res) => {
  let { id } = req.params;

  let updateData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  };

  let data = await enquiryModel.updateOne(
    { _id: id },
    { $set: updateData }
  );

  res.send({
    status: 1,
    message: "Updated Successfully",
    data,
  });
};
module.exports={enquiryInsert,enquiryList,enquiryDelete,enquirysingleRow,enquiryUpdate};