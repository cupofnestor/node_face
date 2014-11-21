cv = require("opencv")
var src,dest,mask
cv.readImage("/private/var/folders/pg/s_cjgh0x2d52ykp_zc12v9540000gn/T/tmp-6835867n0u8.png_crop.png",function(e,i){src=i})
cv.readImage("/private/var/folders/pg/s_cjgh0x2d52ykp_zc12v9540000gn/T/tmp-6835867n0u8.png_mask.png",function(e,i){mask=i})
dest = new cv.Matrix(600,600)
.save("mask.js")
