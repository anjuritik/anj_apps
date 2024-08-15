import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, pgEnum } from 'drizzle-orm/pg-core'

export const PO = pgTable('kpt_srm_po', {
  id: integer('id').primaryKey(),
  division_name: varchar('division_name'),
  vendor_no: varchar('vendor_no'),
  supplier_name: varchar('supplier_name'),
  blanket_line: integer('blanket_line'),
  part_no: varchar('part_no'),
  part_desc: varchar('part_desc'),
  blanket_po: varchar('blanket_po'),
  po_date: varchar('po_date'),
  po_qty: integer('po_qty'),
  unit_price: integer('unit_price'),
  received_qty: integer('received_qty'),
  desp_qty: integer('desp_qty'),
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

export const PO_TEST = pgTable('kpt_srm_po1', {
  id: serial('id').primaryKey(),
  division_name: varchar('DIVISION_NAME'),
  vendor_no: varchar('VENDOR_NO'),
  supplier_name: varchar('SUPPLIER_NAME'),
  blanket_line: integer('BLANKET_LINE'),
  part_no: varchar('PART_NO'),
  part_desc: varchar('PART_DESC'),
  blanket_po: varchar('BLANKET_PO'),
  po_date: varchar('PO_DATE'),
  po_qty: real('PO_QTY'),
  unit_price: real('UNIT_PRICE'),
  received_qty: real('RECEIVED_QTY'),
  desp_qty: real('DESP_QTY'),
  vendor_remark: varchar('VENDOR_REMARK'),
  hal_remark: varchar('HAL_REMARK'),
  // createdAt: timestamp('created_at', {
  // 	precision: 6,
  // 	withTimezone: true,
  // }).defaultNow(),
  // updatedAt: timestamp('updated_at', {
  // 	precision: 6,
  // 	withTimezone: true,
  // }).defaultNow(),
})

