import serverStore from '../util/server'
const vtile = require('tilestrata-vtile')
const headers = require('tilestrata-headers')

const server = serverStore()

const common = {
  xml: 'style/province.xml',
  tileSize: 256,
  metatile: 1,
  bufferSize: 128
}

server
  .layer('osm_pbf')
  .route('tile.pbf')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(vtile(common))
