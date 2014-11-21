var jf = require('jsonfile')
P = require("./photo.js")
p = new P();
p.snap().then(function(d){jf.writeFileSync(d.dir+"tracked.json", d)})
