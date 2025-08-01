import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // adjust path if needed

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('GET /category/[id] error:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
