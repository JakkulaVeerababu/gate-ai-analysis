from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional

from ..database import get_db
from ..models import domain, schemas
from .auth import get_current_user, get_current_optional_user
from ..services.parser import parse_mht_file, GateParserError
from ..services.scorer import calculate_score
from ..ml.predictor import get_rank_prediction

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("/responses", response_model=schemas.ResultResponse)
async def upload_responses(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Optional[domain.User] = Depends(get_current_optional_user)
):
    if not file.filename.endswith('.mht'):
        raise HTTPException(status_code=400, detail="Only .mht files are allowed")
    
    try:
        content = await file.read()
        extracted_data = parse_mht_file(content)
        
        # Save extracted responses to DB
        saved_responses = []
        # In a real scenario, paper_code and shift need to be extracted from MHT or explicitly provided.
        # Assuming we extract or hardcode for prototype
        paper_code = "CS" 
        shift = 1
        user_id = current_user.id if current_user else None
        
        for ans in extracted_data:
            resp = domain.Response(
                user_id=user_id,
                paper_code=paper_code,
                shift=shift,
                question_number=ans.get("question_number"),
                selected_answer=ans.get("selected_answer")
            )
            db.add(resp)
            saved_responses.append(resp)
            
        db.commit()
        
        # Calculate Score
        answer_keys = db.query(domain.AnswerKey).filter(
            domain.AnswerKey.paper_code == paper_code,
            domain.AnswerKey.shift == shift
        ).all()
        
        if not answer_keys:
            raise HTTPException(status_code=400, detail="Answer key not found for this paper and shift")
            
        score_data = calculate_score(saved_responses, answer_keys)
        
        # Get ML prediction
        prediction_data = get_rank_prediction(score_data["raw_score"])
        
        # Save Result
        result = domain.Result(
            user_id=user_id,
            raw_score=score_data["raw_score"],
            predicted_rank=prediction_data["predicted_rank"],
            percentile=prediction_data["percentile"],
            correct_count=score_data["correct_count"],
            wrong_count=score_data["wrong_count"],
            unattempted=score_data["unattempted"]
        )
        db.add(result)
        db.commit()
        db.refresh(result)
        
        return result
        
    except GateParserError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
