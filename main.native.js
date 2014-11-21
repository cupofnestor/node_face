var r;


var tg_dfd = $.Deferred();
var rq_dfd = $.Deferred();


$(function(){
	
	$.when(tg_dfd,rq_dfd).done(go);

	$.get("./targets.json", function(d){
		tg_dfd.resolve(d);	
	})

	$.get("./tracked.json", function(d){
		rq_dfd.resolve(d);
	})

	function go(tg,rq){
		console.log(tg,rq);
		var i = new Image();
		var req = JSON.parse(rq);
		
	
		
		i.src = req.sources[0].face;
		//$("body").append(i);
		r = new replacer(JSON.parse(tg));
		r.replace(req).then(function(d){$("body").append(d)});
	}
})
