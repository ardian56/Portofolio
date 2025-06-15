import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(videos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = await prisma.video.create({
    data: {
      title: body.title,
      youtubeUrl: body.youtubeUrl,
      description: body.description,
    },
  });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const deleted = await prisma.video.delete({
    where: { id: body.id },
  });
  return NextResponse.json(deleted);
}
