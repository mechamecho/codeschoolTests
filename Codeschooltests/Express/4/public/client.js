var html="";

$(function(){
  $.get('/cities', appendToSelection);
    function appendToSelection(cities){
      var selectionMenu=[];
      cities.forEach(function(city){
        selectionMenu.push($('<option>', {text: city}));
        console.log(city);
      });
      $('.selection').append(selectionMenu);
    }

});
