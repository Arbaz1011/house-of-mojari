import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { createBanner, listBanners } from "@/lib/repositories";

export async function GET() {
  try {
    const banners = await listBanners(true);
    return NextResponse.json(banners);
  } catch (error) {
    console.error("Banners GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
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
    const banners = await listBanners();
    const banner = await createBanner({
      ...body,
      order: body.order ?? banners.length,
      active: body.active ?? true,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Banners POST error:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
