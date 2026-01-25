import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("samko_admin_token")?.value;
    
    // Also check Authorization header
    const authHeader = request.headers.get("Authorization");
    const headerToken = authHeader?.replace("Bearer ", "");
    
    const validToken = token || headerToken;

    if (validToken && validToken.startsWith("samko_")) {
      return NextResponse.json({
        success: true,
        authenticated: true,
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: false,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}
