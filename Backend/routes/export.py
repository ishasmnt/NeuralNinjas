from fastapi import APIRouter
from fastapi.responses import FileResponse
import pandas as pd
import os

router = APIRouter()

@router.get("/csv")
async def export_csv():
    file_path = "data/processed/posts.csv"
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename="social_media_report.csv", media_type='text/csv')
    return {"error": "File not found"}