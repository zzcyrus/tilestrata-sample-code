import serverStore from '../util/server'
const vtile = require('tilestrata-vtile')
const vtileraster = require('tilestrata-vtile-raster')
const headers = require('tilestrata-headers')

const server = serverStore()

const common = {
  xml: 'style/province.xml',
  tileSize: 256,
  metatile: 1,
  bufferSize: 128
}

server
  .layer('osm_pbf_raster')
  .route('tile.pbf')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(vtile(common))
  .route('tile.png')
  .use(
    vtileraster(common, {
      tilesource: ['osm_pbf_raster', 'tile.pbf']
    })
  )
  .route('tile.json')
  .use(
    vtileraster(common, {
      tilesource: ['osm_pbf_raster', 'tile.pbf']
    })
  )

// http://127.0.0.1:9527/osm_pbf_raster/6/53/23/tile.json
