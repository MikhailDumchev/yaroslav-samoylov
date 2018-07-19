var buttons = document.getElementsByClassName("subscribe-button");
var handlerAddress = "https://air2.yaroslav-samoylov.com/lead/add/";
var with_phone=false;

jQuery(document).on("click",".send__button", function(event){
    var form = jQuery(this).parents(form);
	
	var container = jQuery(form).parents('.subscribe-form');
	if(container){
        var data = jQuery(form).serializeArray();
 	    
	    var n = data[0].value;
	    var e = data[1].value;
	    var p = '000-00-00';
	    var id = data[2].value;

	    if(!validate(p , 'phone') ){
    		jQuery("#phone-1").css("border","2px solid rgb(12, 133, 247)");
    		return false;
	    }

	    start_loading(container);

        jQuery.post(handlerAddress, data, function(resp){
        	cosole.log('clickd!');
           var response = JSON.parse(resp);
           if( !response.error ){
           		jQuery(container).fadeTo( "slow" , 0.5, function() {
           			jQuery(container).css("opacity","1");
		        	jQuery(container).html('<div class="success-subscribe" style="padding: 30px;"><div class="hdr" style="display: flex;margin-bottom: 20px;"><div class="img"><img src="/wp-content/uploads/2018/06/checked.png" alt="checked"></div><div class="holder" style="padding: 0 0 0 25px;"><p class="title" style=" font-size: 18px;font-weight: 800;line-height: 20px;">Спасибо! Мы вышлем вам смс!</p></div></div></div>');
		        });
		        setTimeout(function(){jQuery(container).fadeTo( "slow" , 0, function(){ jQuery(container).remove();}  )}, 2000);
				with_phone= false;
		    }
	
                
        });
                   
    }  
});

// function fill_data(data){
    
//     var udata = sessionStorage.getItem('udata');
//     if(udata){
// 	udata = JSON.parse(udata);
// 	var data = jQuery.parseHTML(data);
//         jQuery(data).find("#name-1").val(udata.subscribe_form_name);
//         jQuery(data).find("#email-1").val(udata.subscribe_form_email);
//         return data;
//     }
//     return false;
// }

function validate(string , type){
   jQuery("#name-1").css("border","none");
   jQuery("#email-1").css("border","none");
   
   switch(type){
	case 'name':
		return /([^\s])/.test(string);
	case 'email':
		return /^([a-zA-Z0-9_\.]{2,}@[\D]{1,}\..+)$/.test(string);
	case 'phone':
		return /^(\+[0-9 -]{4,})$/.test(string);
	default: return false;
   }
}


jQuery(document).on('propertychange input','#name-1,#email-1,#phone-1', function (e) {
    var valueChanged = false;

    if (e.type=='propertychange') {
        valueChanged = e.originalEvent.propertyName=='value';
    } else {
        valueChanged = true;
    }
    if (valueChanged) {
        jQuery(this).css("border","none");
    }
});

function start_loading(container){
	jQuery('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')
		.appendTo(container);
	jQuery('<style> .spinner { margin: auto;text-align: center;position: absolute;top: 0;bottom: 0;height: 50px;width: max-content;display: flex;align-items: center;left: 0;right: 0;}.spinner > div {width: 18px;height: 18px;background-color: #0c85f7;border-radius: 100%;display: inline-block;-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;animation: sk-bouncedelay 1.4s infinite ease-in-out both;}.spinner .bounce1 {-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}.spinner .bounce2 {-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}@-webkit-keyframes sk-bouncedelay {0%, 80%, 100% { -webkit-transform: scale(0) }40% { -webkit-transform: scale(1.0) }}@keyframes sk-bouncedelay {0%, 80%, 100% { -webkit-transform: scale(0);transform: scale(0);} 40% { -webkit-transform: scale(1.0);transform: scale(1.0);}} </style>').appendTo(container);
}


// var closing = {
// 	init: function(){
// 		var closebtn = document.getElementsByClassName("close-notification")[0];
// 		console.log(closebtn);
// 		// jQuery( closebtn ).unbind();
// 		closebtn.onclick = this._close;
// 	},
// 	_close: function(){
// 		console.log('close');
// 		jQuery(this).parents(".notification").css("display","none");
// 	}
// }
// closing.init();
