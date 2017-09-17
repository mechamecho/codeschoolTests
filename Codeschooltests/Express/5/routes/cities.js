var express= require('express');
/*returns router instance which can be mounted
as middleware*/
var router= express.Router();
/*forces the use of the native
querystring Node library*/
var bodyParser=require('body-parser');
var parseUrlencoded= bodyParser.urlencoded({extended: false});


var cities={"Providence":"Rhode Island",
 "Newyorkcity":"Newyork",
  "Chicago":"Illinois",
  "Sanfrancisco":"California"};

//the root path relative to the path where it is mounted
//app.js app.use('/cities')
  router.route('/')

  .get(function(request, response){

    if(request.query.limit>Object.keys(cities).length){
      response.status(400).json("This exceeds the length of the cities array");
    }else if(request.query.limit>0){
      response.json(Object.keys(cities).slice(0, request.query.limit));
    }else{
      response.json(Object.keys(cities));
    }

  })

  //creating a post route
  //parseUrlencoded will run first
  .post(parseUrlencoded, function(request, response){
    //returns form data
    var newCity=request.body;
      //adds new city to the cities object
      cities[newCity.name]=newCity.description;
      //sets the status to created status , and responds with newCity.name
      response.status(201).json(newCity.name);
  });

//the /:name path relative to the path where it is mounted
  router.route('/:name')
  .all(function(request, response, next){
    var name=request.params.name;
    var cityName=name[0].toUpperCase()+name.slice(1).toLowerCase();
    request.cityName=cityName;
    next();
  })
  .get(function(request, response){
    if(!cities[request.cityName]){
      response.status(404).json("This city was not found");
    }else{
      var state=cities[request.cityName];
      response.json(state);
    }
  })

  .delete(function(request, response){
    //removes entry from the cities object cityName was set in app.params
    delete cities[request.cityName];
    //sendStatus sets both the status code and the response body
    response.sendStatus(200);
  });










//exports the router instance as a Node module
module.exports=router;
