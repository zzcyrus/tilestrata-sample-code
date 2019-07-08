import serverStore from '../util/server'
const lru = require('tilestrata-lru')
const mapnik = require('tilestrata-mapnik')
const headers = require('tilestrata-headers')

const server = serverStore()

const provider = mapnik({
  pathname: 'style/province.xml'
})

// set total size limit of cache
server
  .layer('lru_layer_size')
  .route('tile.png')
  .use(provider)
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(lru({ size: '20mb', ttl: 30 })) // ttl in seconds

// or set a total number of items
server
  .layer('lru_layer_number')
  .route('tile.png')
  .use(provider)
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(lru({ size: 20, ttl: 30 }))

// set a function for the cache key
server
  .layer('lru_layer_key')
  .route('tile.png')
  .use(provider)
  .use(
    headers({
      'Access-Control-Allow-Origin': '*'
    })
  )
  .use(
    lru({
      key: function (req) {
        var compressed = /gzip|deflate/.test(req.headers['accept-encoding'])
          ? 1
          : 0
        return (
          req.z +
          ',' +
          req.x +
          ',' +
          req.y +
          ',' +
          req.layer +
          ',' +
          req.filename +
          ',' +
          compressed
        )
      }
    })
  )

// test http://127.0.0.1:9527/lru_layer_size/4/12/6/tile.png
// test http://127.0.0.1:9527/lru_layer_number/4/12/6/tile.png
// test http://127.0.0.1:9527/lru_layer_key/4/12/6/tile.png
