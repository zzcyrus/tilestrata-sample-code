import serverStore from '../util/server'
const mapnik = require('tilestrata-mapnik')
const gm = require('tilestrata-gm')
const server = serverStore()

server
  .layer('world_merc_gm')
  .route('tile.png')
  .use(
    mapnik({
      pathname: 'style/world.xml'
    })
  )
  .use(
    gm(function (image) {
      return image.blur(7, 3).rotate('green', 45)
    })
  )

gm.setMaxConcurrency(2)

// http://127.0.0.1:9527/world_merc/4/13/8/tile.png
