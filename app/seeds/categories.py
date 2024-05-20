from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    categories = [
        Category(name='Outdoor Seating'),
        Category(name='Free Wifi'),
        Category(name='Pet Friendly'),
        Category(name='Live Music'),
        Category(name='Organic Coffee'),
        Category(name='Late Night'),
        Category(name='Breakfast Menu'),
        Category(name='Lunch Menu'),
        Category(name='Dinner Menu'),
        Category(name='Vegan Options'),
        Category(name='Gluten-Free Options'),
        Category(name='Kid Friendly'),
        Category(name='Study Area'),
        Category(name='Drive-Thru'),
        Category(name='Delivery Available'),
        Category(name='Parking Available'),
        Category(name='Bike Racks'),
        Category(name='Wheelchair Accessible'),
        Category(name='Fireplace'),
        Category(name='Cozy Atmosphere'),
        Category(name='Specialty Drinks'),
        Category(name='Seasonal Menu'),
        Category(name='Happy Hour'),
        Category(name='Handcrafted Pastries'),
        Category(name='Fair Trade Coffee')
    ]

    db.session.add_all(categories)
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
