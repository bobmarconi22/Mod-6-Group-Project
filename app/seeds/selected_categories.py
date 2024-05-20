from app.models import db, environment, SCHEMA, selected_categories

from sqlalchemy.sql import text

def seed_selected_categories():
    selected = [
        # Spot 1
        {'shop_id': 1, 'category_id': 1},
        {'shop_id': 1, 'category_id': 5},
        {'shop_id': 1, 'category_id': 9},

        # Spot 2
        {'shop_id': 2, 'category_id': 2},
        {'shop_id': 2, 'category_id': 3},
        {'shop_id': 2, 'category_id': 4},

        # Spot 3
        {'shop_id': 3, 'category_id': 7},
        {'shop_id': 3, 'category_id': 8},
        {'shop_id': 3, 'category_id': 9},

        # Spot 4
        {'shop_id': 4, 'category_id': 11},
        {'shop_id': 4, 'category_id': 16},
        {'shop_id': 4, 'category_id': 19},

        # Spot 5
        {'shop_id': 5, 'category_id': 12},
        {'shop_id': 5, 'category_id': 14},
        {'shop_id': 5, 'category_id': 15},

        # Spot 6
        {'shop_id': 6, 'category_id': 15},
        {'shop_id': 6, 'category_id': 17},
        {'shop_id': 6, 'category_id': 18},

        # Spot 7
        {'shop_id': 7, 'category_id': 19},
        {'shop_id': 7, 'category_id': 20},
        {'shop_id': 7, 'category_id': 22},

        # Spot 8
        {'shop_id': 8, 'category_id': 1},
        {'shop_id': 8, 'category_id': 23},
        {'shop_id': 8, 'category_id': 24},

        # Spot 9
        {'shop_id': 9, 'category_id': 2},
        {'shop_id': 9, 'category_id': 5},
        {'shop_id': 9, 'category_id': 22},

        # Spot 10
        {'shop_id': 10, 'category_id': 3},
        {'shop_id': 10, 'category_id': 24},
        {'shop_id': 10, 'category_id': 25}
    ]

    db.session.execute(selected_categories.insert(), selected)
    db.session.commit()

def undo_selected_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.selected_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM selected_categories"))

    db.session.commit()
