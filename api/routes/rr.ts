import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { db } from '../utils/db'
import { RR } from '../schema/rr'

const app = new Hono()

app.get('/', async (c) => {
  const cookieMe = getCookie(c, 'me') || ''
  console.log(cookieMe)
  const me = JSON.parse(cookieMe)
  console.log(me)
  const vendor_no = me.uid
  // const q = `SELECT ROW_NUMBER() OVER (ORDER BY p.rr_no DESC) AS sl, max(p.blanket_po)blanket_po,p.rr_no rr_no,max(p.rr_date)rr_date,max(p.rr_status)rr_status,max(p.hal_remark)hal_remark,max(p.vendor_remark)vendor_remark FROM kpt_srm_rr p where p.vendor_no='${vendor_no}' group by p.rr_no order by p.rr_no desc`
  const q = `SELECT ROW_NUMBER() OVER () AS SL,p.id,p.part_no,p.part_desc,p.blanket_po, p.po_date, p.da_no,p.da_qty, p.invoice_no, p.rr_no,p.rr_date,p.part_no,
(select max(d.wo_no) from kpt_srm_da d where d.da_no=p.da_no and d.blanket_po=p.blanket_po) wono,
p.rr_qty,p.accepted_qty,p.rej_qty,p.rew_qty,p.reason,p.rr_status,p.landed_cost,p.paid_amount, p.payment_date,p.hal_remark,p.vendor_remark FROM kpt_srm_rr p where p.vendor_no='${vendor_no}' order by p.blanket_po desc`
  console.log(q)
  const res = await db.execute(sql.raw(q))
  return c.json(res)
})

app.post('/', async (c) => {
  const args = await c.req.json()
  const { id, vendor_remark } = args
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
    .update(RR).set(q).where(eq(RR.id, id)).returning({ id: RR.id, vendor_remark: RR.vendor_remark, hal_remark: RR.hal_remark })
  const res = resA[0]
  return c.json(res)
})
export default app
