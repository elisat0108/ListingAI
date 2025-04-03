from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, HttpUrl
from typing import List, Optional

class ListingCreate(BaseModel):
    title: str
    description: str

class ListingResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True  # For Pydantic V2

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True  # For Pydantic V2

# INSTAGRAM

class InstagramPostRequest(BaseModel):
    caption: Optional[str] = Field(None, description="Instagram caption")
    image_url: Optional[str] = Field(None, description="Public URL to image")
    video_url: Optional[str] = Field(None, description="Public URL to video")
    is_story: bool = False
    is_reel: bool = False

class InstagramPostHistoryResponse(BaseModel):
    id: int
    user_id: int
    post_id: str
    media_type: str
    caption: str
    created_at: datetime

    class Config:
        from_attributes = True  # For Pydantic V2

class ImagePostRequest(BaseModel):
    image_url: str
    caption: str = ""

class MultipleImagePostRequest(BaseModel):
    carousel_items: List[HttpUrl]
    caption: str = ""

class VideoPostRequest(BaseModel):
    video_url: str
    caption: str = ""

class StoryPostRequest(BaseModel):
        image_url: str

