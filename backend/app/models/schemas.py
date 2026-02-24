from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- Answer Key Schemas ---
class AnswerKeyBase(BaseModel):
    paper_code: str
    shift: int
    question_number: int
    correct_answer: str
    question_type: str
    marks: float

class AnswerKeyCreate(AnswerKeyBase):
    pass

class AnswerKeyResponse(AnswerKeyBase):
    id: int
    
    class Config:
        from_attributes = True

# --- Response Schemas ---
class GateResponseBase(BaseModel):
    paper_code: str
    shift: int
    question_number: int
    selected_answer: Optional[str] = None

class GateResponseCreate(GateResponseBase):
    pass

class GateResponseModel(GateResponseBase):
    id: int
    user_id: Optional[int] = None
    
    class Config:
        from_attributes = True

# --- Result Schemas ---
class ResultBase(BaseModel):
    raw_score: float
    predicted_rank: Optional[int] = None
    percentile: Optional[float] = None
    correct_count: int
    wrong_count: int
    unattempted: int

class ResultResponse(ResultBase):
    id: int
    user_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
