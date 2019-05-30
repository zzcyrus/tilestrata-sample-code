import serverStore from '../util/server'
const blend = require('tilestrata-blend')
const server = serverStore()

server
  .layer('blend_layer')
  .route('combined.png')
  .use(
    blend(
      [
        ['world_merc', 'tile.png'],
        [
          'province',
          'tile.png',
          {
            opacity: 0.5,
            comp_op: 'multiply',
            image_filters: 'agg-stack-blur(10,10)'
          }
        ]
      ],
      {
        matte: 'ffffff'
      }
    )
  )

// test http://127.0.0.1:9527/blend_layer/5/27/11/combined.png
