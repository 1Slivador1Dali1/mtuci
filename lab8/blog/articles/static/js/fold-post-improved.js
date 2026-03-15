var setupFoldButtonsImproved = function() {
    var foldBtns = document.getElementsByClassName("fold-button");
    
    for (var i = 0; i < foldBtns.length; i++) {
        foldBtns[i].addEventListener("click", function(event) {
            var post = event.target.parentElement; 
            
            if (post.className.indexOf("folded") > -1) {
                post.className = "one-post";
                event.target.innerHTML = "свернуть";
            } else {
                post.className = "one-post folded";
                event.target.innerHTML = "развернуть";
            }
        });
    }
};

window.onload = function() {
    setupFoldButtonsImproved();
};

console.log("Скрипт fold-post-improved.js загружен");
console.log("Найдено кнопок:", document.getElementsByClassName("fold-button").length);