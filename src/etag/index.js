import serverStore from '../util/server'
var etag = require('tilestrata-etag')
const dependency = require('tilestrata-dependency')
const server = serverStore()

server
  .layer('etag')
  .route('tile.png')
  .use(dependency('world_merc_png', 'tile.png'))
  .use(etag({ limit: '1mb' }))
