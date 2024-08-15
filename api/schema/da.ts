import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, pgEnum } from 'drizzle-orm/pg-core'

export const DA = pgTable('kpt_srm_da', {
  id: integer('id').primaryKey(),
  division_name: varchar('division_name'),
  vendor_no: varchar('vendor_no'),
  supplier_name: varchar('supplier_name'),
  // blanket_line: varchar('blanket_line '),
  part_no: varchar('part_no'),
  part_desc: varchar('part_desc'),
  blanket_po: varchar('blanket_po'),
  po_date: varchar('po_date'),
  da_no: varchar('da_no'),
  da_date: varchar('da_date'),
  da_qty: varchar('da_qty'),
  po_qty: integer('po_qty'),
  wo_no: varchar('wo_no'),
  receipt_at_vendor: varchar('receipt_at_vendor'),
  wo_progress_by_vendor: varchar('wo_progress_by_vendor'),
  // gr_no: integer('gr_no'),
  // gr_date: integer('gr_date'),
  // rr_no: integer('rr_no'),
  // rr_date: integer('rr_date'),
  // rr_qty: integer('rr_qty'),
  // accepted_qty: integer('accepted_qty'),
  // rew_qty: integer('rew_qty'),
  // reason: integer('reason'),
  // rr_status: integer('rr_status'),
  // landed_cost: integer('landed_cost'),
  // rej_qty: integer('rej_qty'),
  // invoice_no: integer('invoice_no'),
  // unit_price: integer('unit_price'),
  // received_qty: integer('received_qty'),
  // desp_qty: integer('desp_qty'),
  vendor_remark: varchar('vendor_remark'),
  hal_remark: varchar('hal_remark'),
  // createdAt: timestamp('created_at', {
  // 	precision: 6,
  // 	withTimezone: true,
  // }).defaultNow(),
  // updatedAt: timestamp('updated_at', {
  // 	precision: 6,
  // 	withTimezone: true,
  // }).defaultNow(),
})

export const DA_VENDOR_REMARKS = pgTable('kpt_srm_da_vendor_remarks', {
  id: serial('id').primaryKey(),
  da_no: varchar('da_no'),
  batch_no: varchar('batch_no'),
  qty: integer('qty'),
  vendor_remark: varchar('vendor_remark'),
  status: varchar('status'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const MESSAGES = pgTable('kpt_srm_messages', {
  id: serial('id').primaryKey(),
  message: varchar('message'),
  sender: varchar('sender'),
  receiver: varchar('receiver'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});