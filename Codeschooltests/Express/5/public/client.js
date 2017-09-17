var html="";

$(function(){
  $.get('/cities', appendToList);
    function appendToList(cities){
      var list=[];
      var content, cityName;
      //Adding links to cities
      cities.forEach(function(city){
        content='<a href=# data-block="'+city+'"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'+
        '<a href="/cities/'+city+'">'+city+'</a>';
        ;
        list.push($('<li>', {html: content}));
      });
      $('.citiesList').append(list);
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
        appendToList([cityName]);
        //cleans form input text fields
        form.trigger('reset');
      });
    });
    $('.citiesList').on('click', 'a[data-block]', function(event){
      if(!confirm('Are you sure?')){
        return false;
      }
      //the link element that was clicked
      var target= $(event.currentTarget)
      //target.data reads the city's name from the link's data-block attribute
      $.ajax({type:'DELETE',
      url:'/cities/'+target.data('cityName')}).done(function(){
         //removes the li elements containing the link
      target.parents('li').remove();
      })
    });

    })
