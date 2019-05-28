import '../mapnik'
import '../postgis'
import '../sharp'
import '../gm'
import '../dependency'
import '../blend'
import '../jsonp'

import serverStore from '../util/server'

// if you want to use vtile disable above import
// import '../vtile'
// import '../vtile-raster'

const sever = serverStore()

sever.listen(9527)
