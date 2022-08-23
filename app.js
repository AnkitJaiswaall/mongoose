// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/e-comm');
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     brand: String,
//     category: String

// });

// const saveInDB = async () => {
//     const Product = mongoose.model('products', productSchema);
//     let data = new Product({
//         name: "max 100",
//         price: 200,
//         brand: 'maxx',
//         category: 'Mobile'
//     });
//     const result = await data.save();
//     console.log(result);
// }

// const updateInDB =async  () => {
//     const Product = mongoose.model('products', productSchema);
//     let data =await  Product.updateOne(
//         { name: "note 9" },
//         {
//             $set: { price: 550,name:'max pro 6' }
//         }
//     )
//     console.log(data)
// }

// // updateInDB()


// const deleteInDB=async()=>{
//     const Product=mongoose.model('products',productSchema)
//     let data=await Product.deleteOne({name:"testing"})
//     console.log(data)
// }
// // deleteInDB()

// const findInDB=async()=>{
//     const Product=mongoose.model('products',productSchema)
//     let data=await Product.findOne({name:"nokia1325"})
//     console.log(data)
// }
// // findInDB()


const express=require("express");
require('./config');
const Product=require('./product')
const app=express();
app.use(express.json());
app.post("/create", async (req, resp) => {
   
        let data = new Product(req.body);
        const result = await data.save();
        resp.send(result);
    
}); 

app.get("/find",async(req,res)=>{
    let result=await Product.find();
    res.send(result)
})

app.put("/update/:_id",async(req,res)=>{

    let data=await Product.updateOne(
        req.params,
        {
            $set:req.body
        }
    )
    res.send(data)
})

app.delete("/delete/:_id",async(req,res)=>{
    let data= await Product.deleteOne(req.params);
    res.send(data)
})

//search api

app.get("/search/:key",async function(req,res){
    console.log(req.params.key)
    let data=await Product.find(
        {
            "$or":[
                {"name":{$regex:req.params.key}},
                {"brand":{$regex:req.params.key}}
            ]
        }
    )
    res.send(data)
})

app.listen(3000)