// /app/api/category/[id]/route.ts
import prisma from '../../../lib/prisma';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(params.id) },
    });

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(category), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500 }
    );
  }
}
