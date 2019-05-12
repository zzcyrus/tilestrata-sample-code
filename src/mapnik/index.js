var tilestrata = require('tilestrata')
var disk = require('tilestrata-disk')
var mapnik = require('tilestrata-mapnik')
var strata = tilestrata()

strata
  .layer('world_merc')
  .route('tile.png')
  .use(disk.cache({ dir: 'tilecache' }))
  .use(
    mapnik({
      pathname: 'style/stylesheet.xml'
    })
  )

strata.listen(8080)
