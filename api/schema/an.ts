import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, pgEnum } from 'drizzle-orm/pg-core'

export const An = pgTable('an', {
  id: integer('id').primaryKey(),
  division_name: varchar('division_name'),
  name: varchar('name'),
  description: varchar('description'),
})
