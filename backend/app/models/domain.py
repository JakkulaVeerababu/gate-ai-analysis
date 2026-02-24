from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    responses = relationship("Response", back_populates="user")
    results = relationship("Result", back_populates="user")

class AnswerKey(Base):
    __tablename__ = "answer_keys"
    
    id = Column(Integer, primary_key=True, index=True)
    paper_code = Column(String, index=True)
    shift = Column(Integer, index=True)
    question_number = Column(Integer)
    correct_answer = Column(String)
    question_type = Column(String) # MCQ, MSQ, NAT
    marks = Column(Float) # 1 or 2
    
class Response(Base):
    __tablename__ = "responses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    paper_code = Column(String, index=True)
    shift = Column(Integer, index=True)
    question_number = Column(Integer)
    selected_answer = Column(String, nullable=True) # Null if unattempted
    
    user = relationship("User", back_populates="responses")

class Result(Base):
    __tablename__ = "results"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    raw_score = Column(Float)
    predicted_rank = Column(Integer, nullable=True)
    percentile = Column(Float, nullable=True)
    correct_count = Column(Integer)
    wrong_count = Column(Integer)
    unattempted = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="results")
