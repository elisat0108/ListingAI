from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter(
    prefix="/listings",
    tags=["Listings"]
)

@router.get("/")
def get_listing(db: Session = Depends(get_db)):
    listings = db.query(models.Listing).all()
    return listings

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.ListingResponse)
def create_listing(listing: schemas.ListingCreate, db: Session = Depends(get_db)):
    new_listing = models.Listing(title=listing.title, description=listing.description)
    db.add(new_listing)
    db.commit()
    db.refresh(new_listing)
    return new_listing

@router.get("/{id}", response_model=schemas.ListingResponse)
def get_one_listing(id: int, db: Session = Depends(get_db)):
    listing = db.query(models.Listing).filter(models.Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="listing not found")
    return listing

@router.put("/{id}", response_model=schemas.ListingResponse)
def update_listing(id: int, updated_listing: schemas.ListingCreate, db: Session = Depends(get_db)):
    listing = db.query(models.Listing). filter(models.Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="listing not found")
    listing.title = updated_listing.title
    listing.description = updated_listing.description
    db.commit()
    return listing

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_listing(id: int, db: Session = Depends(get_db)):
    listing = db.query(models.Listing). filter(models.Listing.id == id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="listing not found")
    db.delete(listing)
    db.commit()
    return {"message": "Listing deleted successfully"}