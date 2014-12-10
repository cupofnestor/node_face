var r;


var tg_dfd = $.Deferred();
var rq_dfd = $.Deferred();


$(function(){
	
	$.when(tg_dfd,rq_dfd).done(go);

	$.get("./targets.json", function(d){
		tg_dfd.resolve(d);	
	})

	//get the face
	// use ../snap?reset=true  to reset the array
	$.get("../snap", function(d){
		rq_dfd.resolve(d);
	})

	function go(tg,rq){
		console.log("GO",tg,rq);

		if(!rq.error){
			var im = new Image();
			var c = new Image();
			var req = rq;
			req.sources.forEach(function(f,i){
				f.faceID = i;
						im.src = req.sources[i].face;

					//	$("body").append(im);
			})

			req.tgImageID=2;
			r = new replacer(tg);
			
			//change this to image data
			
			r.replace(req).then(function(d){

				var img = new Image();
				img.src = d.dataURL;
				console.log("replaced",d);
				$("body").append(img);
			
			});
			
		}else{
			$("body").append("h1").html(rq.error);
		}
	
	}
	

})
