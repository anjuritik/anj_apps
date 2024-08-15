import { db } from '$lib/db/server'
import { User } from '$lib/db/schema'
import { desc } from 'drizzle-orm'
export const load = async () => {
	const result = await db.select({ id: User.id, name: User.name, phone: User.phone, role: User.role, approved: User.active }).from(User).orderBy(desc(User.id)).limit(20)

	return {
		users: JSON.stringify(result)
	}
}
