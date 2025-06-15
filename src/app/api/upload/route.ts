import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Ubah file ke buffer supaya bisa upload
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadStream = () =>
      new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'your-folder' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string });
          }
        );
        stream.end(buffer);
      });

    const uploadResult = await uploadStream();

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed', details: (error as Error).message }, { status: 500 });
  }
}
