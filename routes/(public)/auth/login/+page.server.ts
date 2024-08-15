// import { ClientProfile } from '$lib/db/schema'
// import { db } from '$lib/db/server'
// import { and, eq } from 'drizzle-orm'
// import type { Action, Actions, PageServerLoad } from './$types'

// const auth: Action = async ({ cookies, request }) => {
//   const data = Object.fromEntries(await request.formData())
//   const { phone, password } = data

//   console.log({ phone, password })

//   const resA = await db
//     .select({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid }).from(ClientProfile).where(and(eq(ClientProfile.MobileNo, phone), eq(ClientProfile.password, password)))
//   const res = resA[0]
//   if (!res) {
//     cookies.set('me', "null", { path: '/' })
//     throw { status: 400, message: 'Invalid phone or password' }
//   }
//   const sid = crypto.randomUUID()
//   const authenticatedUser = await db.update(ClientProfile)
//     .set({ sid })
//     .where(eq(ClientProfile.MobileNo, phone))
//     .returning({ id: ClientProfile.ID, name: ClientProfile.Name, sid: ClientProfile.sid })
//   cookies.set('me', JSON.stringify(authenticatedUser), { path: '/' })
//   return res
// }

// export const actions: Actions = { auth }
