import { MESSAGES } from "../schema"
import { db } from "$lib/db/server"
import { sql } from "drizzle-orm"

const getAllChatsByUser = async (username: string) => {
    try {
        const q = `SELECT
                        chat.participant1,
                        chat.participant2,
                        m.message as "lastMessage",
                        m.created_at
                    FROM
                        (
                            SELECT
                                LEAST(sender, receiver) AS participant1,
                                GREATEST(sender, receiver) AS participant2,
                                MAX(created_at) AS lastMessageTime
                            FROM
                                kpt_srm_messages
                            WHERE
                                sender = '${username}' OR receiver = '${username}'
                            GROUP BY
                                LEAST(sender, receiver),
                                GREATEST(sender, receiver)
                        ) AS chat
                    JOIN
                        kpt_srm_messages AS m
                    ON
                        LEAST(m.sender, m.receiver) = chat.participant1 AND
                        GREATEST(m.sender, m.receiver) = chat.participant2 AND
                        m.created_at = chat.lastMessageTime
                    ORDER BY
                        m.created_at DESC;

        `
        const res = await db.execute(sql.raw(q))
        return res
    } catch (error) {
        console.log("error: ", error)
        return []
    }
}

const getChatMessages = async (p1: string, p2: string) => {
    try {
        const q = `SELECT * FROM kpt_srm_messages WHERE (sender = '${p1}' AND receiver = '${p2}') OR (sender = '${p2}' AND receiver = '${p1}') ORDER BY created_at`
        const res = await db.execute(sql.raw(q))
        return res
    }
    catch (error) {
        console.log("error: ", error)
        return []
    }
}

const sendMessage = async (sender: string, receiver: string, message: string) => {
    try {
        const res = await db
            .insert(MESSAGES)
            .values({ sender, receiver, message })
            .returning({ sender: MESSAGES.sender, receiver: MESSAGES.receiver, message: MESSAGES.message, createdAt: MESSAGES.createdAt })
        return res
    }
    catch (error) {
        console.log("error: ", error)
        return { status: "ERROR" }
    }
}

export default { getAllChatsByUser, getChatMessages, sendMessage }