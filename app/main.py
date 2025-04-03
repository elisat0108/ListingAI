from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.routers import auth, instagram, listings, oauth_callback, social, users
from . import models
from .database import engine, get_db
from . import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # "https://your-frontend-deployed-link.com"  # Add this later if you deploy
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Can also use ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(instagram.router)
app.include_router(listings.router)
app.include_router(users.router)
app.include_router(social.router)
app.include_router(auth.router)
app.include_router(oauth_callback.router)


@app.get("/")
def read_root():
    return {"message": "API is running"}
