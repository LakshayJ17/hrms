from pydantic import BaseModel, EmailStr
from typing import Literal
from datetime import date

class Employee(BaseModel):
    employeeId : str
    fullName : str
    email : EmailStr
    department : str

class Attendance(BaseModel):
    employeeId : str
    date : date 
    status : Literal["Present", "Absent"]