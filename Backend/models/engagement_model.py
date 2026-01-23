import pickle

class EngagementModel:
    def __init__(self, model_path="model_v1.pkl"):
        with open(model_path, "rb") as f:
            self.model = pickle.load(f)

    def predict(self, features: dict):
        # For MVP, return a mock engagement prediction
        return round((features.get("likes",0) + features.get("comments",0) + features.get("shares",0)) / max(features.get("followers",1),1) * 100, 2)
