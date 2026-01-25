import { NextRequest, NextResponse } from "next/server";

// Fixed admin credentials (in production, use environment variables and proper hashing)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin@123";

// Simple token generation
function generateToken(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `samko_${timestamp}_${randomPart}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken();
      
      // Create response with auth cookie
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        token,
      });

      // Set HTTP-only cookie for additional security
      response.cookies.set("samko_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    // Invalid credentials
    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
