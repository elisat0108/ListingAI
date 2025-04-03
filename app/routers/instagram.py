from fastapi import APIRouter, Depends, HTTPException
import json
import time
from pytest import Session
import requests
from app.config import settings
from app.database import get_db
from app.schemas import ImagePostRequest, MultipleImagePostRequest, StoryPostRequest, VideoPostRequest
from app.utils.db_utils import save_post_to_history

router = APIRouter(prefix="/instagram", tags=["Instagram"])

INSTAGRAM_USER_ID = settings.instagram_user_id
ACCESS_TOKEN = settings.access_token

image_url = "https://cdn.britannica.com/80/150980-050-84B9202C/Giant-panda-cub-branch.jpg" 
caption = "Pandas are the cutest!"

carousel_items = [
    "https://i.etsystatic.com/24593818/r/il/0e26b0/4112874491/il_570xN.4112874491_ljz0.jpg",
    "https://cdn.britannica.com/80/150980-050-84B9202C/Giant-panda-cub-branch.jpg"
]

video_url = "https://static.videezy.com/system/resources/previews/000/032/359/original/MM008645___BOUNCING_FRUIT_009___1080p___phantom.mp4"

# Creating media container
@router.post("/image")
def post_single_image(payload: ImagePostRequest, db: Session = Depends(get_db)):
    container_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media"
    payload = {
        "image_url": image_url,
        "caption": caption,
        "access_token": ACCESS_TOKEN
    }

    response = requests.post(container_url, data=payload)
    result = response.json()
    print(result)

    # Publishing the media container
    creation_id = result.get("id")
    if not creation_id:
        print("Meta error response:", result)
        raise HTTPException(status_code=400, detail="Failed to create media container.")

    
    publish_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media_publish"
    publish_payload = {
        "creation_id": creation_id,
        "access_token": ACCESS_TOKEN
    }

    publish_response = requests.post(publish_url, data=publish_payload)
    publish_result = publish_response.json()
    print("Publish result:", publish_result)

    post_id = publish_result.get("id")
    if not post_id:
        raise HTTPException(status_code=400, detail="Failed to publish post.")

    save_post_to_history(db, caption=caption, media_type="IMAGE", post_id=post_id)

    return {"status": "success", "post_id": post_id}

# Carousel Item
@router.post("/carousel")
def post_multiple_image(payload: MultipleImagePostRequest, db: Session = Depends(get_db)):
    container_ids = []

    for image_url in carousel_items:
        container_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media"
        payload = {
            "image_url": image_url,
            "is_carousel_item": "true",
            "access_token": ACCESS_TOKEN
        }

        response = requests.post(container_url, data=payload)
        result = response.json()
        print("Item container result:", result)

        if "id" in result:
            container_ids.append(result["id"])
        else:
            print("Failed to create container for:", image_url)
            raise HTTPException(status_code=400, detail="Failed to create media container.")


    if container_ids:
        carousel_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media"
        carousel_payload = {
            "media_type": "CAROUSEL",
            "children": json.dumps(container_ids),
            "caption": "Look at all the pandas",
            "access_token": ACCESS_TOKEN
        }

        carousel_response = requests.post(carousel_url, data=carousel_payload)
        carousel_result = carousel_response.json()
        print("Publish result:", carousel_result)

        creation_id = carousel_result.get("id")
        if creation_id:
            creation_id = carousel_result["id"]
            publish_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media_publish"
            publish_payload = {
                "creation_id": creation_id,
                "access_token": ACCESS_TOKEN
            }

            publish_response = requests.post(publish_url, data=publish_payload)
            publish_result = publish_response.json()
            print("Publish result:", publish_result)

        else:
            raise HTTPException(status_code=400, detail="Failed to create carousel container.")
        
        save_post_to_history(db, caption=caption, media_type="IMAGE", post_id=creation_id, children=container_ids)
    else:
        print("No carousel items were created.")

# Creating reels
@router.post("/video")
def post_video(payload: VideoPostRequest, db: Session = Depends(get_db)):
    container_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media"
    payload = {
        "video_url": video_url,
        "caption": caption,
        "media_type": "REELS",
        "access_token": ACCESS_TOKEN
    }

    response = requests.post(container_url, data=payload)
    result = response.json()
    print(result)

    reel_creation_id = result.get("id")

    debug_url = f"https://graph.facebook.com/v22.0/{reel_creation_id}?fields=status_code&access_token={ACCESS_TOKEN}"

    while True:
        status_response = requests.get(debug_url)
        status_result = status_response.json()
        
        if status_result.get("status_code") == "FINISHED":
            break

        else:
            time.sleep(1)

    if reel_creation_id:
        publish_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media_publish"
        publish_payload = {
            "creation_id": reel_creation_id,
            "access_token": ACCESS_TOKEN
        }

        publish_response = requests.post(publish_url, data=publish_payload)
        publish_result = publish_response.json()
        print("Publish result:", publish_result)
    else:
        raise HTTPException(status_code=400, detail="Failed to create reel container.")

    save_post_to_history(db, caption=payload.caption, media_type="REEL", post_id=publish_result)
    return {"status": "success", "post_id": publish_result}

#Posting stories
# Creating media container
@router.post("/storyPost")
def post_video(payload: StoryPostRequest, db: Session = Depends(get_db)):
    container_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media"
    payload = {
        "image_url": image_url,
        "media_type": "STORIES",
        "access_token": ACCESS_TOKEN
    }

    response = requests.post(container_url, data=payload)
    result = response.json()
    print(result)

    # Publishing the media container
    stories_creation_id = result.get("id")

    debug_url = f"https://graph.facebook.com/v22.0/{stories_creation_id}?fields=status_code&access_token={ACCESS_TOKEN}"

    while True:
        status_response = requests.get(debug_url)
        status_result = status_response.json()
        
        if status_result.get("status_code") == "FINISHED":
            break

        else:
            time.sleep(1)

    if stories_creation_id:
        publish_url = f"https://graph.facebook.com/v22.0/{INSTAGRAM_USER_ID}/media_publish"
        publish_payload = {
            "creation_id": stories_creation_id,
            "access_token": ACCESS_TOKEN
        }

        publish_response = requests.post(publish_url, data=publish_payload)
        publish_result = publish_response.json()
        print("Publish result:", publish_result)
    else:
        print("Failed to create media container:", result)
    
    save_post_to_history(db, caption=payload.caption, media_type="STORY", post_id=publish_result)
    return {"status": "success", "post_id": publish_result}

