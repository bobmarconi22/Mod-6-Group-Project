from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        Review(user_id=10, shop_id=1, review='Great atmosphere and delicious coffee!', rating=5),
        Review(user_id=2, shop_id=1, review='The baked goods are amazing. Love this place!', rating=5),
        Review(user_id=3, shop_id=1, review='Perfect spot for a morning coffee.', rating=4),
        
        Review(user_id=4, shop_id=2, review='Cozy place, friendly staff, and excellent coffee.', rating=5),
        Review(user_id=5, shop_id=2, review='Nice spot to relax and enjoy a cup of coffee.', rating=4),
        Review(user_id=6, shop_id=2, review='My favorite coffee shop in town.', rating=5),
        
        Review(user_id=7, shop_id=3, review='Best coffee in town, highly recommend!', rating=5),
        Review(user_id=8, shop_id=3, review='Friendly staff and great service.', rating=4),
        Review(user_id=9, shop_id=3, review='Love the ambiance and coffee selection.', rating=4),
        
        Review(user_id=10, shop_id=4, review='Quick service and great coffee!', rating=4),
        Review(user_id=11, shop_id=4, review='Perfect place for a quick coffee break.', rating=4),
        Review(user_id=12, shop_id=4, review='Love their espresso, always hits the spot.', rating=5),
        
        Review(user_id=13, shop_id=5, review='Latte Land is a paradise for coffee lovers.', rating=5),
        Review(user_id=14, shop_id=5, review='Great variety of lattes, all delicious.', rating=4),
        Review(user_id=15, shop_id=5, review='Perfect place for a weekend coffee.', rating=4),
        
        Review(user_id=1, shop_id=6, review='Cafe Cozy lives up to its name.', rating=4),
        Review(user_id=2, shop_id=6, review='Warm and inviting, love this place.', rating=5),
        Review(user_id=3, shop_id=6, review='Great coffee and a cozy atmosphere.', rating=5),
        
        Review(user_id=4, shop_id=7, review='Best beans in town, highly recommend.', rating=4),
        Review(user_id=5, shop_id=7, review='Love the quality of their coffee beans.', rating=5),
        Review(user_id=6, shop_id=7, review='Perfect place for coffee enthusiasts.', rating=5),
        
        Review(user_id=7, shop_id=8, review='Perk Palace is my go-to coffee spot.', rating=4),
        Review(user_id=8, shop_id=8, review='Great coffee and a friendly atmosphere.', rating=4),
        Review(user_id=9, shop_id=8, review='Always a pleasure to visit.', rating=5),
        
        Review(user_id=10, shop_id=9, review='Love the premium brews at Brewed Awakenings.', rating=5),
        Review(user_id=11, shop_id=9, review='Great place to start your day.', rating=4),
        Review(user_id=12, shop_id=9, review='Fantastic coffee and great service.', rating=4),
        
        Review(user_id=13, shop_id=10, review='The Daily Grind has the best coffee.', rating=5),
        Review(user_id=14, shop_id=10, review='Love the atmosphere and coffee here.', rating=4),
        Review(user_id=15, shop_id=10, review='Perfect spot for a daily coffee fix.', rating=4)
    ]

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
