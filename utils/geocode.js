const request = require("postman-request")

const geocode = (location,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoidmVua2F0bmlqYWdhbGEiLCJhIjoiY2tkMnUzMXh4MWdwczJybXZkbmI2dzZvaCJ9.KkHAhTT_a_4rXhkp0bvjBg"
    request({url,json:true},(err,{body})=>{
        const {message,features}=body
         if(err){
            
             callback("connection is lost",undefined);
         }
         else if(message){
             
             callback("there is something wrong with the path you provided",undefined);
         
         }
         else{
             console.log("I entered here")
             if(features){
             const latitude = features[0].center[1],longitude=features[0].center[0]
             callback(undefined,{latitude:latitude,longitude:longitude});
             }
             else {
                 callback("we cant find this location",undefined);  
             }
         }
    });
 
 
    
 
 }

 module.exports = geocode;