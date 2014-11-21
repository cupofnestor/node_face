fs = require('fs');
cv = require('opencv');
var jf = require('jsonfile')
var files = fs.readdirSync("./img");
var res = [];

files.forEach(function(path){
	console.log(path);
	var res = {img_uri:path};
	
	cv.readImage("./img/"+path, function(e,img){
		res.img_size = {width: img.width(), height:img.height()};
	
		img.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
			res.faces = faces;
		    for (var i=0;i<faces.length; i++){
		      var x = faces[i]
		      
		      img.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
				img.putText(i,x.x + x.width/2, x.y + x.height/2);
		    }
		    img.save("./img/"+path+'tracked.jpg');
			jf.writeFileSync("./img/"+path+".json", res);
		  });
	});
	
})