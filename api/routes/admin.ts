import { Hono } from 'hono';
import { chatController, csvController } from '../controllers';
import fileUploadMiddleware from '../middlewares/fileUploadMiddleware';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { db } from '../utils/db'
import { User } from '../schema/user';
import { eq } from 'drizzle-orm';

const app = new Hono()

app.get('/chats', chatController.getAllAdminChats)
app.get('/messages', chatController.getChatMessages)

/* CSV Upload routes */
app.post('/upload', fileUploadMiddleware, csvController.saveCsvToDB);

app.post('/users', async (c) => {
  const args = await c.req.json()
  const { id, active, role } = args
  const cookieMe = getCookie(c, 'me')
  let me
  if (cookieMe) {
    me = JSON.parse(cookieMe)
  }
  if (me.role !== 'ADMIN') {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  const resA = await db
    .update(User).set({ role: role }).where(eq(User.id, id)).returning({ id: User.id, name: User.name, sid: User.sid, active: User.active })
  const res = resA[0]
  return c.json(res)
})
export default app
