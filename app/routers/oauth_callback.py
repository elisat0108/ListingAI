from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests
from app import models
from app.database import get_db
from app.config import settings


router = APIRouter(prefix="/oauth", tags=["OAuth Callback"])

CLIENT_ID = settings.facebook_client_id
CLIENT_SECRET = settings.facebook_client_secret
REDIRECT_URI = "http://localhost:8000/oauth/callback/facebook"
FACEBOOK_TOKEN_URL = "https://graph.facebook.com/v17.0/oauth/access_token"

@router.get("/callback/facebook")
def facebook_callback(code: str, db: Session = Depends(get_db)):
    # Step 1: Exchange code for user access token
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code
    }

    print("Received code:", code)
    print("Exchanging code for access token...")

    response = requests.get(FACEBOOK_TOKEN_URL, params=payload)
    print("Access token response status:", response.status_code)
    print("Access token response body:", response.text)

    if response.status_code != 200:
        print("Token request failed:", response.text)
        raise HTTPException(status_code=400, detail="Failed to get access token")

    try:
        user_access_token = response.json().get("access_token")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid response when fetching access token")

    # Step 2: Get Pages
    pages = requests.get(
        f"https://graph.facebook.com/v17.0/me/accounts?access_token={user_access_token}"
    ).json()

    if "data" not in pages or not pages["data"]:
        raise HTTPException(status_code=400, detail="No Facebook Pages found for this user.")

    page_data = pages["data"][0]
    page_id = page_data["id"]
    page_access_token = page_data["access_token"]

    # Step 3: Instagram Business Account
    ig_response = requests.get(
        f"https://graph.facebook.com/v17.0/{page_id}?fields=instagram_business_account&access_token={page_access_token}"
    )
    ig_data = ig_response.json()
    instagram_user_id = ig_data.get("instagram_business_account", {}).get("id")

    if not instagram_user_id:
        raise HTTPException(status_code=400, detail="Instagram business account not found")

    # Step 4: Save token to DB
    user_id = 1

    existing = db.query(models.SocialToken).filter_by(user_id=user_id, platform="facebook").first()

    if existing:
        existing.access_token = page_access_token
        existing.instagram_user_id = instagram_user_id
    else:
        token = models.SocialToken(
            user_id=user_id,
            platform="facebook",
            access_token=page_access_token,
            instagram_user_id=instagram_user_id  # <-- Save it here
        )
        db.add(token)
        db.commit()


    return {
        "message": "Token saved successfully",
        "page_access_token": page_access_token,
        "facebook_page_id": page_id,
        "instagram_user_id": instagram_user_id
    }

