
import { db } from '$lib/db/server'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { PO } from '../schema/po'

const app = new Hono()

app.get('/', async (c) => {
  const cookieMe = getCookie(c, 'me') || ''
  const me = JSON.parse(cookieMe)
  const vendor_no = me.uid
  // console.log(`SELECT ROW_NUMBER() OVER () AS SL, p.* FROM kpt_srm_po p where p.vendor_no='${vendor_no}'`)
  // const q = `select row_number() over () as sl, p.id, p.vendor_no, p.supplier_name,        p.part_no, p.part_desc, p.blanket_po,   p.po_date,      p.po_qty,       p.unit_price,   p.received_qty,       p.desp_qty,     p.vendor_remark,        p.hal_remark,   p.division_name,        p.blanket_line from kpt_srm_po p where p.vendor_no='${vendor_no}' order by p.id desc`
  const q = `select ROW_NUMBER() OVER (ORDER BY p.blanket_po DESC) AS sl, p.blanket_po po_no, max(p.po_date) po_date, sum(p.unit_price*p.po_qty) amount, max(p.vendor_remark) vendor_remark, max(p.hal_remark) hal_remark, max(p.division_name) division_name from kpt_srm_po p where p.vendor_no='${vendor_no}' group by p.blanket_po order by p.blanket_po desc`
  const res = await db.execute(sql.raw(q))
  return c.json(res)
})
app.get('/po-detl', async (c) => {
  const cookieMe = getCookie(c, 'me') || ''
  //console.log(cookieMe)
  const me = JSON.parse(cookieMe)
  // console.log(c)
  const { blanket_po } = c.req.query()

  console.log(blanket_po);

  const q = sql.raw(`select a.blanket_line,a.part_no,a.part_desc,
a.po_qty,a.unit_price,a.received_qty,a.desp_qty
from kpt_srm_po a
where a.blanket_po='${blanket_po}'`)
  const resA = await db.execute(q)
  const res = resA
  return c.json(res)
})

app.post('/', async (c) => {
  const args = await c.req.json()
  const { po_no, vendor_remark } = args
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  // if (me.role !== 'VENDOR') {
  // 	throw new HTTPException(401, { message: 'Unauthorized' })
  // }
  let q: any = {}
  // hal_remark ? q.hal_remark = hal_remark : null
  q.vendor_remark = vendor_remark

  const resA = await db
    .update(PO).set(q).where(eq(PO.blanket_po, po_no)).returning({ po_no: PO.blanket_po, vendor_remark: PO.vendor_remark, hal_remark: PO.hal_remark })
  const res = resA[0]
  return c.json(res)
})

export default app
