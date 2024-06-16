require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const mongoose = require('mongoose');
// const pass = process.env.ABC;
// console.log(pass);
// mongoose.connect("mongodb://127.0.0.1:27017/fish",{useNewUrlParser:true});
mongoose.connect(process.env.CONNECTION_STRING);
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

const fishSchema = new mongoose.Schema({
  name:String,
  knownAs:String,
  scientificName:String,
  appearance:String,
  habitat: String,
  diet: String,
  nutritionValue: String,
  idx:Number,
  photo: Buffer
});
const Fish = new mongoose.model("Fish",fishSchema);

// let ph = fs.readFileSync(`C:/Users/SHREYASH/Desktop/download (26).jpeg`);
// Fish.updateOne({idx:6},{$set:{photo:ph}},{overwrite:true},function(err){
//   if(!err){
//     console.log("Successfully updated");
//   }
// });
// console.log(ph);
let curr_pred;
app.post('/api/sendParagraphValue', function(req, res) {
  const { paragraphValue } = req.body;
  console.log(req.body);
  res.send("Done");
});
app.post('/api',function(req,res){
  // console.log(req.body);
  curr_pred = req.body.pred;
  // console.log(curr_pred);
  Fish.findOne({idx:curr_pred},function(err,foundFish){
    if(!err){
      if(foundFish){
        fishFound=foundFish;
//         console.log(foundFish);
        res.render("pred-fish",{fish:fishFound});

      }
      else{
        res.send("No data found! Contact Developer");
      }
    }
    else{
      console.log(err);
    }

  });
});
app.post("/register",function(req,res){
  console.log(req.body.name);
console.log(req.body);
  const fish = new Fish({
    name: req.body.name,
    knownAs:req.body.knownAs,
    scientificName:req.body.scientificName,
    appearance:req.body.appearance,
    habitat:req.body.habitat,
    diet : req.body.diet,
    nutritionValue:req.body.nutritionValue,
    idx:req.body.idx

  });
  fish.save(function(err){
    if(!err){
      console.log("submitted");
    }
    else{
      console.log(err);
    }
  });
  res.redirect('/register');

  });
app.get("/",function(req,res){
  res.render("index",{name:"Shreyash Gawande"});
});
app.get("/Category",function(req,res){
  Fish.find({},function(err,foundFishes){
    if(!err){
      if(foundFishes){
        res.render("cards",{foundFishes:foundFishes});

      }
      else{
        res.send("No data found");
      }
    }
    else{
      console.log(err);
    }
    });

});
  let fishFound;
app.get("/fish/:fishID",function(req,res){

  const fishId = req.params.fishID;
  console.log(fishId);
  Fish.findOne({idx:fishId},function(err,foundFish){
    if(!err){
      if(foundFish){
        fishFound=foundFish;
        console.log(foundFish);
        res.render("fish",{fish:fishFound});

      }
      else{
        res.send("No data found! Contact Developer");
      }
    }
    else{
      console.log(err);
    }

  });

});
app.get("/fish",function(req,res){
    res.render("fish",{fish:fishFound});
});
app.get("/register",function(req,res){
  res.render("form");
});


app.listen(3000,function(){
  console.log("server is running on localhost 3000" + curr_pred);
})
