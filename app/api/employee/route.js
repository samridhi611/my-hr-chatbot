// File: app/api/employee/route.ts
import { NextResponse } from "next/server";
import {employeeData} from "../../data/employee";

/**
 * GET /api/employee?id=EMP001
 * GET /api/employee?name=Priya%20Patel
 * Returns employee profile details
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const empId = searchParams.get("id");
  const name = searchParams.get("name");

  if (!empId && !name) {
    return NextResponse.json(
      { error: "Either id or name is required" },
      { status: 400 }
    );
  }

  let employee;

  if (empId) {
    employee = employeeData.find(emp => emp.employeeId === empId);
  } else if (name) {
    const lowerName = name.toLowerCase();
    employee = employeeData.find(emp => emp.name.toLowerCase() === lowerName);
  }

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  // Return general profile details only
  const { attendance, ...empDetails } = employee;

  return NextResponse.json(empDetails);
}
