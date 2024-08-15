import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
  if (locals.me) {
    redirect(302, '/')
  }
}

// export const actions = {
//   register: async ({ request }) => {
//     const items = Object.fromEntries(await request.formData())

//     if (
//       typeof username !== 'string' ||
//       typeof password !== 'string' ||
//       !username ||
//       !password
//     ) {
//       return fail(400, { invalid: true })
//     }

//     const user = await db.user.findUnique({
//       where: { username },
//     })

//     if (user) {
//       return fail(400, { user: true })
//     }

//     await db.user.create({
//       data: {
//         username,
//         passwordHash: await bcrypt.hash(password, 10),
//         userAuthToken: crypto.randomUUID(),
//         role: { connect: { name: Roles.USER } },
//       },
//     })

//     throw redirect(303, '/login')
//   },
// }