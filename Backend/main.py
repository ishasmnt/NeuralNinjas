# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routes import analytics, ai_query, export

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(analytics.router, prefix="/api/analytics")
# app.include_router(ai_query.router, prefix="/api/ai")
# app.include_router(export.router, prefix="/api/export")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from routes import analytics, ai_query

# Load environment variables
load_dotenv()

# 1️⃣ Create FastAPI app BEFORE including any routers
app = FastAPI(
    title="Social Media Dashboard API",
    description="Analytics and AI-powered insights for social media data",
    version="1.0.0"
)

# 2️⃣ CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3️⃣ Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# 4️⃣ Include routers AFTER creating app
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(ai_query.router, prefix="/api/ai", tags=["ai"])

# 5️⃣ Root and health endpoints
@app.get("/")
async def root():
    return {
        "message": "Social Media Dashboard API",
        "status": "running",
        "endpoints": {
            "analytics": "/api/analytics",
            "ai": "/api/ai"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# 6️⃣ Run with uvicorn if executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
