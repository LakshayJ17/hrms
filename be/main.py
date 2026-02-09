from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.employee import router as employee_router
from routes.attendance import router as attendance_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://hrms.bylakshayjain.online"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.api_route("/health", methods=["GET", "HEAD"])
def health():
    return {"status": "ok"}


app.include_router(employee_router)
app.include_router(attendance_router)