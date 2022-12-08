const express= require("express");
const https=require("https");
const bodyParser=require("body-parser") //body parser should be installed using npm to fetch the data based on the input
const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
   
})

app.post("/", function(req, res){
    
    
    const query=req.body.cityName;
    const apiKey="b40cde872dbbbd1abf154ac855220cc9";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function(response){ //make get request to get data from external source

       response.on("data", function(data){
          weatherData=JSON.parse(data);
          const temp=weatherData.main.temp;
          const des=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<h1>The temperature in " + query + " is " + temp + " degree celsius </h1>");
          res.write("<h3> The weather is currently " + des + "<h3>");
          res.write("<img src=" + imageURL +">");
          res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})

