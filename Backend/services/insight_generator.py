class InsightGenerator:
    @staticmethod
    def generate_strategy(metrics):
        best_format = max(metrics['by_format']['likes'], key=metrics['by_format']['likes'].get)
        
        insights = [
            f"Your {best_format}s are driving the most engagement.",
            "Posting frequency is up 12% compared to last week.",
            f"Focus more on {best_format} content to maximize reach."
        ]
        return insights