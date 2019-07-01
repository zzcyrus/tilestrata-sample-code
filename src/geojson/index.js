import serverStore from '../util/server'
const tilestrataPostGISGeoJSON = require('tilestrata-postgis-geojson-tiles')
const headers = require('tilestrata-headers')

const server = serverStore()

server
  .layer('geojson-tiles')
  .route('tile.json')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(
    tilestrataPostGISGeoJSON({
      geometryField: 'geom',
      sql: function (server, req) {
        return 'select name, {geojson} from world_merc WHERE ST_Intersects(geom, {bbox})'
      },
      pgConfig: {
        username: 'postgres',
        password: 'postgres',
        host: '10.211.55.4',
        port: '5432',
        database: 'shapefile'
      }
    })
  )

// png result http://127.0.0.1:9527/world_merc/6/55/25/tile.png
// GeoJSON result http://127.0.0.1:9527/geojson-tiles/6/55/25/tile.json
