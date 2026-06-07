import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findAdminByEmail, isDatabaseEmpty, seedDatabase } from "@/lib/repositories";
import { generateToken } from "@/lib/auth";
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "@/lib/seed-data";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (await isDatabaseEmpty()) {
      await seedDatabase({
        adminEmail: process.env.ADMIN_EMAIL || "admin@houseofmojari.com",
        adminPassword: process.env.ADMIN_PASSWORD || "Admin@123456",
        products: SAMPLE_PRODUCTS,
        categories: SAMPLE_CATEGORIES,
      });
    }

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({
      adminId: admin._id,
      email: admin.email,
    });

    const response = NextResponse.json({
      message: "Login successful",
      admin: { email: admin.email, name: admin.name },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
