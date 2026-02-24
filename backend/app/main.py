from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .models import domain

# Create db tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GateScope API",
    description="Backend API for GATE Response Analyzer & Rank Predictor",
    version="1.0.0"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .routes import auth, admin, upload
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(upload.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to GateScope API"}
