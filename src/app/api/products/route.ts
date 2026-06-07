import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { createProduct, listProducts } from "@/lib/repositories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const products = await listProducts({
      category: searchParams.get("category") || undefined,
      size: searchParams.get("size") || undefined,
      color: searchParams.get("color") || undefined,
      featured: searchParams.get("featured") === "true" || undefined,
      search: searchParams.get("search") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      sort: searchParams.get("sort") || "newest",
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const product = await createProduct({
      title: body.title,
      slug: body.slug || slugify(body.title),
      description: body.description,
      price: body.price,
      images: body.images || [],
      category: body.category,
      sizes: body.sizes || [],
      colors: body.colors || [],
      stock: body.stock ?? 0,
      featured: body.featured ?? false,
      sku: body.sku,
      customizable: body.customizable ?? false,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
