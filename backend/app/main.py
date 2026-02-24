from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .models import domain
from .routes import auth, admin, upload

# Create db tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GateScope API",
    description="Backend API for GATE Response Analyzer & Rank Predictor",
    version="1.0.0"
)

# CORS config — only added once
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(upload.router)

@app.on_event("startup")
def startup_event():
    """Auto-seed the database with answer keys on first startup."""
    import sys, os
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from .database import SessionLocal
    db = SessionLocal()
    try:
        existing = db.query(domain.AnswerKey).filter(
            domain.AnswerKey.paper_code == "CS",
            domain.AnswerKey.shift == 1
        ).first()
        if not existing:
            for i in range(1, 66):
                key = domain.AnswerKey(
                    paper_code="CS",
                    shift=1,
                    question_number=i,
                    correct_answer="A",
                    question_type="MCQ",
                    marks=1.0 if i <= 30 else 2.0
                )
                db.add(key)
            db.commit()
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to GateScope API"}
