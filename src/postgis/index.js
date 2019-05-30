import serverStore from '../util/server'
const tilestrataPostGISGeoJSON = require('tilestrata-postgis-geojson-tiles')
const headers = require('tilestrata-headers')
const disk = require('tilestrata-disk')

const server = serverStore()

server
  .layer('geojson-tiles')
  .route('tile.json')
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(disk.cache({ dir: 'tilecache' }))
  .use(
    tilestrataPostGISGeoJSON({
      geometryField: 'geom',
      sql: function (server, req) {
        return "select name, {geojson} from (select name, ST_Transform(way,4326) as geom from china_polygon where name ~ '北京') as a1 WHERE ST_Intersects(geom, {bbox})"
      },
      pgConfig: {
        username: 'postgres',
        password: 'postgres',
        host: '10.211.55.4',
        port: '5432',
        database: 'china'
      }
    })
  )
