import serverStore from '../util/server'
const jsonp = require('tilestrata-jsonp')
const tilestrataPostGISGeoJSON = require('tilestrata-postgis-geojson-tiles')

const server = serverStore()

server
  .layer('geojson_tiles_jsonp')
  .route('tile.json')
  .use(jsonp({ variable: 'callback' }))
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
