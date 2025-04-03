from typing import Optional, List
from requests import Session
from app.models import InstagramPostHistory

def save_post_to_history(
    db: Session,
    caption: str,
    media_type: str,
    post_id: str,
    children: Optional[List[str]] = None  
):
    history = InstagramPostHistory(
        caption=caption,
        media_type=media_type,
        post_id=post_id,
        children=children 
    )
    db.add(history)
    db.commit()
    db.refresh(history)
    return history
