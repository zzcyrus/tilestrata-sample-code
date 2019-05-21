import '../mapnik'
import '../postgis'
import '../sharp'
import '../gm'

import serverStore from '../util/server'

const sever = serverStore()

sever.listen(9527)
