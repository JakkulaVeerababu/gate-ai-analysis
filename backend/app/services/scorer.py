from typing import List
from ..models import domain

def calculate_score(responses: List[domain.Response], answer_keys: List[domain.AnswerKey]) -> dict:
    """
    Calculates the raw score comparing user responses against the official answer key.
    - 1-mark MCQ -> -0.33
    - 2-mark MCQ -> -0.66
    - MSQ -> no negative 
    - NAT -> no negative
    """
    key_map = {(k.question_number): k for k in answer_keys}
    
    correct_count = 0
    wrong_count = 0
    unattempted = 0
    raw_score = 0.0
    
    for resp in responses:
        if not resp.selected_answer:
            unattempted += 1
            continue
            
        key = key_map.get(resp.question_number)
        if not key:
            continue
            
        if resp.selected_answer.strip().lower() == key.correct_answer.strip().lower():
            # Correct answer
            correct_count += 1
            raw_score += key.marks
        else:
            # Wrong answer
            wrong_count += 1
            if key.question_type == 'MCQ':
                # Apply negative marking
                if key.marks == 1.0:
                    raw_score -= (1/3)
                elif key.marks == 2.0:
                    raw_score -= (2/3)
            # MSQ and NAT have no negative marking
    
    return {
        "raw_score": round(raw_score, 3),
        "correct_count": correct_count,
        "wrong_count": wrong_count,
        "unattempted": unattempted
    }
