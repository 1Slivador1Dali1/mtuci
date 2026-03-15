var setupFoldButtons = function() {
    var foldBtns = document.getElementsByClassName("fold-button");
    
    for (var i = 0; i < foldBtns.length; i++) {
        foldBtns[i].addEventListener("click", function(event) {
            if (event.target.className == "fold-button folded") {
                event.target.innerHTML = "свернуть";
                event.target.className = "fold-button";
                var displayState = "block";
            } else {
                event.target.innerHTML = "развернуть";
                event.target.className = "fold-button folded";
                var displayState = "none";
            }
            
            event.target
                .parentElement
                .getElementsByClassName('article-author')[0]
                .style.display = displayState;
            
            event.target
                .parentElement
                .getElementsByClassName('article-created-date')[0]
                .style.display = displayState;
            
            event.target
                .parentElement
                .getElementsByClassName('article-text')[0]
                .style.display = displayState;
            
            console.log("Клик по кнопке:", event.target.innerHTML);
        });
    }
};

window.onload = function() {
    setupFoldButtons();
};