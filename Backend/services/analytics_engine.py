import pandas as pd

class AnalyticsEngine:
    @staticmethod
    def calculate_metrics(df):
        total_likes = int(df['likes'].sum())
        total_comments = int(df['comments'].sum())
        total_reach = int(df['reach'].sum())
        
        # Engagement Rate Formula: ((Likes + Comments) / Reach) * 100
        avg_eng_rate = ((total_likes + total_comments) / total_reach) * 100
        
        return {
            "summary": {
                "reach": total_reach,
                "engagement_rate": round(avg_eng_rate, 2),
                "total_posts": len(df)
            },
            "by_format": df.groupby('post_type').agg({
                'likes': 'mean',
                'reach': 'mean'
            }).to_dict()
        }