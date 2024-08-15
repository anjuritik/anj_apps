# Steps

## Develop

```
pnpm i
pnpm dev
```

## Deploy

```
AUTO
```

## Remove node_mobules

rmdir /s /q node_modules

## Upload instructions from ERP (admin/po)

Template: static/kpt_srm_po.csv

### Instructions

1. vendor_remark will not be imported
2. If a column is missing, it will not be imported
3. If a column contains empty data, it will import empty into PO
4. Records will be checked based on PO_NO, PART_NO
   If all of the above match then update else insert new record

## Upload instructions from ERP (admin/rr)

1. Records will be checked based on PO_NO, PART_NO, RR_NO
   If all of the above match then update else insert new record

## Upload instructions from ERP (admin/da)

1. Records will be checked based on PO_NO, PART_NO, DA_NO
   If all of the above match then update else insert new record
