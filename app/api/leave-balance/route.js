import { NextRequest, NextResponse } from "next/server";
import { leaveBalanceData } from "../../data/hrData";

// GET /api/leave-balance?employeeId=E001
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");

    if (!employeeId) {
      return NextResponse.json(
        {
          error: "Missing employeeId parameter.",
          example: "/api/leave-balance?employeeId=E001",
        },
        { status: 400 }
      );
    }

    const record = leaveBalanceData.find(
      (item) => item.employeeId === employeeId
    );

    if (!record) {
      return NextResponse.json(
        { message: "No leave balance found for the given employeeId." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
