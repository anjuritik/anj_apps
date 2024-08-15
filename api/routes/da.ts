import { db } from '$lib/db/server'
import { and, eq, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { remarkController } from '../controllers'
import { DA } from '../schema/da'

const app = new Hono()

/* Remark routes */
app.get('/:da_no/vendor_remark', remarkController.getDaRemarks)
app.get('/vendor_remark/all', remarkController.getAllDaRemarksDaNo)

app.get('/', async (c) => {
  const cookieMe = getCookie(c, 'me') || ''
  const me = JSON.parse(cookieMe)
  const vendor_no = me.uid
  // const q = `SELECT ROW_NUMBER() OVER (ORDER BY p.da_no DESC) AS sl, max(p.wo_no) wo_no, max(p.blanket_po) blanket_po,p.da_no da_no,max(p.da_qty) da_qty,max(p.da_date) da_date,max(p.po_date) po_date,max(p.hal_remark)hal_remark,max(p.vendor_remark)vendor_remark FROM kpt_srm_da p where p.vendor_no='${vendor_no}' group by p.da_no order by p.da_no desc`
  const q = `SELECT ROW_NUMBER() OVER () AS SL,p.id,p.blanket_po,p.po_date,p.da_no,p.po_date,p.da_qty,p.wo_no,p.part_no,p.part_desc,p.hal_remark,p.division_name,
	(select max(d.vendor_remark) from kpt_srm_da_vendor_remarks d where d.da_no=p.da_no) vendor_remark
	FROM kpt_srm_da p where p.vendor_no='${vendor_no}' order by p.blanket_po desc,p.wo_no`
  console.log(q)
  const res = await db.execute(sql.raw(q))
  // const da_nos: any = res.map((r) => r.da_no)
  // const latestVendorRemarks: any = [];

  // for (const da_no of da_nos) {
  // 	const vendorRemark = await db.select().from(DA_VENDOR_REMARKS).where(eq(DA_VENDOR_REMARKS.da_no, da_no)).orderBy(desc(DA_VENDOR_REMARKS.updatedAt)).limit(1)
  // 	latestVendorRemarks.push({ vendorRemark, da_no })
  // }

  // res.forEach((r) => {
  // 	const vendorRemark = latestVendorRemarks.find((v: any) => v.da_no === r.da_no)
  // 	r.vendor_remark = vendorRemark.vendorRemark[0]?.vendor_remark ?? ''
  // })
  // console.log("FROM SERVER", res)
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
  console.log(q)
  const resA = await db
    .update(DA).set(q).where(eq(DA.id, id)).returning({ id: DA.id, vendor_remark: DA.vendor_remark, hal_remark: DA.hal_remark })
  const res = resA[0]
  return c.json(res)
})

app.post('/vendor_remark', remarkController.saveDaRemark)

export default app
