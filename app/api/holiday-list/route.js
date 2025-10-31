// File: src/app/api/holiday-list/route.js (Next.js 13+ / 15+ App Router)

import { NextResponse } from "next/server";
import { holidayList } from "../../data/holidays";

// Utility function to check if a date is upcoming
function isUpcomingHoliday(dateStr) {
  const today = new Date();
  const holidayDate = new Date(dateStr);
  return holidayDate >= today;
}

// GET /api/holiday-list?month=11&year=2025&upcoming=true
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const monthParam = searchParams.get("month"); // e.g. "11"
    const yearParam = searchParams.get("year");   // e.g. "2025"
    const upcomingParam = searchParams.get("upcoming"); // "true" or null

    let filteredHolidays = [...holidayList];

    // 🔹 Filter by year if provided
    if (yearParam) {
      filteredHolidays = filteredHolidays.filter((holiday) => {
        const holidayYear = new Date(holiday.date).getFullYear();
        return holidayYear === Number(yearParam);
      });
    }

    // 🔹 Filter by month if provided
    if (monthParam) {
      filteredHolidays = filteredHolidays.filter((holiday) => {
        const holidayMonth = new Date(holiday.date).getMonth() + 1; // 0-indexed
        return holidayMonth === Number(monthParam);
      });
    }

    // 🔹 Filter by upcoming if requested
    if (upcomingParam === "true") {
      filteredHolidays = filteredHolidays.filter((holiday) =>
        isUpcomingHoliday(holiday.date)
      );
    }

    // Sort by date (ascending)
    filteredHolidays.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return NextResponse.json({
      success: true,
      total: filteredHolidays.length,
      filters: {
        month: monthParam || "all",
        year: yearParam || "all",
        upcoming: upcomingParam === "true",
      },
      data: filteredHolidays,
    });
  } catch (error) {
    console.error("Error fetching holiday list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
