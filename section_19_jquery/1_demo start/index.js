$(document).ready(function() {
    $("h1").css("color", "red"); //select all h1 elements and change color prop to red. $ = document.querySelector
    console.log($("h1").css("color")); //will print the value of the css property 'color' of the selected h1
    $("h1").addClass("big-title"); //add css class
    //to remove it: $("h1").removeClass("big-title");
    //add multiple classes: $("h1").addClass("big-title margin-50");
    console.log($("h1").hasClass("big-title")); //true
    $("h1").text("Bye");
    $("button").text("Submit");
    $("button").html("<em>Hey</em>");

    //manipulate attributes
    $("a").attr("href","https://www.google.com");

    //add event listeners...no for loop needed like in JS
    $("h1").click(function(){
        $("h1").css("color", "purple");
    });

    $("input").keypress(function(event){
        console.log(event.key);
    });

    //generic style with 'on'
    $("h1").on("mouseover", function(){
        $("h1").css("color","blue");
    });

    //add and remove new elements
    $("h1").before("<button>New before!</button>");
    $("h1").after("<button>After before!</button>");
    //remove: $( "button" ).remove();

    //animations
    $("button").on("click", function(){
        $("h1").toggle(); //hide and show
        //$("h1").fadeToggle(); //hide and show with fadeOut and fadeIn
        //same with slideDown or slideUp...and slideToggle
        //there is also an animate method
        //we can chain also animations like $("h1").slideUp().slideDown().animate(...) ...
    });
});