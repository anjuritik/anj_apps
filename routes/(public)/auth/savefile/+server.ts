import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const type = formData.get('type') as string

  if (file) {
    let uploadsDir = path.resolve('static/uploads');
    if (type) {
      uploadsDir = path.join(uploadsDir, type)
    }
    const filePath = path.join(uploadsDir, file.name);

    fs.mkdirSync(uploadsDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const responseBody = {
      message: 'File uploaded successfully',
      filePath: `/uploads/${type}/${file.name}`,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const errorBody = {
    error: 'File upload failed',
  };

  return new Response(JSON.stringify(errorBody), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};