import serverStore from '../util/server'
const vtile = require('tilestrata-vtile')
const vtilecomposite = require('tilestrata-vtile-composite')
const headers = require('tilestrata-headers')

const server = serverStore()

const provinceXml = {
  xml: 'style/province.xml',
  tileSize: 256,
  metatile: 1,
  bufferSize: 128
}

const worldXml = {
  xml: 'style/world.xml',
  tileSize: 256,
  metatile: 1,
  bufferSize: 128
}

server
  .layer('province_pbf')
  .route('t.pbf')
  .use(vtile(provinceXml))

server
  .layer('world_pbf')
  .route('t.pbf')
  .use(vtile(worldXml))

server
  .layer('combined_pbf')
  .route('combined.pbf')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(vtilecomposite([['world_pbf', 't.pbf'], ['province_pbf', 't.pbf']]))
