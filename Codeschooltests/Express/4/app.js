/*Requirements
Using the level 2/3 app
Add in the ability to add a new city.
City name
Containing city
Should confirm the city and state has values
State should have at least two characters.
City should have at least four characters
Page should update to hide the city
Update page to make the cities links which return the state name
Add ability to remove a city
City should be confirmed prior to removing it
Response should contain the correct status code
Page should update with new info
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

  if(request.query.limit>Object.keys(cities).length){
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
