from fastapi import APIRouter, HTTPException
from datetime import datetime
from database import attendance_collection, employee_collection
from models import Attendance

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/")
async def mark_attendance(attendance: Attendance):
    """Route to mark attendance."""
    employee = await employee_collection.find_one(
        {"employeeId": attendance.employeeId}
    )

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    payload = attendance.model_dump()
    payload["date"] = datetime.combine(attendance.date, datetime.min.time())
    await attendance_collection.insert_one(payload)

    return {"message": "Attendance marked successfully"}

@router.get("/{employee_id}")
async def get_attendance(employee_id: str):
    """Route to get all attendance."""
    records = await attendance_collection.find(
        {"employeeId": employee_id},
        {"_id": 0}
    ).to_list(None)

    return records