from app.models import db, SelectedCategory, environment, SCHEMA
from sqlalchemy.sql import text

def seed_selected_categories():
    selected_categories = [
        # Spot 1
        SelectedCategory(spot_id=1, category_id=1),
        SelectedCategory(spot_id=1, category_id=5),
        SelectedCategory(spot_id=1, category_id=9),

        # Spot 2
        SelectedCategory(spot_id=2, category_id=2),
        SelectedCategory(spot_id=2, category_id=3),
        SelectedCategory(spot_id=2, category_id=4),

        # Spot 3
        SelectedCategory(spot_id=3, category_id=7),
        SelectedCategory(spot_id=3, category_id=8),
        SelectedCategory(spot_id=3, category_id=9),

        # Spot 4
        SelectedCategory(spot_id=4, category_id=11),
        SelectedCategory(spot_id=4, category_id=16),
        SelectedCategory(spot_id=4, category_id=19),

        # Spot 5
        SelectedCategory(spot_id=5, category_id=12),
        SelectedCategory(spot_id=5, category_id=14),
        SelectedCategory(spot_id=5, category_id=15),

        # Spot 6
        SelectedCategory(spot_id=6, category_id=15),
        SelectedCategory(spot_id=6, category_id=17),
        SelectedCategory(spot_id=6, category_id=18),

        # Spot 7
        SelectedCategory(spot_id=7, category_id=19),
        SelectedCategory(spot_id=7, category_id=20),
        SelectedCategory(spot_id=7, category_id=22),

        # Spot 8
        SelectedCategory(spot_id=8, category_id=1),
        SelectedCategory(spot_id=8, category_id=23),
        SelectedCategory(spot_id=8, category_id=24),

        # Spot 9
        SelectedCategory(spot_id=9, category_id=2),
        SelectedCategory(spot_id=9, category_id=5),
        SelectedCategory(spot_id=9, category_id=22),

        # Spot 10
        SelectedCategory(spot_id=10, category_id=3),
        SelectedCategory(spot_id=10, category_id=24),
        SelectedCategory(spot_id=10, category_id=25)
    ]

    db.session.add_all(selected_categories)
    db.session.commit()

def undo_selected_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.selected_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM selected_categories"))

    db.session.commit()
