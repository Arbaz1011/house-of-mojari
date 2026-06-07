import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { createCategory, listCategories } from "@/lib/repositories";

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const category = await createCategory({
      name: body.name,
      slug: body.slug || slugify(body.name),
      description: body.description,
      image: body.image,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Categories POST error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
