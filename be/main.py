from fastapi import FastAPI
from routes.employee import router as employee_router
from routes.attendance import router as attendance_router

app = FastAPI()

@app.get("/")
def root():
    """To check server health"""

    return {"message" : "Status 200 : OK"} 

app.include_router(employee_router)
app.include_router(attendance_router)