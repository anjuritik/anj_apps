CREATE TABLE IF NOT EXISTS "kpt_srm_da" (
	"id" serial PRIMARY KEY NOT NULL,
	"division_name " varchar,
	"supplier_name" varchar,
	"part_no" varchar,
	"part_desc" varchar,
	"blanket_po" varchar,
	"po_date" varchar,
	"da_no" varchar,
	"da_date" varchar,
	"da_qty" varchar,
	"po_qty" integer,
	"wo_no" varchar,
	"receipt_at_vendor" integer,
	"wo_progress_by_vendor" integer,
	"vendor_remark" varchar,
	"hal_remark" varchar,
	"created_at" timestamp(6) with time zone DEFAULT now(),
	"updated_at" timestamp(6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kpt_srm_po" (
	"id" serial PRIMARY KEY NOT NULL,
	"division_name " varchar,
	"vendor_no" varchar,
	"supplier_name" varchar,
	"blanket_line " integer,
	"part_no" varchar,
	"part_desc" varchar,
	"blanket_po" varchar,
	"po_date" varchar,
	"po_qty" integer,
	"unit_price" integer,
	"received_qty" integer,
	"desp_qty" integer,
	"vendor_remark" varchar,
	"hal_remark" varchar,
	"created_at" timestamp(6) with time zone DEFAULT now(),
	"updated_at" timestamp(6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kpt_srm_rr" (
	"id" serial PRIMARY KEY NOT NULL,
	"division_name " varchar,
	"supplier_name" varchar,
	"part_no" varchar,
	"part_desc" varchar,
	"blanket_po" varchar,
	"po_date" varchar,
	"da_no" varchar,
	"da_date" varchar,
	"da_qty" integer,
	"invoice_no" varchar,
	"gr_no" varchar,
	"gr_date" varchar,
	"rr_no" varchar,
	"rr_date" varchar,
	"rr_qty" integer,
	"accepted_qty" integer,
	"rej_qty" integer,
	"rew_qty" integer,
	"reason" varchar,
	"rr_status" varchar,
	"landed_cost" integer,
	"vendor_remark" varchar,
	"hal_remark" varchar,
	"created_at" timestamp(6) with time zone DEFAULT now(),
	"updated_at" timestamp(6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"div" varchar,
	"uid" varchar,
	"password" varchar,
	"name" varchar,
	"phone" varchar,
	"role" varchar,
	"active" boolean DEFAULT true,
	"sid" varchar,
	"created_at" timestamp(6) with time zone DEFAULT now(),
	"updated_at" timestamp(6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kpt_srm_da_vendor_remarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"da_no" varchar,
	"batch_no" varchar,
	"qty" integer,
	"vendor_remark" varchar,
	"status" varchar,
	"created_at" timestamp(6) with time zone DEFAULT now(),
	"updated_at" timestamp(6) with time zone DEFAULT now(),
	foreign key (da_no) references kpt_srm_da(da_no)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "kpt_srm_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar,
	"sender" varchar,
	"receiver" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now(),
	"updated_at" timestamp (6) with time zone DEFAULT now()
);