import '../mapnik'
import '../geojson'
import '../sharp'
import '../gm'
import '../dependency'
import '../blend'
import '../jsonp'
import '../lru'
import '../underzoom'
import '../etag'
import '../mvt'

import serverStore from '../util/server'

// if you want to use vtile disable above import
// import '../vtile'
// import '../vtile-raster'
// import '../vtile-composite'

const server = serverStore()

server.listen(9527)
