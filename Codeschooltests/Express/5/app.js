/*Continue modifying your existing cities app
Convert all routes to using the router system
System should use function chaining
Extract your cities information into a separate file
File should export the full router item
All features should still work normally.
‘/cities’ should not be present in any of the routes since it should be the root item for the router*/

var express=require('express');
var app=express();
var cities=require('./routes/cities');


app.use('/cities', cities);



app.use(express.static('public'));


app.listen(3000);
