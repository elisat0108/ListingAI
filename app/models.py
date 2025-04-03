import datetime
from sqlalchemy import JSON, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  

    social_tokens = relationship("SocialToken", back_populates="user")
    instagram_posts = relationship("InstagramPostHistory", back_populates="user")

class SocialToken(Base):
    __tablename__ = "social_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    platform = Column(String, nullable=False)
    access_token = Column(String, nullable=False)
    instagram_user_id = Column(String)  
    expires_at = Column(DateTime)
    user = relationship("User", back_populates="social_tokens")

# INSTAGRAM

class InstagramPostHistory(Base):
    __tablename__ = "instagram_post_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    post_id = Column(String, nullable=False)
    media_type = Column(String)  # image, video, story, reel
    caption = Column(String)
    children = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User", back_populates="instagram_posts")


