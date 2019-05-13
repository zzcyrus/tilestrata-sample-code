const tilestrata = require('tilestrata')

let server = null

const serverStore = () => {
  if (!server) {
    server = tilestrata()
  }
  return server
}

export default serverStore
