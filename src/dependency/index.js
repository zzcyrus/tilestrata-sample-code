import serverStore from '../util/server'
const dependency = require('tilestrata-dependency')
const server = serverStore()
const mapnik = require('tilestrata-mapnik')

server
  .layer('world_merc_png')
  .route('tile.png')
  .use(
    mapnik({
      pathname: 'style/world.xml'
    })
  )

server
  .layer('world_merc_png')
  .route('tile.jpg')
  .use(dependency('world_merc_png', 'tile.png'))

// http://127.0.0.1:9527/world_merc_png/4/13/8/tile.jpg
//  http://127.0.0.1:9527/world_merc_png/4/13/8/tile.png
