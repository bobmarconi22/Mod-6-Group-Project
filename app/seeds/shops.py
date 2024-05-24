from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shops():
    shops = [
        Shop(
            owner_id=1, name='Roast and Toast', description='Exceptional coffee and freshly baked goods.',
            hours={"monday": "7:00am - 8:00pm", "tuesday": "7:00am - 8:00pm", "wednesday": "7:00am - 8:00pm", "thursday": "7:00am - 8:00pm", "friday": "7:00am - 8:00pm", "saturday": "8:00am - 6:00pm", "sunday": "8:00am - 6:00pm"},
            website='http://roastandtoast.com', phone_number='5557890123', price_range=3
        ),
        Shop(
            owner_id=2, name='Morning Brew', description='A cozy spot for your daily caffeine fix.',
            hours={"monday": "6:00am - 6:00pm", "tuesday": "6:00am - 6:00pm", "wednesday": "6:00am - 6:00pm", "thursday": "6:00am - 6:00pm", "friday": "6:00am - 6:00pm", "saturday": "7:00am - 4:00pm", "sunday": "7:00am - 4:00pm"},
            website='http://morningbrew.com', phone_number='5551234567', price_range=2
        ),
        Shop(
            owner_id=3, name='Java Junction', description='The best coffee in town, served fresh daily.',
            hours={"monday": "7:00am - 7:00pm", "tuesday": "7:00am - 7:00pm", "wednesday": "7:00am - 7:00pm", "thursday": "7:00am - 7:00pm", "friday": "7:00am - 7:00pm", "saturday": "8:00am - 5:00pm", "sunday": "8:00am - 3:00pm"},
            website='http://javajunction.com', phone_number='5552345678', price_range=3
        ),
        Shop(
            owner_id=4, name='Espresso Express', description='Quick and delicious coffee to go.',
            hours={"monday": "6:00am - 8:00pm", "tuesday": "6:00am - 8:00pm", "wednesday": "6:00am - 8:00pm", "thursday": "6:00am - 8:00pm", "friday": "6:00am - 8:00pm", "saturday": "7:00am - 6:00pm", "sunday": "7:00am - 6:00pm"},
            website='http://espressoexpress.com', phone_number='5553456789', price_range=2
        ),
        Shop(
            owner_id=5, name='Latte Land', description='A paradise for latte lovers.',
            hours={"monday": "7:00am - 8:00pm", "tuesday": "7:00am - 8:00pm", "wednesday": "7:00am - 8:00pm", "thursday": "7:00am - 8:00pm", "friday": "7:00am - 8:00pm", "saturday": "8:00am - 6:00pm", "sunday": "8:00am - 6:00pm"},
            website='http://latteland.com', phone_number='5554567890', price_range=3
        ),
        Shop(
            owner_id=6, name='Cafe Cozy', description='A warm and inviting cafe for all your coffee needs.',
            hours={"monday": "7:00am - 9:00pm", "tuesday": "7:00am - 9:00pm", "wednesday": "7:00am - 9:00pm", "thursday": "7:00am - 9:00pm", "friday": "7:00am - 9:00pm", "saturday": "8:00am - 7:00pm", "sunday": "8:00am - 7:00pm"},
            website='http://cafecozy.com', phone_number='5555678901', price_range=2
        ),
        Shop(
            owner_id=7, name='Bean Haven', description='Your haven for the finest coffee beans.',
            hours={"monday": "6:00am - 6:00pm", "tuesday": "6:00am - 6:00pm", "wednesday": "6:00am - 6:00pm", "thursday": "6:00am - 6:00pm", "friday": "6:00am - 6:00pm", "saturday": "7:00am - 4:00pm", "sunday": "Closed"},
            website='http://beanhaven.com', phone_number='5556789012', price_range=1
        ),
        Shop(
            owner_id=8, name='Perk Palace', description='A palace of perks for coffee enthusiasts.',
            hours={"monday": "6:00am - 7:00pm", "tuesday": "6:00am - 7:00pm", "wednesday": "6:00am - 7:00pm", "thursday": "6:00am - 7:00pm", "friday": "6:00am - 7:00pm", "saturday": "7:00am - 5:00pm", "sunday": "7:00am - 5:00pm"},
            website='http://perkpalace.com', phone_number='5558901234', price_range=2
        ),
        Shop(
            owner_id=9, name='Brewed Awakenings', description='Awaken your senses with our premium brews.',
            hours={"monday": "6:00am - 6:00pm", "tuesday": "6:00am - 6:00pm", "wednesday": "6:00am - 6:00pm", "thursday": "6:00am - 6:00pm", "friday": "6:00am - 6:00pm", "saturday": "7:00am - 5:00pm", "sunday": "Closed"},
            website='http://brewedawakenings.com', phone_number='5559012345', price_range=2
        ),
        Shop(
            owner_id=10, name='The Daily Grind', description='Your daily grind just got better.',
            hours={"monday": "6:00am - 8:00pm", "tuesday": "6:00am - 8:00pm", "wednesday": "6:00am - 8:00pm", "thursday": "6:00am - 8:00pm", "friday": "6:00am - 8:00pm", "saturday": "7:00am - 6:00pm", "sunday": "7:00am - 6:00pm"},
            website='http://thedailygrind.com', phone_number='5550123456', price_range=2
        )
    ]

    db.session.add_all(shops)
    db.session.commit()

def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
