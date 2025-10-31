import { NextRequest, NextResponse } from "next/server";
import { holidayList } from "../../data/holidays";

// GET /api/holiday-list
export async function GET(req) {
  try {
    return NextResponse.json({
      success: true,
      total: holidayList.length,
      data: holidayList,
    });
  } catch (error) {
    console.error("Error fetching holiday list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
