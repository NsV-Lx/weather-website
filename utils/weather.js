const request = require("postman-request");


const weather = (lat,lg,callback)=>{
     
    const url = "http://api.weatherstack.com/current?access_key=de9c294e12d8090a0a221dec1b2858dd&query="+encodeURIComponent(lat)+","+encodeURIComponent(lg)
    console.log(url)
    // using the help of destructuring power we are not requesting or gettig entire res object we are limiting overselves to body
    request({url,json:true},(err,{body})=>{
       // going one step further as we can observe we need only error , current and location from body object  which itself resides in res object 
       const {error,current,location} = body
       if(err)
        callback("connection problem",undefined)
       else if(error)
        callback("some problem with given arguments",undefined)

      else
       callback(undefined,{temperature:current.temperature,country:location.country,name:location.name});

    })

}

module.exports = weather;