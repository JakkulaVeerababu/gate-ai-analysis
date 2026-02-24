import os
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(MODEL_DIR, "rank_model.pkl")

# A dummy dataset modeling a typical GATE CS Score vs Rank/Percentile curve
# Score -> [Max: 100, Min: -33]
# Rank -> [Min: 1, Max: 100000+]
# In reality, this data would come from historical DB
def train_dummy_model():
    # Sample points (Score, Rank)
    # E.g. 85+ score might mean top 50
    # 70+ score might mean ~300 rank
    # 50+ score might mean ~3000 rank
    # 30+ score might mean ~15000 rank
    # 20+ score might mean ~30000 rank
    
    # We use log(Rank) for a smoother polynomial fit since rank grows exponentially as score drops
    data = {
        'score': [90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
        'rank': [10, 50, 100, 200, 400, 800, 1500, 2500, 4000, 7000, 10000, 15000, 22000, 30000, 40000, 60000, 80000, 100000]
    }
    df = pd.DataFrame(data)
    
    X = df[['score']]
    y = np.log(df['rank']) # Predicting log of rank
    
    poly = PolynomialFeatures(degree=2)
    X_poly = poly.fit_transform(X)
    
    model = LinearRegression()
    model.fit(X_poly, y)
    
    # Save the model and the poly transformer
    joblib.dump((model, poly), MODEL_PATH)

def get_rank_prediction(score: float) -> dict:
    """
    Returns predicted rank and percentile based on score.
    """
    if not os.path.exists(MODEL_PATH):
        train_dummy_model()
        
    model, poly = joblib.load(MODEL_PATH)
    
    # Ensure score is within valid bounds for prediction
    score_clamped = max(0, min(100, score))
    
    X_pred = pd.DataFrame({'score': [score_clamped]})
    X_pred_poly = poly.transform(X_pred)
    
    log_rank_pred = model.predict(X_pred_poly)[0]
    rank_pred = int(np.exp(log_rank_pred))
    
    # Simple percentile estimation based on an assumed 100,000 total candidates
    TOTAL_CANDIDATES = 100000
    if rank_pred > TOTAL_CANDIDATES:
        rank_pred = TOTAL_CANDIDATES
        
    percentile = ((TOTAL_CANDIDATES - rank_pred) / TOTAL_CANDIDATES) * 100
    
    return {
        "predicted_rank": max(1, rank_pred),
        "percentile": round(max(0, min(100, percentile)), 2)
    }
