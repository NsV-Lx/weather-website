const path = require('path');

const express = require('express');
const hbs     = require('hbs');
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')
const app = express();

// let's use hbs (handlebars extension to work with express ) and also remember to run files of defined view engine you need to have route handlers
var lat="",long="";


const public_directory_path=path.join(__dirname,"../public");
const view_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

// this is the statement for settingup partials
console.log(partials_path)
hbs.registerPartials(partials_path,(err)=>{
    console.log(err);
});

// remember view engine always search for the files of given engine type in views folder
app.set("view engine","hbs");
app.set("views",view_path);

const another_one_directory_path = path.join(__dirname,"../anotherone");


// express.static function is going to be used.This is used to use directiories which contain static elements
app.use(express.static(public_directory_path));
app.use(express.static(another_one_directory_path));


app.get('/',(req,res)=>{
    res.render("index",{name:"Leviathan"});
});

app.get('/about',(req,res)=>{
  
      res.render("about",{name:"omen"});
});

app.get('/weather',(req,res)=>{
      if(!req.query.address){
         return  res.send({error:"there is some error !!!"})
      }
      geocode(req.query.address,(error,response)=>{
                   if(error){
                       console.log(error);
                       res.send("there is some error in retrieving lat and long of the given location");
                   }
                   lat=response.latitude;
                   long=response.longitude;
                   weather(lat,long,(err,resp)=>{
                             if(err){
                                 console.log("the error is ",err);
                                 resp.send("there is an error in getting the forecast");
                             }
                             res.render("weatherForecast",{temperature:resp.temperature,name:resp.name});
                   });

                 
      });
});

app.get('/help',(req,res)=>{
   res.render("help",{name:"reyna"});
});


app.get("/help/*",(req,res)=>{
    res.render("404",{title:"Help Article Not Found",name:"harry"});
});

app.get("*",(req,res)=>{
    res.render("404",{title:"Page not found",name:"titanium"});
})




app.listen(3000,()=>{

    console.log("server is up and running on port: 3000");
})