from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/overview")
def analytics_overview():
    return {
        "platforms": ["Instagram", "YouTube", "LinkedIn"],
        "total_posts": 120,
        "avg_engagement_rate": 4.6
    }
