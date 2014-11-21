var r;


var tg_dfd = $.Deferred();
var rq_dfd = $.Deferred();


$(function(){
	
	$.when(tg_dfd,rq_dfd).done(go);

	$.get("./targets.json", function(d){
		tg_dfd.resolve(d);	
	})

	$.get("../snap", function(d){
		rq_dfd.resolve(d);
	})

	function go(tg,rq){
		console.log("GO",tg,rq);
		if(!rq.error){
			var i = new Image();
			var req = rq;
			req.sources.forEach(function(f,i){
				f.faceID = i;
			})

			req.tgImageID=0;


			i.src = req.sources[0].face;
			
			$("body").append(i);

			r = new replacer(tg);
			r.replace(req).then(function(d){$("body").append(d)});
		}else{
			$("body").append("h1").html(rq.error);
		}
	
	}
	

})
