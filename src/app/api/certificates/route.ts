import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.certificate.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  // parsing issueDate string ke Date
  if (body.issueDate) {
    body.issueDate = new Date(body.issueDate);
  }

  const data = await prisma.certificate.create({ data: body });
  return NextResponse.json(data);
}


export async function DELETE(req: Request) {
  const body = await req.json();
  const deleted = await prisma.certificate.delete({ where: { id: body.id } });
  return NextResponse.json(deleted);
}
