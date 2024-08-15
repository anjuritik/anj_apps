import { pgTable, serial, date, text, boolean, integer, timestamp, real, varchar, pgEnum } from 'drizzle-orm/pg-core'

// export const RoleEnum = pgEnum('Role', ['WINDOW', 'BACKUP'])

export const User = pgTable('users', {
  id: integer('id').primaryKey(),
  div: varchar('div'),
  uid: varchar('uid'),
  password: varchar('password'),
  name: varchar('name'),
  phone: varchar('phone'),
  role: varchar('role'), // ADMIN, VENDOR
  active: boolean('active').default(true),
  sid: varchar('sid'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
