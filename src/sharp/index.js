import serverStore from '../util/server'
const mapnik = require('tilestrata-mapnik')
const sharp = require('tilestrata-sharp')
const server = serverStore()

server
  .layer('world_merc_sharp')
  .route('tile.png')
  .use(
    mapnik({
      pathname: 'style/world.xml'
    })
  )
  .use(
    sharp(function (image, sharp) {
      return image
        .resize(256)
        .rotate(180)
        .greyscale()
    })
  )

// test http://127.0.0.1:9527/world_merc_sharp/4/13/8/tile.png
