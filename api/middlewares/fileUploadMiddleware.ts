/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { MiddlewareHandler } from "hono";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


// TODO: Make this generic, i.e give the user to specify the upload directory
// optionals: uploadDir, callback

const fileUploadMiddleware: MiddlewareHandler = async (c, next) => {
    const formData = await c.req.formData()
    const file = formData.get('csv_file')
    const arr = await (file as any)?.arrayBuffer();

    if (!file) {
        return c.text('No file uploaded', 400);
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    const filename = `${__dirname}/../uploads/${uniqueSuffix}`

    fs.writeFile(filename, Buffer.from(arr), (err: any) => {
        if (err) throw err
    });

    (c.req as any).file = { filename: (file as any).name, path: filename };

    return next();
};

export default fileUploadMiddleware;