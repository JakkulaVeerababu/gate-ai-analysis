from app.database import SessionLocal
from app.models import domain

def seed_db():
    db = SessionLocal()
    
    # Check if we already have keys for CS Shift 1
    existing = db.query(domain.AnswerKey).filter(
        domain.AnswerKey.paper_code == "CS",
        domain.AnswerKey.shift == 1
    ).first()
    
    if existing:
        print("Answer keys already exist.")
        db.close()
        return
        
    print("Seeding answer keys for CS Shift 1...")
    # Add dummy answer keys for 65 questions
    for i in range(1, 66):
        key = domain.AnswerKey(
            paper_code="CS",
            shift=1,
            question_number=i,
            correct_answer="A", # Mock answer
            question_type="MCQ",
            marks=1.0 if i <= 30 else 2.0
        )
        db.add(key)
        
    db.commit()
    print("Answer keys seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed_db()
