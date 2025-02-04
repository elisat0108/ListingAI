from fastapi import FastAPI, HTTPException, Form, Query
from pydantic import BaseModel
import json
from pathlib import Path
import requests

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Only allow frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

FACEBOOK_PAGE_ACCESS_TOKEN = "your_facebook_page_access_token"
FACEBOOK_PAGE_ID = "your_facebook_page_id"

# Load JSON data from file
def load_listing():
    json_file_path = Path("listing.json")
    if not json_file_path.exists():
        return {"error": "Listing file not found"}
    
    with json_file_path.open("r", encoding="utf-8") as file:
        data = json.load(file)
    return data

class ListingSelection(BaseModel):
    images: list[str]

@app.get("/listing/")
def get_listing():
    return load_listing()

@app.post("/listing/select-images/")
def select_images(selection: ListingSelection):
    listing = load_listing()
    if "error" in listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    selected_images = [img for img in listing.get("Images", []) if img in selection.images]
    return {"selected_images": selected_images}

@app.post("/listing/compile/")
def compile_listing():
    listing = load_listing()
    if "error" in listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    formatted_post = (
        f"🏡 {listing['Address']} \n"
        f"💰 Price: {listing['Price']} \n"
        f"🛏 Beds: {listing['Beds']} | 🛁 Washrooms: {listing['Washrooms']} \n"
        f"📜 {listing['Description']} \n"
        "#RealEstate #Milton #HomeForSale"
    )
    return {"post_content": formatted_post}

@app.post("/listing/publish/")
def publish_listing(
    post_content: str = Form(...), 
    images: list[str] = Form(...), 
    schedule_time: str = Form(None)
):
    image_urls = images[:5]  # Facebook allows up to 5 images per post
    
    post_url = f"https://graph.facebook.com/{FACEBOOK_PAGE_ID}/photos"
    for image_url in image_urls:
        response = requests.post(
            post_url,
            params={"access_token": FACEBOOK_PAGE_ACCESS_TOKEN},
            data={"url": image_url, "published": False}
        )
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail=f"Failed to upload image: {image_url}")
    
    post_data = {"message": post_content, "access_token": FACEBOOK_PAGE_ACCESS_TOKEN}
    if schedule_time:
        post_data["scheduled_publish_time"] = schedule_time
        post_data["published"] = False
    
    post_response = requests.post(
        f"https://graph.facebook.com/{FACEBOOK_PAGE_ID}/feed", params=post_data
    )
    
    if post_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to publish listing")
    
    return {"status": "Listing published successfully"}
