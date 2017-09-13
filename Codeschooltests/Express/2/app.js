/*Create an express app.
Create index.html in a folder called public.
Index.html
Include an H1 header
Include a form with an empty selection element
Create JS file that will make an ajax request to /cities and display each city inside the selection element.
Create a /cities route in your app.js file with at least 4 cities.
*/

var express=require('express');
var app=express();
app.use(express.static('public'));

/*serve these files in the root directory, app.use replaces this*/
// app.get('/', function(request, response) {
//  response.sendFile(__dirname + '/public/index.html');
// });

app.get('/cities', function(request, response){
  var cities=["Hamburg", "Frankfurt", "München", "Berlin"];
  response.json(cities);
});



app.listen(3000);
