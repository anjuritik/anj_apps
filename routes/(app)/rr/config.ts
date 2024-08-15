export const schema = {
  id: { type: 'string', visible: false, text: 'ID' },
  sl: { type: 'string', visible: false },
  landed_cost: { type: 'currency', visible: true, text: 'Landed Cost' },
  vendor_remark: { type: 'edit-modal', visible: true, text: 'Vendor Remark' },
}