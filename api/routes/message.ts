
import { Hono } from 'hono'
import 'dotenv/config'
import { chatController } from '../controllers'
const app = new Hono()

/* Message Routes */
app.get('/', chatController.getVendorMessages)
app.post('/', chatController.sendMessage)
export default app
