var i,img,url,c,m,face;
	var targets;
	var tmp;
	var maskdata, cropdata;
	var cnv_src = $("#mask_canvas")[0];
	var cnv_target = $("#main_canvas")[0];
	
	var ctx_src = cnv_src.getContext('2d');
	var ctx_target = cnv_target.getContext('2d');
	var  target;
	var tracked,sources;

	//$.get("targets.json", function(d){targets = d; target=d[0][0]; loadTarget()})

	var dfd_target =  $.Deferred();
	var dfd_src = $.Deferred();
	
	$.when(dfd_target,dfd_src).done(loadTarget);
	$.get("targets.json", function(d){console.log("TG",d); targets = d; target=d[0][0]; dfd_target.resolve(d) });
	$.get("tracked.json", function(d){tracked = d; dfd_src.resolve(d) })
	
	function loadTarget(_targets,_tracked){
		targets = _targets;
		tracked = _tracked;
		target = targets[tracked.tgImageID][tracked.sources[0].faceID]
		
		
		
		c = new Image();
		m = new Image();
		i = new Image();
		face = new Image();

		var url = "test_img/"+target.img_uri;
		
		$.get(url, function(d){console.log(this)});
		$(i).load(function(d){
			console.log("TARGET",d);
			$(cnv_target).attr({width:target.img_size.width, height:target.img_size.height} );
			ctx_target.drawImage(this,0,0);
		//	ctx_target.globalCompositeOperation = "source-atop";

		
		})
		
		i.src = url;
		
		$(c).load(function(d){
			tmp = c;
			
			$(cnv_src).attr({width:d.target.width, height:d.target.height} );
			//ctx_src.globalCompositeOperation = "multiply";
			ctx_src.drawImage(this,0,0);
			cropdata = ctx_src.getImageData(0,0,d.target.width, d.target.height);
		
			m.src ="test_img/mask.png";
		}) 
		
		//Mask loaded
		$(m).load(function(d){
			
			ctx_src.drawImage(this,0,0);
			var maskData = ctx_src.getImageData(0,0,d.target.width, d.target.height);
			var imgData=ctx_src.createImageData(d.target.width, d.target.height);
			
			
			for (var i=0;i<imgData.data.length;i+=4)
			  {
			  	var cropLuma = luma(i, cropdata.data)
			  //	cropdata.data[i+3]=luma(i);
				cropdata.data[i+0]=cropLuma;
				cropdata.data[i+1]=cropLuma;
				cropdata.data[i+2]=cropLuma;
				cropdata.data[i+3]=luma(i, maskData.data);
			  }
			ctx_src.putImageData(cropdata,0,0);
			
			
			
	//	$(".masked").attr("src", cnv_src.toDataURL());
			face.src = cnv_src.toDataURL();
			$(face).load(function(d){
				ctx_target.globalCompositeOperation = "source-atop";
				var boundary = target.boundary;
				
				var tX = target.boundary.x;
				var tY = target.boundary.y;
				var tW = target.boundary.width;
				var tH = target.boundary.height;
				var tCX = tX + (tW/2);
				var tCY = tY + (tH/2);
				
				var sW = cnv_src.width;
				var sH = cnv_src.height;
				
				var scale = tW/sW;
				console.log(tW,sW,scale);
				var sX = tCX - (sW/2);
				var sY = tCY - (sH/2);
				
				ctx_target.rect(target.boundary.x,target.boundary.y,target.boundary.width,target.boundary.height);
				ctx_target.stroke();
				
				ctx_target.drawImage(face, sX ,sY);
				
				
				
				
				
			})
		
		})
		
	
		c.src = "test_img/crop.png";
		

	}
	
	function luma(i, data){
		var sum = 0;
		for (var j = 0; j < 3; j++){
			sum+=data[i+j];
		}
		return sum/3;
	}
