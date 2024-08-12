// src/routes/todos/index.ts
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    return {
        status: 200,
        body: { message: "Hello from the API" }
    };
};