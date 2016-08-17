var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('offline', this.onDeviceOffline, false);
    },
    // offline Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceOffline: function() {
        window.location.href="offline.html";
    }
};

app.initialize();



$(document).ready(function(){
	
	
	// home page tab 1 data
	
	var outputone = '';
	var posting = jQuery.get('http://www.couponhunt.co.in/freebies.php');
	posting.done(function(res){
		var result= res;
		
		
		
		
		var i;
		for(i=0; i<result.length; i++){
			
			
			outputone = outputone+'<a class="ftb" style="cursor:pointer;" data-id="'+result[i].id+'"><img class="" src="'+result[i].img+'" alt="img"><strong>'+result[i].title+'</strong><em>'+result[i].cotent+'</em></a>';
			 
			 
		}
		
		
		
		$("#tab-1 div.thumb-layout").html(outputone);
         
		
		
	});
	
	
	
	// home page tab two data
	
	var output = '';
	var posting = jQuery.get('http://www.couponhunt.co.in/coupons.php');
	posting.done(function(datas){
		
		var result= datas;
		
		//alert(result.length);
		
		
		var i;
		for(i=0; i<result.length; i++){
			
			//alert(result[i].image_url);
			
			 /*output = output+'<a href="'+result[i].term_id+'" class="card-small-layout"><img class="responsive-image preload-image" data-original="'+result[i].image_url+'" alt="img"><strong>'+result[i].term_name+'</strong></a>';*/
			 
			/* output = output+'<a href="#"><u>'+result[i].term_name+'</u><img src="'+result[i].image_url+'" alt="img"><em class="overlay '+result[i].class_color+'"></em></a>';*/
			 
			  output = output+'<a data-id="'+result[i].term_id+'" class="scale-hover stb" style="cursor:pointer;"><img class="spcl-brndr responsive-image" src="'+result[i].image_url+'" alt="img"></a>';
			 
			
			 
			 //alert(output);
		}
		
		//output = output;
		//alert(output);
		
		$("#tab-2 div.round-thumbs").html(output);
         
		
		
	});
	
	
	//home page tab 3 data
	
	var outputthree = '';
	var posting = jQuery.get('http://www.couponhunt.co.in/onlinestore.php');
	posting.done(function(datas){
		
		var result= datas;
		
		
		var i;
		for(i=0; i<result.length; i++){
			
			 outputthree = outputthree+'<a href="store.html?id='+result[i].term_id+'" class="scale-hover"><img class="spcl-brndr responsive-image" src="'+result[i].image_uri+'" alt="img"></a>';
		}
		
		
		
		$("#tab-3 div.round-thumbs").html(outputthree);
         
		
		
	});
	
	
	//load more on home page
	$("#homemore").click(function(){
		
		var pageid = $(this).attr('data-page');
		$("#homemore").text('loading...');
		
		var outputmore='';
		var posting = jQuery.get('http://www.couponhunt.co.in/freebies.php?page='+pageid);
	    posting.done(function(datas){
			retsult = datas.length;
			
			if(retsult>0){
				result = datas;
				var i;
				for(i=0; i<result.length; i++){
					
					
					outputmore = outputmore+'<a class="ftb" style="cursor:pointer;" data-id="'+result[i].id+'"><img class="" src="'+result[i].img+'" alt="img"><strong>'+result[i].title+'</strong><em>'+result[i].cotent+'</em></a>  ';
					 
					 
				}
				
		        $("#tab-1 div.thumb-layout").append(outputmore);
				
				var newpage = pageid+1;
				$("#homemore").attr('data-page',newpage);
				$("#homemore").text('More');
				
			}else{
				
				$("#homemore").text('No more result');
			}
			
			
			
			
		});
		
	});
	
	
	////home page slider
	
	var slideroutput = '';
	var posting = jQuery.get('http://www.couponhunt.co.in/featured.php');
	posting.done(function(res){
		
		var featured= res;
		
		
		var i;
		for(i=0; i<featured.length; i++){
			
			 slideroutput = slideroutput+'<a href="detail-page.html?id='+featured[1].id+'" class="news-slider-item"><img class="responsive-image" src="'+featured[1].img+'" alt="img"><h3>'+featured[1].title+'</h3></a>';
		}
		
		
		
		$("div.homepageslider").html(slideroutput);        
		$(".news-slider").owlCarousel({
                autoplay: !0,
                autoplayTimeout: 4e3,
                loop: !0,
                margin: 10,
                nav: !1,
                items: 1,
                dots: !1
            });
			
			
		
	});
	
	//jump to detail page
	$("body").on("click","a.ftb",function(){
		
		var itsid = $(this).attr("data-id");
		//alert(itsid);
		sessionStorage.currpostid= itsid;
		window.location.replace("detail-page.html");
	});
	
	//jump to category detail page
	$("body").on("click","a.stb",function(){
		var itsid = $(this).attr("data-id");
		//alert(itsid);
		sessionStorage.currcat= itsid;
		window.location.replace("category.html");
	});
	
	
});