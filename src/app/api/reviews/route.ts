import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import {
  createReview,
  listReviews,
  updateReviewApproval,
} from "@/lib/repositories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId") || undefined;
    const reviews = await listReviews({ productId, approvedOnly: true });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const review = await createReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, approved } = await request.json();
    const review = await updateReviewApproval(id, approved);
    return NextResponse.json(review);
  } catch (error) {
    console.error("Reviews PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}
