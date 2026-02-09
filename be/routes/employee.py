from fastapi import APIRouter, HTTPException
from database import employee_collection
from models import Employee

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.get("/")
async def get_employees():
    "Returns all existing employees"
    
    users = await employee_collection.find({},{"_id" : 0}).to_list(None)
    
    return users
    

@router.post("/")
async def add_employee(employee : Employee):
    "Route to add new employee to db"

    existing_employee = await employee_collection.find_one({
        "$or": [
            {"employeeId" : employee.employeeId},
            {"email" : employee.email}
        ]
    })
    
    if existing_employee:
        raise HTTPException(status_code=409, detail="Employee with this ID or email already exists")
    
    await employee_collection.insert_one(employee.model_dump())
    
    return {"message" : "Employee added successfully"}

@router.delete("/{employee_id}")
async def delete_employee(employee_id : str):
    """Route to delete employee from db"""
    employee = await employee_collection.find_one_and_delete(
        {"employeeId" : employee_id}
    )
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return {"message" : "Employee deleted successfully"}

