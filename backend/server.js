import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CommandSucceededEvent, Db } from 'mongodb';
import { connectDB } from './config/db.js';
import Product from './models/product.models.js';


dotenv.config({path:'../.env'});

const app=express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Products are:", products);
        return res.status(200).json({ success: true, message: products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
});



app.post('/products',async (req,res)=>{
    const product=req.body;
    if(!product.name||!product.price||!product.image){
        res.status(404).json({success:false});
    }
    console.log("product: ",product);
    const newProduct=new Product(product);

    try{
        await newProduct.save();
        return res.status(201).json({success:true,message:newProduct});

    }catch(error){
        console.error(error);
        return res.status(404).json({success:false,message:error.message});
       
    }

})
app.delete('/products/:id',async (req,res)=>{
    const {id}=req.params;
    try{
        await Product.findByIdAndDelete(id);
        return res.status(201).json({success:true,message:"the item has been deleted"});
    }catch(error){
        
        console.error(error.message);
        return res.status(404).json({success:false,message:"The item not found"});
    }
    
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;  // you don't need to destructure 'update' from body

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, update, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ 
            success: true, 
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
});

console.log(process.env.MONGO_URI);

app.listen(3000,()=>{
    connectDB();
    console.log("Server is running on port 3000");
    
});

