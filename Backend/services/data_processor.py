def calculate_engagement_rate(likes: int, comments: int, shares: int, followers: int):
    if followers == 0:
        return 0
    return round(((likes + comments + shares) / followers) * 100, 2)
