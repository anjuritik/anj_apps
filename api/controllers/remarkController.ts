import type { Context } from "hono";
import { remarkService } from "../services";
import { getCookie } from "hono/cookie";

async function getDaRemarks(c: Context) {
    try {
        const { da_no } = c.req.param()
        const res = await remarkService.getDaRemarks(da_no)
        return c.json(res)
    }
    catch (e) {
        console.error(e)
        return c.json({ status: 'ERROR' }, 500)
    }
}

async function saveDaRemark(c: Context) {
    const args = await c.req.json()
    const { vendor_remark, da_no } = args
    const cookieMe = getCookie(c, 'me')
    let me
    if (cookieMe) {
        me = JSON.parse(cookieMe)
    }
    // if (me.role !== 'VENDOR') {
    // 	throw new HTTPException(401, { message: 'Unauthorized' })
    // }

    const res = await remarkService.upsertDaRemarks(da_no, vendor_remark)
    return c.json(res)
}

async function getAllDaRemarksDaNo(c: Context) {
    try {
        const cookieMe = getCookie(c, 'me')
        const me = JSON.parse(cookieMe || '{}')
        if (me.role !== 'admin') {
            return c.json({ status: 'ERROR' }, 401)
        }

        const res = await remarkService.getAllDaRemarksDaNo()
        return c.json(res)
    }
    catch (e) {
        console.error(e)
        return c.json({ status: 'ERROR' }, 500)
    }
}

export default { getDaRemarks, saveDaRemark, getAllDaRemarksDaNo }