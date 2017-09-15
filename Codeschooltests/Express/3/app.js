/*CodeSchool Express Level 3
Create a simple express node app meeting the following requirements
Requirements
Create an express app.
Uses the cities app you made in level 2
A /cities route that will display all cities. (minimum of 5 cities)
The /cities route should accept a limit query that will send back:
a certain number of cities
All cities if 0 is provided or if limit query is omitted
return a status error if the limit is higher than the number of cities available in the list
Add a dynamic route to /cities. This should respond with the state that the city resides in.
Dynamic route should return Not Found status code if the requested city is not available.
Make sure to also normalize the data sent in the /cities route. The city sent should be sendable in any case and still find the state it’s in. ie Providence and providence should both return Rhode Island.
Your normalizing of the data should use a middleware function.
Make sure your /cities route still displays while the other routes can only be accessed by curl currently.
*/

var express=require('express');
var app=express();
app.use(express.static('public'));

/*serve these files in the root directory, app.use replaces this*/
// app.get('/', function(request, response) {
//  response.sendFile(__dirname + '/public/index.html');
// });
var cities={"Providence":"Rhode Island",
 "Newyorkcity":"Newyork",
  "Chicago":"Illinois",
  "Sanfrancisco":"California"};
app.param('name', function(request, response, next){
  var name=request.params.name;
  var cityName=name[0].toUpperCase()+name.slice(1).toLowerCase();
  request.cityName=cityName;
  console.log(cityName);
  next();
});
app.get('/cities', function(request, response){

  if(request.query.limit>cities.length){
    response.status(400).json("This exceeds the length of the cities array");
  }else if(request.query.limit>0){
    response.json(Object.keys(cities).slice(0, request.query.limit));
  }else{
    response.json(Object.keys(cities));
  }

});

//creates name parameter on the response object
app.get('/cities/:name', function(request, response){
  if(!cities[request.cityName]){
    response.status(404).json("This city was not found");
  }else{
    var state=cities[request.cityName];
    response.json(state);
  }


});





app.listen(3000);
