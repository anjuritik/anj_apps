/* eslint-disable @typescript-eslint/no-explicit-any */
import { DA, PO, PO_TEST, RR } from "../schema";
import { db } from "$lib/db/server";
import { and, eq } from "drizzle-orm";

interface PoData {
    division_name: string;
    vendor_no: string;
    supplier_name: string;
    blanket_line: number;
    part_no: string;
    part_desc: string;
    blanket_po: string;
    po_date: string;
    po_qty: number;
    unit_price: number;
    received_qty: number;
    desp_qty: number;
    VENDOR_REMARK: string;
    HAL_REMARK: string;
}

interface RrData {
    division_name: string;
    // vendor_no: string;
    supplier_name: string;
    part_no: string;
    part_desc: string;
    blanket_po: string;
    // blanket_line: string;
    po_date: string;
    da_no: string;
    da_date: string;
    da_qty: number;
    invoice_no: string;
    gr_no: string;
    gr_date: string;
    rr_no: string;
    rr_date: string;
    rr_qty: number;
    accepted_qty: number;
    rej_qty: number;
    rew_qty: number;
    reason: string;
    rr_status: string;
    landed_cost: number;
    // unit_price: number;
    // received_qty: number;
    // desp_qty: number;
    vendor_remark: string;
    hal_remark: string;
}

interface DaData {
    division_name: string;
    // vendor_no: string;
    supplier_name: string;
    // blanket_line: string;
    part_no: string;
    part_desc: string;
    blanket_po: string;
    po_date: string;
    da_no: string;
    da_date: string;
    da_qty: string;
    po_qty: number;
    wo_no: string;
    receipt_at_vendor: string;
    wo_progress_by_vendor: string;
    // gr_no: number;
    // gr_date: number;
    // rr_no: number;
    // rr_date: number;
    // rr_qty: number;
    // accepted_qty: number;
    // rew_qty: number;
    // reason: number;
    // rr_status: number;
    // landed_cost: number;
    // rej_qty: number;
    // invoice_no: number;
    // unit_price: number;
    // received_qty: number;
    // desp_qty: number;
    vendor_remark: string;
    hal_remark: string;
}

async function upsertPoData(data: PoData | any) {
    const res: any = [];
    data.forEach(async (rawD: any) => {
        const d = {
            division_name: rawD.division_name,
            vendor_no: rawD.vendor_no,
            supplier_name: rawD.supplier_name,
            blanket_line: +rawD.blanket_line ? +rawD.blanket_line : null,
            part_no: rawD.part_no,
            part_desc: rawD.part_desc,
            blanket_po: rawD.blanket_po,
            po_date: rawD.po_date,
            po_qty: +rawD.po_qty ? +rawD.po_qty : null,
            unit_price: +rawD.unit_price ? +rawD.unit_price : null,
            received_qty: +rawD.received_qty ? +rawD.received_qty : null,
            desp_qty: +rawD.desp_qty ? +rawD.desp_qty : null,
            hal_remark: rawD.hal_remark
        };

        try {
            // const data = await db
            //     .insert(PO)
            //     .values(d)
            //     .onConflictDoUpdate({
            //         target: PO.part_no,
            //         set: {
            //             division_name: d.division_name,
            //             vendor_no: d.vendor_no,
            //             supplier_name: d.supplier_name,
            //             blanket_line: +d.blanket_line,
            //             part_desc: d.part_desc,
            //             blanket_po: d.blanket_po,
            //             po_date: d.po_date,
            //             part_no: d.part_no,
            //             po_qty: +d.po_qty,
            //             unit_price: +d.unit_price,
            //             received_qty: +d.received_qty,
            //             desp_qty: +d.desp_qty,
            //             hal_remark: d.hal_r̥emark
            //         }
            //     })
            //     .returning({
            //         id: PO.id,
            //         vendor_remark: PO.vendor_remark,
            //         hal_remark: PO.hal_remark
            //     });

            const data = await db.select().from(PO).where(and(eq(PO.part_no, d.part_no), eq(PO.blanket_po, d.blanket_po)));
            if (data.length > 0) {
                const updateData = await db
                    .update(PO)
                    .set({
                        division_name: d.division_name,
                        vendor_no: d.vendor_no,
                        supplier_name: d.supplier_name,
                        blanket_line: d.blanket_line,
                        part_desc: d.part_desc,
                        blanket_po: d.blanket_po,
                        po_date: d.po_date,
                        po_qty: d.po_qty,
                        unit_price: d.unit_price,
                        received_qty: d.received_qty,
                        desp_qty: d.desp_qty,
                        hal_remark: d.hal_remark
                    })
                    .where(and(eq(PO.part_no, d.part_no), eq(PO.blanket_po, d.blanket_po)))
                    .returning({
                        id: PO.id,
                        vendor_remark: PO.vendor_remark,
                        hal_remark: PO.hal_remark
                    });
                res.push(updateData);
            } else {
                const insertData = await db
                    .insert(PO)
                    .values(d)
                    .returning({
                        id: PO.id,
                        vendor_remark: PO.vendor_remark,
                        hal_remark: PO.hal_remark
                    });
                res.push(insertData);
            }
        }
        catch (error) {
            // console.log("error", error);
        }

    });
    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

async function upsertRrData(data: RrData | any) {
    const res: any = [];
    data.forEach(async (rawD: any) => {
        const d = {
            division_name: rawD.division_name,
            supplier_name: rawD.supplier_name,
            part_no: rawD.part_no,
            part_desc: rawD.part_desc,
            blanket_po: rawD.blanket_po,
            po_date: rawD.po_date,
            da_no: rawD.da_no,
            da_date: rawD.da_date,
            da_qty: +rawD.da_qty,
            invoice_no: rawD.invoice_no,
            gr_no: rawD.gr_no,
            gr_date: rawD.gr_date,
            rr_no: rawD.rr_no,
            rr_date: rawD.rr_date,
            rr_qty: +rawD.rr_qty,
            accepted_qty: +rawD.accepted_qty,
            rej_qty: +rawD.rej_qty,
            rew_qty: +rawD.rew_qty,
            reason: rawD.reason,
            rr_status: rawD.rr_status,
            landed_cost: +rawD.landed_cost,
            vendor_remark: rawD.vendor_remark,
            hal_remark: rawD.hal_remark
        };
        try {
            const data = await db.select().from(RR).where(and(eq(RR.rr_no, d.rr_no), eq(RR.part_no, d.part_no), eq(RR.blanket_po, d.blanket_po)));
            if (data.length > 0) {
                const updateData = await db
                    .update(RR)
                    .set({
                        division_name: d.division_name,
                        supplier_name: d.supplier_name,
                        part_no: d.part_no,
                        part_desc: d.part_desc,
                        blanket_po: d.blanket_po,
                        po_date: d.po_date,
                        da_no: d.da_no,
                        da_date: d.da_date,
                        da_qty: d.da_qty,
                        invoice_no: d.invoice_no,
                        gr_no: d.gr_no,
                        gr_date: d.gr_date,
                        rr_no: d.rr_no,
                        rr_date: d.rr_date,
                        rr_qty: d.rr_qty,
                        accepted_qty: d.accepted_qty,
                        rej_qty: d.rej_qty,
                        rew_qty: d.rew_qty,
                        reason: d.reason,
                        rr_status: d.rr_status,
                        landed_cost: d.landed_cost,
                        vendor_remark: d.vendor_remark,
                        hal_remark: d.hal_remark
                    })
                    .where(and(eq(RR.rr_no, d.rr_no), eq(RR.part_no, d.part_no), eq(RR.blanket_po, d.blanket_po)))
                    .returning({
                        id: RR.id,
                        vendor_remark: RR.vendor_remark,
                        hal_remark: RR.hal_remark
                    });
                res.push(updateData);
            } else {
                const insertData = await db
                    .insert(RR)
                    .values(d)
                    .returning({
                        id: RR.id,
                        vendor_remark: RR.vendor_remark,
                        hal_remark: RR.hal_remark
                    });
                res.push(insertData);
            }
        }
        catch (error) {
            // console.log("error", error);
        }
    });

    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

async function upsertDaData(data: DaData | any) {
    const res: any = [];
    data.forEach(async (rawD: any) => {
        const d = {
            division_name: rawD.division_name,
            supplier_name: rawD.supplier_name,
            part_no: rawD.part_no,
            part_desc: rawD.part_desc,
            blanket_po: rawD.blanket_po,
            po_date: rawD.po_date,
            da_no: rawD.da_no,
            da_date: rawD.da_date,
            da_qty: rawD.da_qty,
            po_qty: +rawD.po_qty,
            wo_no: rawD.wo_no,
            receipt_at_vendor: rawD.receipt_at_vendor,
            wo_progress_by_vendor: rawD.wo_progress_by_vendor,
            vendor_remark: rawD.vendor_remark,
            hal_remark: rawD.hal_remark
        };
        try {
            const data = await db.select().from(DA).where(and(eq(DA.da_no, d.da_no), eq(DA.part_no, d.part_no), eq(DA.blanket_po, d.blanket_po)));
            if (data.length > 0) {
                const updateData = await db
                    .update(DA)
                    .set({
                        division_name: d.division_name,
                        supplier_name: d.supplier_name,
                        part_no: d.part_no,
                        part_desc: d.part_desc,
                        blanket_po: d.blanket_po,
                        po_date: d.po_date,
                        da_no: d.da_no,
                        da_date: d.da_date,
                        da_qty: d.da_qty,
                        po_qty: d.po_qty,
                        wo_no: d.wo_no,
                        receipt_at_vendor: d.receipt_at_vendor,
                        wo_progress_by_vendor: d.wo_progress_by_vendor,
                        vendor_remark: d.vendor_remark,
                        hal_remark: d.hal_remark
                    })
                    .where(and(eq(DA.da_no, d.da_no), eq(DA.part_no, d.part_no), eq(DA.blanket_po, d.blanket_po)))
                    .returning({
                        id: DA.id,
                        vendor_remark: DA.vendor_remark,
                        hal_remark: DA.hal_remark
                    });
                res.push(updateData);
            } else {
                const insertData = await db
                    .insert(DA)
                    .values(d)
                    .returning({
                        id: DA.id,
                        vendor_remark: DA.vendor_remark,
                        hal_remark: DA.hal_remark
                    });
                res.push(insertData);
            }
        }
        catch (error) {
            // console.log("error", error);
        }
    });

    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

async function savePoData(data: PoData | any) {
    const mappedData = data.map((d: any) => {
        return {
            division_name: d.division_name,
            vendor_no: d.vendor_no,
            supplier_name: d.supplier_name,
            blanket_line: +d.blanket_line,
            part_no: d.part_no,
            part_desc: d.part_desc,
            blanket_po: d.blanket_po,
            po_date: d.po_date,
            po_qty: +d.po_qty,
            unit_price: +d.unit_price,
            received_qty: +d.received_qty,
            desp_qty: +d.desp_qty,
            hal_remark: d.HAL_REMARK
        }
    })
    const res = await db
        .insert(PO_TEST)
        .values(mappedData)
        .returning({ id: PO_TEST.id, vendor_remark: PO_TEST.vendor_remark, hal_remark: PO_TEST.hal_remark });
    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

async function saveRrData(data: RrData | any) {
    const res = await db.insert(RR).values(data).returning({ id: RR.id, vendor_remark: RR.vendor_remark, hal_remark: RR.hal_remark });
    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

async function saveDaData(data: DaData | any) {
    const res = await db.insert(DA).values(data).returning({ id: DA.id, vendor_remark: DA.vendor_remark, hal_remark: DA.hal_remark });
    return { status: 'SUCCESS', message: "Data saved successfully", data: res };
}

export default { savePoData, saveRrData, saveDaData, upsertPoData, upsertRrData, upsertDaData };