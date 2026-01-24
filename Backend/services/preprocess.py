import pandas as pd
import os

RAW_PATH = "data/raw/socialbuzz.csv"
PROCESSED_PATH = "data/processed/cleaned_data.csv"

def preprocess_data():
    if not os.path.exists(RAW_PATH):
        return f"Error: {RAW_PATH} not found."

    df = pd.read_csv(RAW_PATH)

    # 1. Drop the index artifact
    if "Unnamed: 0" in df.columns:
        df.drop(columns=["Unnamed: 0"], inplace=True)

    # 2. Cleanup Text & Platform (Removing whitespace/casing issues)
    for col in ["Platform", "Sentiment", "Country"]:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().str.title()

    # 3. Handle Hashtags
    # Ensure hashtags are strings and handle missing ones
    if "Hashtags" in df.columns:
        df["Hashtags"] = df["Hashtags"].fillna("#general").astype(str)

    # 4. Calculate Total Engagement
    # This is core for your "Performance" metric
    df["Total_Engagement"] = df["Likes"] + df["Retweets"]

    # 5. Sentiment Scoring (Basic mapping for visualization)
    # This helps when the AI asks "What is the overall mood?"
    sentiment_map = {
        "Positive": 1,
        "Neutral": 0,
        "Negative": -1
    }
    df["Sentiment_Score"] = df["Sentiment"].map(sentiment_map).fillna(0)

    # 6. Ensure Numeric Columns are valid
    numeric_cols = ["Likes", "Retweets", "Year", "Month", "Day", "Hour"]
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

    # 7. Create a 'Date' column for easier time-series plotting in React
    # This combines Year, Month, Day into a single format Recharts loves
    try:
        df["Date"] = pd.to_datetime(df[["Year", "Month", "Day"]])
    except:
        # Fallback if specific columns fail
        df["Date"] = pd.to_datetime(df["Timestamp"]).dt.date

    # Save to processed folder
    os.makedirs(os.path.dirname(PROCESSED_PATH), exist_ok=True)
    df.to_csv(PROCESSED_PATH, index=False)

    return f"Preprocessing Complete! {len(df)} rows processed."

if __name__ == "__main__":
    print(preprocess_data())