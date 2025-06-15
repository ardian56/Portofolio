import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const body = await req.json();

    const project = await prisma.project.create({
        data: {
            name: body.name,
            description: body.description,
            technologies: body.technologies, // harus JSON object/array
            imageUrl: body.imageUrl,
            githubUrl: body.githubUrl,
            liveUrl: body.liveUrl,
            date: body.date ? new Date(body.date) : null,
        },
    });

    return NextResponse.json(project);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted' });
}
