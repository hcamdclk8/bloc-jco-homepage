/* CH 29 JQuery refactoring */

var animatePoints = function() {
    
    var revealPoint = function() {
        // #7
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });

    };

        // #6
        $.each($('.point'), revealPoint);

};

/* CH 23 DOM events scroll */


$(window).load(function() {    
     // #1 originally > 950
     if ($(window).height() > 450) {
         animatePoints();
     }
    
   // #2
     var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

     
    // #3
     $(window).scroll(function(event) {     
         if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
         
     });
 });