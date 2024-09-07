import { neon } from '@neondatabase/serverless';

const sql = neon(`${process.env.DATABASE_URL}`);


export async function Get(request: Request, { id }: { id: string }) {
    if (!id) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const response = await sql`
            SELECT * FROM products
            WHERE product_id = ${parseInt(id)}; 
        `;
        return Response.json({ data: response });

    } catch (error) {
        console.error("Error fetching recent product:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}