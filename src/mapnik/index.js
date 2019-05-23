import serverStore from '../util/server'
const mapnik = require('tilestrata-mapnik')
const disk = require('tilestrata-disk')
const server = serverStore()

server
  .layer('world_merc')
  .route('tile.png')
  .use(disk.cache({ dir: 'tilecache' }))
  .use(
    mapnik({
      pathname: 'style/world.xml'
    })
  )

server
  .layer('province')
  .route('tile.png')
  .use(
    mapnik({
      pathname: 'style/province.xml'
    })
  )
