import serverStore from '../util/server'
const postgismvt = require('tilestrata-postgismvt')
const server = serverStore()
const headers = require('tilestrata-headers')

server
  .layer('osm_mvt')
  .route('tile.mvt')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(
    postgismvt({
      lyr: {
        table: 'import.osm_buildings',
        geometry: 'geometry',
        type: 'circle',
        srid: 3857,
        minZoom: 3,
        maxZoom: 19,
        buffer: 10,
        fields: 'name',
        resolution: 256
      },
      pgConfig: {
        host: 'localhost',
        user: 'gis',
        password: 'gis',
        database: 'gis',
        port: '6543'
      }
    })
  )
