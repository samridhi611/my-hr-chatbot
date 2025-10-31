// File: app/api/employee/route.ts
import { NextResponse } from "next/server";
import employees from "@/data/employees.json";

/**
 * GET /api/employee?employeeId=EMP001
 * GET /api/employee?name=Priya%20Patel
 * Returns employee profile details
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get("employeeId");
  const name = searchParams.get("name");

  if (!empId && !name) {
    return NextResponse.json(
      { error: "Either employeeId or name is required" },
      { status: 400 }
    );
  }

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

  // Return general profile details only
  const { attendance, ...empDetails } = employee;

  return NextResponse.json(empDetails);
}
