import type { Context } from "hono";
import { chatService } from "../services";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

const getVendorMessages = async (c: Context) => {
    const cookieMe = getCookie(c, 'me') || ''
    const me = JSON.parse(cookieMe)
    const vendor_no = me.uid
    console.log("Vendor No", vendor_no)
    const res = await chatService.getChatMessages(vendor_no, 'admin')
    return c.json(res)
}

const sendMessage = async (c: Context) => {
    const cookieMe = getCookie(c, 'me') || ''
    const me = JSON.parse(cookieMe)
    const { receiver, message, sender } = await c.req.json()
    if (!message) return c.json({ message: "Empty message not allowed" }, 400)
    const vendor_no = me.uid
    const senderToSave = me?.role === 'admin' && sender === 'admin' ? 'admin' : vendor_no
    console.log("Vendor No", vendor_no)
    const res = await chatService.sendMessage(senderToSave, receiver, message)
    return c.json(res)
}

const getAllAdminChats = async (c: Context) => {
    const cookieMe = getCookie(c, 'me') || ''
    const me = JSON.parse(cookieMe)
    if (me.role !== 'admin') { // TODO: Improve this
        throw new HTTPException(401, { message: 'Unauthorized' })
    }
    const res = await chatService.getAllChatsByUser('admin')
    console.log(res)
    return c.json(res)
}

const getChatMessages = async (c: Context) => {
    const cookieMe = getCookie(c, 'me') || ''
    const me = JSON.parse(cookieMe)
    if (me.role !== 'admin') { // TODO: Improve this
        throw new HTTPException(401, { message: 'Unauthorized' })
    }
    const { p1, p2 } = c.req.query()
    const res = await chatService.getChatMessages(p1, p2)

    console.log(res)
    return c.json(res)
}

export default { getVendorMessages, sendMessage, getAllAdminChats, getChatMessages }