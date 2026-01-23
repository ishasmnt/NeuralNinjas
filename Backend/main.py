from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analytics, ai_query, export

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router, prefix="/api/analytics")
app.include_router(ai_query.router, prefix="/api/ai")
app.include_router(export.router, prefix="/api/export")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)