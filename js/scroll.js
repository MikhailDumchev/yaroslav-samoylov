$(document).ready(function(){
    $menu = $(".home-page .navigation-menu");
    $target = $menu.position().top;
    
    
    window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    
    if($target < scrolled) $menu.css('position','fixed').css("top","0").css("bottom","unset");
    else $menu.css('position','absolute').css("bottom","0").css("top","unset");
    
  }
//    $(".carousel-controls").on("click",function(){
////        var scope = $(".tab-content")[0];
////        var tabs = $(scope).find(".tab-pane").removeClass("in active");
//        setTimeout(function(){
//            var id = $(".mobile-cat-navigation").find(".active").data("id");
//            console.log(id);
//        },1500);
//        
//        
//        
//    })
    
    
})

