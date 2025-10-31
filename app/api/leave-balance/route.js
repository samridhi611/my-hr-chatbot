import { NextRequest, NextResponse } from "next/server";
import {employeeData} from "../../data/employee";

// GET /api/leave-balance?id=E001
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Missing id parameter.",
          example: "/api/leave-balance?id=E001",
        },
        { status: 400 }
      );
    }

    const record = employeeData.find(
      (item) => item.employeeId === id
    );

    if (!record) {
      return NextResponse.json(
        { message: "No leave balance found for the given id." },
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
