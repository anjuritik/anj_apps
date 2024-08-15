import { db } from '$lib/db/server'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'


const app = new Hono()

app.get('/', async (c) => {
  // console.log('summary', c.req.url)
  const cookieMe = getCookie(c, 'me') || ''
  // console.log(cookieMe)
  const me = JSON.parse(cookieMe)
  const vendor_no = me.uid
  console.log(vendor_no)

  const q = `SELECT (
    SELECT COUNT(distinct p.blanket_po)  po_count
    FROM kpt_srm_po p where p.vendor_no='${vendor_no}'
) AS po_count,
(
    SELECT COUNT(1) po_count 
    FROM kpt_srm_rr r where r.vendor_no='${vendor_no}'
) AS rr_count,
(
    SELECT COUNT(1) po_count 
    FROM kpt_srm_da d where d.vendor_no='${vendor_no}'
) AS da_count`
  // console.log(q)
  const resA = await db.execute(sql.raw(q))
  const res = resA[0]
  return c.json(res)
})
export default app
