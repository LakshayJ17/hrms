from motor.motor_asyncio import AsyncIOMotorClient
import os 

mongo_uri = os.getenv('MONGO_URI')

if not mongo_uri:
    raise RuntimeError("MONGO_URI not set")

client = AsyncIOMotorClient(mongo_uri)

# db name 
db = client.hrms

# collections
employee_collection = db.employees
attendance_collection = db.attendance

