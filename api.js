P = require("./photo.js");
p = new P();
var fs = require('fs');
var Canvas = require("canvas");
var ex = require('express');
var api = ex();
api.use('/test', ex.static('.'));
var tmp = require("tmp")
var bodyParser = require('body-parser');

api.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
api.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
	limit: '50mb'
}));

api.get('/snap', function(req,res){
	res.type('json');
	if(req.query.reset){
		var r = {"reset":" "};
		console.log(req.query.reset);
		if(req.query.reset == "last") {
			r.reset = "Last photo";
			p.resetLast();
		}else{
			r.reset = "All photos";
			p.reset();
		}
		
		
		
		res.json(r);
	}else 	if(req.query.calibrate){
		console.log("Calibrating");
		p.calibrate().then(function(cr){
			console.log("Calibration complete", cr);
			p.snap().then(function(sr){
				res.json(sr);
			}).catch(function(e){
				console.log("Snap error", e)
				res.json({error:e});
			});
		});


	
	}else{
		p.snap().then(function(d){
	
			res.json(d);
		}).catch(function(e){

	
			res.json({error:e});
		});
	}

});



api.get('/calibrate', function(req,res){


		p.calibrate().then(function(d){
			res.type('json');
			res.json(d);
		});
	

});


api.get('/', function(req,res){
		res.type('json');
		res.json({"hello":"world"});

})


api.post('/saveimg', function(req,res){
		console.log("saveimg");
		res.type('json');
		
		var doc = req.body;
		var dataURL = doc.dataURL;
		
		var I = new Canvas.Image();
		I.src = dataURL;
		var cnv = new Canvas(I.width, I.height);
		var ctx = cnv.getContext('2d');
		
		ctx.drawImage(I,0,0);
		
	
		
		tmp.tmpName(function(err, path) {
			doc.path = path+".png";
			debugger;
			res.send(doc);
			console.log("response");
		    fs.writeFile(doc.path, cnv.toBuffer());
			console.log("writeimage");
		});	
})


api.listen(2999);