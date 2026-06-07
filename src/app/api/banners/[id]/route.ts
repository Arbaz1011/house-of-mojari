import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { deleteBanner, updateBanner } from "@/lib/repositories";

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const banner = await updateBanner(id, body);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error("Banner PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteBanner(id);

    if (!deleted) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Banner deleted" });
  } catch (error) {
    console.error("Banner DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
