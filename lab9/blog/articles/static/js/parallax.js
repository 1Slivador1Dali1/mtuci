$(document).ready(function() {
    
    var yPosition;
    var scrolled = 0;

    var $parallaxElements = $('.icons-for-parallax img');
    var $logo = $('.logo');  
    
    $(window).scroll(function() {
        scrolled = $(window).scrollTop();
        
        for (var i = 0; i < $parallaxElements.length; i++) {

            var speed = 0.15 * (i + 1); 
            yPosition = scrolled * speed;
            
            $parallaxElements.eq(i).css({ 
                top: yPosition,
                transform: 'rotate(' + (scrolled * 0.02) + 'deg)'
            });
        }
        
        var logoSpeed = 0.08;
        var logoYPosition = scrolled * logoSpeed;
        $logo.css({
            top: 20 + logoYPosition, 
            opacity: 1 - (scrolled * 0.001) 
        });
        
        var opacity = Math.min(0.9, scrolled * 0.001);
        $('.parallax-header').css({
            'background-color': 'rgba(26, 188, 156, ' + (1 - opacity) + ')'
        });
    });
    
    $('.icons-for-parallax img').hover(
        function() {
            $(this).stop().animate({
                width: '+=30',
                opacity: 0.8
            }, 200);
        },
        function() {
            $(this).stop().animate({
                width: '-=30',
                opacity: 1
            }, 200);
        }
    );
    
});