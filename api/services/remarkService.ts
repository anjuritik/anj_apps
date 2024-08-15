import { db } from "$lib/db/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { DA_VENDOR_REMARKS } from '../schema';

async function getDaRemarks(da_no: string) {
    const res = await db.select().from(DA_VENDOR_REMARKS).where(eq(DA_VENDOR_REMARKS.da_no, da_no)).orderBy(desc(DA_VENDOR_REMARKS.updatedAt))
    return res
}

async function upsertDaRemarks(da_no: string, remarks: any[]) {
    let resB: any = []
    const tasks = remarks.map((async function (remark: any) {
        if (!remark.batch_no) return
        const q: any = {
            batch_no: remark.batch_no,
            da_no: da_no,
            qty: +remark.quantity ? +remark.quantity : 0,
            vendor_remark: remark.remark,
            status: remark.status
        }
        // console.log("q: ", q)

        const resA = await db.select().from(DA_VENDOR_REMARKS).where(and(eq(DA_VENDOR_REMARKS.da_no, da_no), eq(DA_VENDOR_REMARKS.batch_no, q.batch_no)))
        // console.log("resB: ", resB)
        if (resA.length > 0) {
            if (_areDaRemarkRecordEqual(resA[0], q)) return resA[0]

            q.updatedAt = new Date()
            resB = await db
                .update(DA_VENDOR_REMARKS)
                .set(q)
                .where(and(eq(DA_VENDOR_REMARKS.da_no, da_no), eq(DA_VENDOR_REMARKS.batch_no, q.batch_no)))
                .returning({ id: DA_VENDOR_REMARKS.id, vendor_remark: DA_VENDOR_REMARKS.vendor_remark, da_no: DA_VENDOR_REMARKS.da_no })
        } else {
            resB = await db
                .insert(DA_VENDOR_REMARKS)
                .values(q)
                .returning({ id: DA_VENDOR_REMARKS.id, vendor_remark: DA_VENDOR_REMARKS.vendor_remark, da_no: DA_VENDOR_REMARKS.da_no })
        }
        return resB
    }));
    const results = await Promise.all(tasks)
    return results[0]
}

async function getAllDaRemarksDaNo() {
    const q = 'SELECT DISTINCT da_no FROM kpt_srm_da_vendor_remarks ORDER BY da_no ASC;'
    const res = await db.execute(sql.raw(q))
    return res
}

function _areDaRemarkRecordEqual(a: any, b: any) {
    return a.da_no === b.da_no &&
        a.batch_no === b.batch_no &&
        a.vendor_remark === b.vendor_remark &&
        a.qty === b.qty &&
        a.status === b.status
}

export default { getDaRemarks, upsertDaRemarks, getAllDaRemarksDaNo }