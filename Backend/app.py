from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd # Add this import
from routes.analytics import analytics_router
from services.preprocess import preprocess_data
from routes.assistant import assistant_router
app = FastAPI()
# Register the routes

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics_router, prefix="/analytics")


app.include_router(
    assistant_router,
    prefix="/api",
    tags=["AI Assistant"]
)

@app.get("/")
def home():
    return {"message": "Social Media Analysis API is running"}

@app.post("/process-data")
def run_preprocessing():
    # This calls the function you just wrote in preprocess.py
    result = preprocess_data()
    return {"status": result}

@app.get("/data-preview")
def get_data_preview():
    # Returns the first 5 rows of cleaned data to test the connection
    try:
        df = pd.read_csv("data/processed/cleaned_data.csv")
        return df.head(5).to_dict(orient="records")
    except FileNotFoundError:
        return {"error": "Cleaned data not found. Please run /process-data first."}
    

   

