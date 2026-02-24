from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import domain, schemas
from .auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Panel"])

@router.post("/answer-key", response_model=schemas.AnswerKeyResponse, status_code=status.HTTP_201_CREATED)
def create_answer_key_entry(
    key_in: schemas.AnswerKeyCreate,
    db: Session = Depends(get_db),
    current_admin: domain.User = Depends(get_current_admin)
):
    # Check if entry already exists for paper, shift and Q no
    existing = db.query(domain.AnswerKey).filter(
        domain.AnswerKey.paper_code == key_in.paper_code,
        domain.AnswerKey.shift == key_in.shift,
        domain.AnswerKey.question_number == key_in.question_number
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Answer key entry already exists for this question")
        
    db_key = domain.AnswerKey(**key_in.dict())
    db.add(db_key)
    db.commit()
    db.refresh(db_key)
    return db_key


@router.get("/answer-key/{paper_code}/{shift}", response_model=List[schemas.AnswerKeyResponse])
def get_answer_key(
    paper_code: str, 
    shift: int, 
    db: Session = Depends(get_db)
):
    keys = db.query(domain.AnswerKey).filter(
        domain.AnswerKey.paper_code == paper_code,
        domain.AnswerKey.shift == shift
    ).order_by(domain.AnswerKey.question_number.asc()).all()
    
    return keys
