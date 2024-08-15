import { db } from '$lib/db/server'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { User } from '../schema/user'

const app = new Hono()

app.post('/logout', async (c) => {
  deleteCookie(c, 'me', { path: '/' })
  return c.json(true)
})

app.post('/login', async (c) => {
  const args = await c.req.json()
  const { uid, password } = args

  const resA = await db
    .select({ id: User.id, name: User.name, sid: User.sid, active: User.active }).from(User).where(and(eq(User.uid, uid), eq(User.password, password)))
  const res = resA[0]
  console.log(res)
  if (!res) {
    deleteCookie(c, 'me', { path: '/' })
    // throw new HTTPException(401, { message: 'Invalid uid or password' }) // Can not throw exception because HTTPException will not set cookie at Client side Application
    return c.json({ sid: null, message: 'Invalid User ID or password' })
  }
  if (res.active == false) {
    return c.json({ sid: null, message: 'Please ask admin to activate your account' })
  }
  // setCookie(c, 'connect.sid', 'res.id', {
  // 	path: '/',
  // })
  const sid = crypto.randomUUID()
  // generate new auth token just in case
  const authenticatedUser = await db.update(User)
    .set({ sid })
    .where(eq(User.uid, uid))
    .returning({ id: User.id, uid: User.uid, name: User.name, sid: User.sid, role: User.role, active: User.active })
  // console.log(authenticatedUser[0])
  setCookie(c, 'me', JSON.stringify(authenticatedUser[0]), { path: '/' })
  return c.json(res)
})

app.post('/signup', async (c) => {
  const args = await c.req.json()
  const { uid, name, dob } = args

  const formattedDOB = new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '-')

  // console.log(formattedDOB)
  const resA = await db
    .select({ id: User.id, name: User.name, sid: User.sid, active: User.active }).from(User).where(eq(User.uid, uid))
  const userExist = resA[0]

  // console.log(!userExist, uid, name, dob)
  if (userExist) {
    return c.json({ status: 400, message: 'uid number already registered' })
  }
  const postData = {
    Name: name,
    Role: 'WINDOW',
    MobileNo: uid,
    DOB: new Date(dob),
    password: formattedDOB,
  }

  const res = await db
    .insert(User).values(postData).returning({ id: User.id, name: User.name, uid: User.uid, role: User.role })
  console.log(res)
  return c.json(true)
})

export default app
