// File: app/api/leave-balance/route.ts
import { NextRequest, NextResponse } from "next/server";
import { employeeData } from "../../data/employee";

/**
 * GET /api/leave-balance?id=E001
 * GET /api/leave-balance?name=Amit%20Sharma
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json(
        {
          error: "Either 'id' or 'name' query parameter is required.",
          example: "/api/leave-balance?id=E001 or /api/leave-balance?name=Amit%20Sharma",
        },
        { status: 400 }
      );
    }

    // Find employee by ID or Name
    const record = employeeData.find((item) => {
      if (id && item.employeeId === id) return true;
      if (name && item.name.toLowerCase() === name.toLowerCase()) return true;
      return false;
    });

    if (!record) {
      return NextResponse.json(
        { message: "No leave balance found for the given employee." },
        { status: 404 }
      );
    }

    // Extract only relevant leave-related fields
    const { employeeId, name: empName, leaveBalance, totalLeaves, usedLeaves } = record;

    return NextResponse.json({
      success: true,
      data: { employeeId, name: empName, totalLeaves, usedLeaves, leaveBalance },
    });
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
