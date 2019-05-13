import '../mapnik'
import '../postgis'

import serverStore from '../util/server'

const sever = serverStore()

sever.listen(9527)
