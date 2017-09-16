var html="";

$(function(){
  $.get('/cities', appendToSelection);
    function appendToSelection(cities){
      var selectionMenu=[];
      var content, cityName;
      //Adding links to cities
      cities.forEach(function(city){
        content='<a href="/cities/'+city+'">'+city+'</a>';
        selectionMenu.push($('<li>', {html: content}));
      });
      $('.selection').append(selectionMenu);
      }


          //submitting the form with Javascript
          $('.add-city').on('submit', function(event){
            event.preventDefault();
            var form=$(this);
            var cityData=form.serialize();
            $.ajax({
              type:'POST',
              url:'/cities',
              data:cityData,
            }).done(function(cityName){
              //[cityName] because the appendToSelection function only works on arrays
              //Updating the list with the new City
              appendToSelection([cityName]);
              //cleans form input text fields
              form.trigger('reset');
            });
          });
    })
