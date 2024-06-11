from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        # Shop 1: 4 reviews (1-4)
        Review(user_id=10, shop_id=1, review='Great atmosphere and delicious coffee!', rating=5),
        Review(user_id=2, shop_id=1, review='The baked goods are amazing. Love this place!', rating=5),
        Review(user_id=3, shop_id=1, review='Perfect spot for a morning coffee.', rating=4),
        Review(user_id=15, shop_id=1, review='Nice place to read a book while sipping coffee.', rating=4),

        # Shop 2: 3 reviews (5-7)
        Review(user_id=4, shop_id=2, review='Cozy place, friendly staff, and excellent coffee.', rating=5),
        Review(user_id=5, shop_id=2, review='Nice spot to relax and enjoy a cup of coffee.', rating=4),
        Review(user_id=6, shop_id=2, review='My favorite coffee shop in town.', rating=5),

        # Shop 3: 5 reviews (8-12)
        Review(user_id=7, shop_id=3, review='Best coffee in town, highly recommend!', rating=5),
        Review(user_id=8, shop_id=3, review='Friendly staff and great service.', rating=4),
        Review(user_id=9, shop_id=3, review='Love the ambiance and coffee selection.', rating=4),
        Review(user_id=2, shop_id=3, review='Good place to work with a laptop.', rating=4),
        Review(user_id=10, shop_id=3, review='Great coffee shop for a quick break.', rating=4),

        # Shop 4: 6 reviews (13-18)
        Review(user_id=10, shop_id=4, review='Quick service and great coffee!', rating=4),
        Review(user_id=11, shop_id=4, review='Perfect place for a quick coffee break.', rating=4),
        Review(user_id=12, shop_id=4, review='Love their espresso, always hits the spot.', rating=5),
        Review(user_id=5, shop_id=4, review='Nice decor and comfortable seating.', rating=4),
        Review(user_id=6, shop_id=4, review='A bit noisy during peak hours.', rating=3),
        Review(user_id=7, shop_id=4, review='Good place for a casual meeting.', rating=4),

        # Shop 5: 7 reviews (19-25)
        Review(user_id=13, shop_id=5, review='Latte Land is a paradise for coffee lovers.', rating=5),
        Review(user_id=14, shop_id=5, review='Great variety of lattes, all delicious.', rating=4),
        Review(user_id=15, shop_id=5, review='Perfect place for a weekend coffee.', rating=4),
        Review(user_id=3, shop_id=5, review='Amazing flavors and great service.', rating=5),
        Review(user_id=4, shop_id=5, review='Friendly staff and cozy ambiance.', rating=4),
        Review(user_id=6, shop_id=5, review='Highly recommend their seasonal specials.', rating=5),
        Review(user_id=7, shop_id=5, review='The desserts are a perfect complement.', rating=5),

        # Shop 6: 3 reviews (26-28)
        Review(user_id=1, shop_id=6, review='Cafe Cozy lives up to its name.', rating=4),
        Review(user_id=2, shop_id=6, review='Warm and inviting, love this place.', rating=5),
        Review(user_id=3, shop_id=6, review='Great coffee and a cozy atmosphere.', rating=5),

        # Shop 7: 8 reviews (29-36)
        Review(user_id=4, shop_id=7, review='Best beans in town, highly recommend.', rating=4),
        Review(user_id=5, shop_id=7, review='Love the quality of their coffee beans.', rating=5),
        Review(user_id=6, shop_id=7, review='Perfect place for coffee enthusiasts.', rating=5),
        Review(user_id=1, shop_id=7, review='The pastries are very fresh.', rating=4),
        Review(user_id=2, shop_id=7, review='Comfortable seating and good Wi-Fi.', rating=5),
        Review(user_id=3, shop_id=7, review='The staff is very knowledgeable.', rating=5),
        Review(user_id=8, shop_id=7, review='Great place for an afternoon break.', rating=4),
        Review(user_id=9, shop_id=7, review='Love their cold brews.', rating=5),

        # Shop 8: 5 reviews (37-41)
        Review(user_id=7, shop_id=8, review='Perk Palace is my go-to coffee spot.', rating=4),
        Review(user_id=6, shop_id=8, review='Great coffee and a friendly atmosphere.', rating=4),
        Review(user_id=9, shop_id=8, review='Always a pleasure to visit.', rating=5),
        Review(user_id=10, shop_id=8, review='The latte art is beautiful.', rating=4),
        Review(user_id=5, shop_id=8, review='Perfect spot for people watching.', rating=4),

        # Shop 9: 4 reviews (42-45)
        Review(user_id=10, shop_id=9, review='Love the premium brews at Brewed Awakenings.', rating=5),
        Review(user_id=11, shop_id=9, review='Great place to start your day.', rating=4),
        Review(user_id=12, shop_id=9, review='Fantastic coffee and great service.', rating=4),
        Review(user_id=13, shop_id=9, review='A bit crowded but worth it.', rating=3),

        # Shop 10: 6 reviews (46-51)
        Review(user_id=13, shop_id=10, review='The Daily Grind has the best coffee.', rating=5),
        Review(user_id=14, shop_id=10, review='Love the atmosphere and coffee here.', rating=4),
        Review(user_id=15, shop_id=10, review='Perfect spot for a daily coffee fix.', rating=4),
        Review(user_id=9, shop_id=10, review='Great place to catch up with friends.', rating=4),
        Review(user_id=8, shop_id=10, review='Their cappuccinos are the best.', rating=5),
        Review(user_id=7, shop_id=10, review='Love their breakfast options.', rating=4)
    ]

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
