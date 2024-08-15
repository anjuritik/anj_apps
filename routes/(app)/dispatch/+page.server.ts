import { db } from '$lib/db/server'
import { PO } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select().from(PO).orderBy(desc(PO.id)).limit(20)

	return {
		records: JSON.stringify(result)
	}
}
