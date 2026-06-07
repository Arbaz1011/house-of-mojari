import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import {
  countOrders,
  countProducts,
  countReviews,
  getLowStockProducts,
  getRecentOrders,
  getTotalRevenue,
} from "@/lib/repositories";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalProducts,
      featuredProducts,
      pendingOrders,
      totalOrders,
      pendingReviews,
      totalRevenue,
      recentOrders,
      lowStock,
    ] = await Promise.all([
      countProducts(),
      countProducts({ featured: true }),
      countOrders({ status: "pending" }),
      countOrders(),
      countReviews({ approved: false }),
      getTotalRevenue(),
      getRecentOrders(5),
      getLowStockProducts(5),
    ]);

    return NextResponse.json({
      totalProducts,
      featuredProducts,
      pendingOrders,
      totalOrders,
      pendingReviews,
      totalRevenue,
      recentOrders,
      lowStock,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
