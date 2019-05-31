import serverStore from '../util/server'
const dependency = require('tilestrata-dependency')
const underzoom = require('tilestrata-underzoom')
const server = serverStore()

server
  .layer('underzoom')
  .route('tile.png')
  .use(
    underzoom({
      source: dependency('world_merc', 'tile.png'),
      size: 256,
      zooms: {
        12: 2, // underzoom z12 by 2 levels
        13: 1 // underzoom z12 by 1 level
      }
    })
  )

// make 2x tiles by mosaicing 1x tiles from the next zoom
server
  .layer('underzoom')
  .route('tile@2x.png')
  .use(
    underzoom({
      source: dependency('world_merc', 'tile.png'),
      inputSize: 256,
      outputSize: 512,
      zooms: 4 // underzoom all zoom levels by 4 level
    })
  )

//  orgin output     http://127.0.0.1:9527/world_merc/4/13/6/tile.png
//  mosaicing output http://127.0.0.1:9527/underzoom/4/13/6/tile@2x.png
