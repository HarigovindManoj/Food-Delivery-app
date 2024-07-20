import mongoose from "mongoose"

 export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.rxebiwp.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));
 }