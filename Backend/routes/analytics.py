from fastapi import APIRouter, HTTPException
import pandas as pd


analytics_router = APIRouter()
DATA_PATH = "data/processed/cleaned_data.csv"


def load_data():
    try:
        return pd.read_csv(DATA_PATH)
    except Exception:
        raise HTTPException(status_code=500, detail="Analytics data not available")


@analytics_router.get("/overview")
def overview():
    df = load_data()
    return {
        "total_posts": len(df),
        "platforms": df["Platform"].unique().tolist(),
        "avg_likes": int(df["Likes"].mean()),
        "avg_retweets": int(df["Retweets"].mean()),
        "total_engagement": int(df["Total_Engagement"].sum())
    }


@analytics_router.get("/platform-comparison")
def platform_comparison():
    df = load_data()
    return df.groupby("Platform")["Total_Engagement"].sum().to_dict()


@analytics_router.get("/hourly-trends")
def hourly_trends():
    df = load_data()
    return df.groupby("Hour")["Total_Engagement"].mean().to_dict()


@analytics_router.get("/format-performance")
def format_performance():
    df = load_data()
    return df.groupby("Type")["Total_Engagement"].mean().to_dict()


@analytics_router.get("/category-sentiment")
def category_sentiment():
    df = load_data()
    return (
        df.groupby(["Category", "Sentiment"])
        .size()
        .unstack(fill_value=0)
        .reset_index()
        .to_dict(orient="records")
    )


@analytics_router.get("/deep-dive")
def deep_dive():
    df = load_data()
    return {
        "type_efficiency": df.groupby("Type")["Total_Engagement"].mean().to_dict(),
        "best_hour": int(df.groupby("Hour")["Total_Engagement"].mean().idxmax())
    }


@analytics_router.get("/ai/summary")
def ai_summary():
    return {"recommendation": "Focus on short videos during peak hours."}

@analytics_router.get("/ai/query")
def natural_language_query(query: str):
    df = pd.read_csv(DATA_PATH)
    q = query.lower().strip()

    # 1️⃣ Greeting ONLY if message is very short
    if q in ["hi", "hello", "hey"]:
        return {
            "answer": "Hi! 👋 Ask things like:\n• Which format performs best?\n• Best posting time\n• Highest engagement post"
        }

    # 2️⃣ Highest engagement post
    if "highest engagement" in q or "top post" in q:
        top = df.loc[df["Total_Engagement"].idxmax()]
        return {
            "answer": f"The highest engagement came from {top['Platform']} with {top['Total_Engagement']} interactions."
        }

    # 3️⃣ Best posting time
    if "best time" in q or "when to post" in q:
        best_hour = df.groupby("Hour")["Total_Engagement"].mean().idxmax()
        return {
            "answer": f"Data suggests {best_hour}:00 GMT is the best posting time."
        }

    # 4️⃣ Best platform
    if "platform" in q:
        best_platform = df.groupby("Platform")["Total_Engagement"].sum().idxmax()
        return {
            "answer": f"{best_platform} is currently your top-performing platform."
        }

    # 5️⃣ Best content format
    if "format" in q or "video" in q or "reel" in q:
        best_type = df.groupby("Type")["Total_Engagement"].mean().idxmax()
        return {
            "answer": f"{best_type} content delivers the highest average engagement."
        }

    # 6️⃣ Default smart insight
    return {
        "answer": "Insights show visual formats and evening posts consistently drive higher engagement. Try posting between 6–9 PM."
    }
