
import { Hono } from 'hono'
import 'dotenv/config'
import { db } from '$lib/db/server'
import { sql } from 'drizzle-orm'
const app = new Hono()

app.get('/', async function (c) {
  const q = `SELECT * FROM an where id = 1`
  const res = await db.execute(sql.raw(q))
  return c.json(res)
})


export default app
