const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log(`${PORT}`)
})

//Mongoose
let fruitModel

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

const fruitSchema = new mongoose.Schema({
    name: String,
    image:String,
    price:String,
    email:String
  });

fruitModel = mongoose.model('Fruit', fruitSchema);
}

server.get('/fruits' ,fruitHandler)
server.get('/getFruits' ,getFruitData)
server.post('/addFruit', addfruitHandler)
server.delete('/deleteFruit/:id', deletefruitHandler)
server.put('/updateFruit/:id', updatefruitHandler)

function fruitHandler(req,res)
{
    const fruitURL = 'https://fruit-api-301.herokuapp.com/getFruit'

    axios
    .get(fruitURL)
    .then(arr =>{
        let newFruit = arr.data.fruits.map((item)=>{
            return new Fruits(item)
        })
        res.send(newFruit)
    })
    .catch(error=>{
        console.log('error')
    })
}

class Fruits{
    constructor(item)
    {
        this.name=item.name
        this.image=item.image
        this.photo=item.photo
    }
}

async function getFruitData(req,res)
{
    const email=req.query.email
    fruitModel.find({email:email},(error,result)=>{
        if(error)
        {
            console.log('error')
        }
        else
        {
            res.send(result)
        }
    })
}
async function addfruitHandler(req,res)
{
    const email=req.query.email
    const {name,image,price}=req.body

    await fruitModel.create({
        name:name,
        image:image,
        price:price,
        email:email
    })
    fruitModel.find({email:email},(error,result)=>{
        if(error)
        {
            console.log('error')
        }
        else
        {
            res.send(result)
        }
    })
}
async function deletefruitHandler(req,res)
{
    const fruitId = id
    const email=req.query.email
    fruitModel.deleteOne({fruitId:_id},(error,result)=>{
        fruitModel.find({email:email},(error,result)=>{
        if(error)
        {
            console.log('error')
        }
        else
        {
            res.send(result)
        }
    })
    })
    
}
async function updatefruitHandler(req,res)
{
    const fruitId = id
    const email=req.query.email
    const {name,image,price}=req.body
    fruitModel.findByIdAndUpdate(fruitId,{name,image,price},(error,result)=>{
        fruitModel.find({email:email},(error,result)=>{
        if(error)
        {
            console.log('error')
        }
        else
        {
            res.send(result)
        }
    })
    }) 
}