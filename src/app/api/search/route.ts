import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/repositories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json([]);
    }

    const products = await searchProducts(q);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
