$(document).ready(function() {
    console.log("jQuery загружен, инициализация эффектов...");
    
    $('.one-post').hover(

        function(event) {
            console.log("Навели на пост");
            console.log("event.currentTarget:", event.currentTarget);
            console.log("event.target:", event.target);
            
            $(event.currentTarget).find('.one-post-shadow').animate({
                opacity: '0.1' 
            }, 300);  
        },
        function(event) {
            console.log("Убрали курсор с поста");
            

            $(event.currentTarget).find('.one-post-shadow').animate({
                opacity: '0'
            }, 300);
        }
    );
    
    $('.one-post').hover(
        function() {
            $(this).addClass('highlighted');
        },
        function() {
            $(this).removeClass('highlighted');
        }
    );
    
    $('.logo').hover(
        function() {
            $(this).animate({
                width: '50px',  
                opacity: '0.9'
            }, 200);
        },
        function() {
            $(this).animate({
                width: '30px',
                opacity: '1'
            }, 200);
        }
    );
    
    $('.logo').click(function() {
        $(this).animate({
            width: '50px',
            opacity: '0.8'
        }, 200).animate({
            width: '30px',
            opacity: '1'
        }, 200);
    });
    
    var hoverCount = 0;
    $('.one-post').hover(
        function() {
            hoverCount++;
            console.log("Всего наведений:", hoverCount);
        }
    );
    
    console.log("Эффекты успешно инициализированы!");
});