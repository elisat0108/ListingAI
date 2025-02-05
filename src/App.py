from fastapi import FastAPI, HTTPException, Form, Query, Request  
from pydantic import BaseModel
import json
from pathlib import Path
import requests

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#origins=["http://localhost:3000"],  # Only allow frontend

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Only allow frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

#FACEBOOK_PAGE_ACCESS_TOKEN = "EAAJKlE5t41QBOyZAfkdpJDWnfmTX2YMZB8rMW94ZCQPvJhC2zdu4qsNKRGcPNl05aMStdSb64HP6P4FONTMO2j2yyTnATzZAiOOZCiBpC8tG8RB77kB81DKPtoOl8y9wAD4W5ZB88SaDVkjVKRc7WDMsAwfRSTo4RL5dSowCnVYvpyBIDPJyC2wD8PQ9nOOZC1fNwDH9r6c2RnY7oqs"
FACEBOOK_PAGE_ACCESS_TOKEN = "EAAJKlE5t41QBO9guw6lBnJ4WorbCeB4qscTahpt6pkrIQmnx1iZBS5NjvmokunZBI5jS4BH8f3ZAlnvGWVhHKdrDPVdyFZCYuESZCvGAC0ilZAqY5rLnVJcZC5lzUZCMGkrTN7pTX6ZApvXwgMQAuNRldrFZANjgpsc9DzUCcHEwnP8yVzZCLUzV4RMj3HXvVwIyQZDZD"

FACEBOOK_PAGE_ID = "485640784642339" #Real Estate AI Page

class ListingPost(BaseModel):
    post_content: str
    images: list[str]
    
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
def publish_listing(post: ListingPost):
    """
    Publishes the listing on Facebook Page with up to 5 images.
    """
    image_urls = post.images[:5]  # Facebook allows up to 5 images per post

    # Step 1: Upload Images to Facebook
    uploaded_image_ids = []
    for image_url in image_urls:
        upload_response = requests.post(
            f"https://graph.facebook.com/{FACEBOOK_PAGE_ID}/photos",
            params={"access_token": FACEBOOK_PAGE_ACCESS_TOKEN},
            data={"url": image_url, "published": "false"}
        )
        
        if upload_response.status_code == 200:
            image_data = upload_response.json()
            uploaded_image_ids.append(image_data["id"])
        else:
            return {"error": f"Failed to upload image: {image_url}", "details": upload_response.json()}

    # Step 2: Create Post with Image Attachments
    post_data = {
        "message": post.post_content,
        "attached_media": [{"media_fbid": img_id} for img_id in uploaded_image_ids],
        "access_token": FACEBOOK_PAGE_ACCESS_TOKEN
    }

    post_response = requests.post(
        f"https://graph.facebook.com/{FACEBOOK_PAGE_ID}/feed", json=post_data
    )

    if post_response.status_code != 200:
        return {"error": "Failed to publish listing", "details": post_response.json()}

    return {"status": "Listing published successfully!", "post_id": post_response.json()["id"]}

@app.get("/user-data-deletion/")
async def user_data_deletion_get(request: Request):
    # Return instructions or a confirmation page
    return {
        "message": "To delete your data, please send a POST request to this endpoint with your user ID."
    }

@app.post("/user-data-deletion/")
async def user_data_deletion_post(request: dict):
    user_id = request.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")

    # Logic to delete user data (e.g., from the database)
    is_deleted = delete_user_data(user_id)  # Replace with your actual deletion logic

    if is_deleted:
        return {"message": "User data has been deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete user data")

def delete_user_data(user_id: str) -> bool:
    # Placeholder logic
    print(f"Deleting data for user {user_id}")
    return True