// File: app/api/attendance/route.ts
import { NextResponse } from "next/server";
import employees from "@/data/employees.json";

/**
 * GET /api/attendance?employeeId=EMP001
 * GET /api/attendance?name=Amit%20Sharma
 * GET /api/attendance?employeeId=EMP001&date=2025-10-24
 * GET /api/attendance?name=Priya%20Patel&from=2025-10-20&to=2025-10-25
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get("employeeId");
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const limit = searchParams.get("limit");

  if (!empId && !name) {
    return NextResponse.json(
      { error: "Either employeeId or name is required" },
      { status: 400 }
    );
  }

  // Find employee by ID or Name (case-insensitive)
  let employee;
  if (empId) {
    employee = employees.find(emp => emp.employeeId === empId);
  } else if (name) {
    const lowerName = name.toLowerCase();
    employee = employees.find(emp => emp.name.toLowerCase() === lowerName);
  }

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  let logs = employee.attendance;

  // Filter by date
  if (date) {
    logs = logs.filter(a => a.date === date);
  }

  // Filter by date range
  if (from && to) {
    logs = logs.filter(a => a.date >= from && a.date <= to);
  }

  // Limit last N entries
  if (limit) {
    logs = logs.slice(-Number(limit));
  }

  return NextResponse.json({
    employeeId: employee.employeeId,
    name: employee.name,
    attendance: logs
  });
}
