import pandas as pd

DATA_PATH = "data/processed/cleaned_data.csv"

def load_data():
    return pd.read_csv(DATA_PATH)

def assistant_reply(question: str):
    df = load_data()
    q = question.lower()

    if "total posts" in q:
        return f"Your dashboard contains {len(df)} total posts."

    if "best platform" in q:
        platform = df.groupby("Platform")["Total_Engagement"].sum().idxmax()
        return f"{platform} is currently the best performing platform."

    if "best time" in q:
        hour = df.groupby("Hour")["Total_Engagement"].mean().idxmax()
        return f"The best posting time is around {hour}:00."

    if "engagement" in q:
        avg = int(df["Total_Engagement"].mean())
        return f"Average engagement per post is {avg}."

    return "I suggest focusing on video posts during peak hours for better engagement."
