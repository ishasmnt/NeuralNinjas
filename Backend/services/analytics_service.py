import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import os

class AnalyticsService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data" / "posts.csv"
        self.df = None
        self.load_data()
    
    def load_data(self):
        """Load and preprocess CSV data"""
        try:
            self.df = pd.read_csv(self.data_path)
            
            # Convert date columns
            if 'date' in self.df.columns:
                self.df['date'] = pd.to_datetime(self.df['date'])
            elif 'timestamp' in self.df.columns:
                self.df['date'] = pd.to_datetime(self.df['timestamp'])
            
            # Calculate engagement rate
            if 'likes' in self.df.columns and 'comments' in self.df.columns:
                self.df['engagement'] = self.df['likes'] + self.df['comments']
                if 'shares' in self.df.columns:
                    self.df['engagement'] += self.df['shares']
            
            # Extract hour from timestamp
            if 'date' in self.df.columns:
                self.df['hour'] = self.df['date'].dt.hour
                self.df['day_of_week'] = self.df['date'].dt.day_name()
            
        except Exception as e:
            print(f"Error loading data: {e}")
            self.df = pd.DataFrame()
    
    def get_kpis(self, start_date=None, end_date=None):
        """Calculate key performance indicators"""
        df = self._filter_by_date(start_date, end_date)
        
        if df.empty:
            return self._empty_kpis()
        
        total_posts = len(df)
        total_likes = df['likes'].sum() if 'likes' in df.columns else 0
        total_comments = df['comments'].sum() if 'comments' in df.columns else 0
        total_shares = df['shares'].sum() if 'shares' in df.columns else 0
        total_engagement = df['engagement'].sum() if 'engagement' in df.columns else 0
        
        avg_engagement_rate = (total_engagement / total_posts) if total_posts > 0 else 0
        
        return {
            "total_posts": int(total_posts),
            "total_likes": int(total_likes),
            "total_comments": int(total_comments),
            "total_shares": int(total_shares),
            "total_engagement": int(total_engagement),
            "avg_engagement_rate": round(avg_engagement_rate, 2)
        }
    
    def get_engagement_trend(self, period="daily"):
        """Get engagement trend over time"""
        if self.df.empty or 'date' not in self.df.columns:
            return []
        
        df = self.df.copy()
        
        if period == "daily":
            df['period'] = df['date'].dt.date
        elif period == "weekly":
            df['period'] = df['date'].dt.to_period('W').apply(lambda r: r.start_time)
        elif period == "monthly":
            df['period'] = df['date'].dt.to_period('M').apply(lambda r: r.start_time)
        
        trend = df.groupby('period').agg({
            'engagement': 'sum',
            'likes': 'sum',
            'comments': 'sum',
            'shares': 'sum' if 'shares' in df.columns else 'count'
        }).reset_index()
        
        trend['period'] = trend['period'].astype(str)
        
        return trend.to_dict('records')
    
    def get_format_performance(self):
        """Get performance by post format"""
        if self.df.empty or 'format' not in self.df.columns:
            return []
        
        performance = self.df.groupby('format').agg({
            'engagement': ['sum', 'mean'],
            'likes': 'sum',
            'comments': 'sum',
            'shares': 'sum' if 'shares' in self.df.columns else 'count'
        }).reset_index()
        
        performance.columns = ['format', 'total_engagement', 'avg_engagement', 
                              'total_likes', 'total_comments', 'total_shares']
        
        return performance.to_dict('records')
    
    def get_top_posts(self, metric="engagement", limit=10):
        """Get top performing posts"""
        if self.df.empty:
            return []
        
        df = self.df.copy()
        
        if metric not in df.columns:
            metric = 'engagement'
        
        top = df.nlargest(limit, metric)
        
        columns = ['date', 'content', 'platform', 'format', metric, 'engagement']
        columns = [col for col in columns if col in top.columns]
        
        result = top[columns].copy()
        result['date'] = result['date'].astype(str) if 'date' in result.columns else None
        
        return result.to_dict('records')
    
    def get_platform_stats(self):
        """Get statistics by platform"""
        if self.df.empty or 'platform' not in self.df.columns:
            return []
        
        stats = self.df.groupby('platform').agg({
            'engagement': ['sum', 'mean', 'count'],
            'likes': 'sum',
            'comments': 'sum'
        }).reset_index()
        
        stats.columns = ['platform', 'total_engagement', 'avg_engagement', 
                        'post_count', 'total_likes', 'total_comments']
        
        return stats.to_dict('records')
    
    def get_hourly_performance(self):
        """Get performance by hour of day"""
        if self.df.empty or 'hour' not in self.df.columns:
            return []
        
        hourly = self.df.groupby('hour').agg({
            'engagement': 'mean',
            'likes': 'mean',
            'comments': 'mean'
        }).reset_index()
        
        return hourly.to_dict('records')
    
    def _filter_by_date(self, start_date=None, end_date=None):
        """Filter dataframe by date range"""
        df = self.df.copy()
        
        if 'date' not in df.columns:
            return df
        
        if start_date:
            start = pd.to_datetime(start_date)
            df = df[df['date'] >= start]
        
        if end_date:
            end = pd.to_datetime(end_date)
            df = df[df['date'] <= end]
        
        return df
    
    def _empty_kpis(self):
        """Return empty KPIs structure"""
        return {
            "total_posts": 0,
            "total_likes": 0,
            "total_comments": 0,
            "total_shares": 0,
            "total_engagement": 0,
            "avg_engagement_rate": 0
        }
services/gemini_service.py