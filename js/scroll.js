$(document).ready(function(){
    $menu = $(".home-page .navigation-menu");
    $target = $menu.position().top;
    
    
    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if($target < scrolled) $menu.css('position','fixed').css("top","0").css("bottom","unset");
        else $menu.css('position','absolute').css("bottom","0").css("top","unset");

    };
    
    var onresize = function(e) {
        width = e.target.outerWidth;
        height = e.target.outerHeight;
        console.log("width"+width);
        if(width <= 768 ) $menu.addClass("mobile-size-menu");
        else $menu.removeClass("mobile-size-menu");
    }
    window.addEventListener("resize", onresize);
    
    
})

