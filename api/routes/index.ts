import { Hono } from 'hono'
import 'dotenv/config'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import auth from './auth'
import po from './po'
import da from './da'
import rr from './rr'
import admin from './admin'
import message from './message'
import summary from './summary'
import an from './an'

const app = new Hono()
app.use('/*', cors())
// app.use(prettyJSON())
// app.use(logger())
// app.use('/*', logger())
app.route('/admin', admin)
app.route('/auth', auth)
app.route('/da', da)
app.route('/message', message)
app.route('/po', po)
app.route('/rr', rr)
app.route('/summary', summary)
app.route('/an', an)
// app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

export default app.route('/api', app)

export type Router = typeof app

