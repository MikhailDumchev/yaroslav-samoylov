jQuery(document).ready(function(){
	        
    var delay = 3000,
    callback = null;
    $section = jQuery('.with-opinions');
    $slider = $section.find('.slider');
    $display = $slider.find(".display");
    $arrow = $slider.find(".arrow");
    $picts = $section.find(".img");
	        
    $arrow.on("click",function(e){
        delay = 10000;
        clearInterval(callback);
        clicks(this);
        initSlider();
    });
	        
    var clicks  = function(el){
        $this = jQuery(el);
        $len = $picts.length;
        if($this.hasClass("left-arrow")){
            var last = $picts.splice($len-1, 1)[0];
            $picts.splice(0, 0, last);
        }else{
            var first = $picts.splice(0, 1)[0];
            $picts.splice($len-1, 0, first);
        }
	            
        $section.find(".img").removeClass("active");           
        jQuery($picts.get(0)).addClass("active");

    };
	        
    var initSlider = function(){            
        callback = setInterval(function(e){clicks($section.find(".img.active"));},delay);
        if(delay > 3000) delay = 3000;
    };
    initSlider();
	        
                
    $section.find(".img").hover(function(e){
        clearInterval(callback);
    },function(e){
        initSlider();
    });
    
    $section.find(".img").click(function(){
        $this = $(this);
        $("#img-holder").html("");
        $this.clone().appendTo("#img-holder");
        $("#img-holder").css("display","block"); 
    });
    
    $("#img-holder, #img-holder .img").click(function(e){
        $(this).css("display","none");
    });

    var manual= false; 
    var slideIndex = 1;
    var delay2 = 3000;
    
    var ns = document.getElementsByClassName("navs");
    var dots = document.getElementsByClassName("nav-block");    
    var slides = document.getElementsByClassName("bs-image");
     
    var timeout = null;
    
    function showSlide(el){
        if(timeout) clearTimeout(timeout);
        slideIndex = $(el).index();
        
        $id = $(el).data("id");
        $(slides).removeClass("active");       
        $('.bs-image[data-id="'+$id+'"]').addClass("active");
        
        manual = true;
    }
                    
    jQuery(ns).on("click", function(e){
        delay2 = 10000;
        var ind = $(this).index();
        ind+=1;
        $(ns).removeClass("active");
        $navs = $(".navs[data-id='"+ind+"']");
        $navs.addClass("active");
        showSlide(this);
    });
                    
    showSlides(slideIndex);
                    
    function plusSlides(n){
        showSlides(slideIndex += n);
    }
   
    function showSlides(n) {          
        if (n > slides.length) {slideIndex = 1;}            
        if (n < 1) {slideIndex = slides.length;}
       
        $(".bs-image").removeClass("active");      
        $(dots).removeClass("active");       
        var slide = slides[slideIndex-1];
 
        $(slide).addClass("active");
    }
        
    var i=1;
    var interval = null;
    interval = setInterval(function(){
        if(!manual)
            plusSlides(i); 
        else{
            timeout = setTimeout(plusSlides(i), delay2);
            manual= false;
        }
    }, delay);
      
    
    
    var toggler = {  
        init: function(scope){
            if(!scope) console.err('Не найден toggler  объeкт. Укажите Dom объект');
            var blocks = scope.getElementsByClassName("text");
            
            Array.from(blocks).forEach(function(element){
                element.addEventListener('click', toggleVisibility);
                
            }); 
            function toggleVisibility(){

                let box = this.getElementsByClassName("slide-block")[0];
                let btn = this.getElementsByClassName("toggle-btn")[0];
                if($(box).hasClass('hidden')){
                   btn.innerHTML = 'cкрыть';
                   $(box).removeClass('hidden');
                   
                }else{
                   btn.innerHTML = 'подробнее';
                   $(box).addClass('hidden');
                }   
            }
        }   
    };
    toggler.init($section);
    
    
    var scroller = {
        init:   function(){

            $('.navbar-nav a').click(function(){
                $id = $(this).data("id");
                if(jQuery(`#section${$id}`).offset()){
                    $('html, body').animate({ scrollTop: jQuery(`#section${$id}`).offset().top + 10 }, 1000);
                    return false;
                }
            });
        }
    };
    scroller.init();


 });


